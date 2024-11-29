import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";
import User from "@/models/User/Schema";
import Activity from "@/models/Activity/Schema";
import { connectToDb } from "@/libs/connectToDb";
import { getAuth } from "@clerk/nextjs/server";

// Initialize S3 Client
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const categories = {
  "recycled plastic": [
    "recycling symbol",
    "plastic",
    "recyclable material",
    "plastic waste",
    "tub",
    "tin",
  ],
  "used bicycle": [
    "pre-owned bicycle",
    "second-hand bike",
    "recycled bicycle",
    "bicycle",
    "eco-friendly transport",
    "sustainable cycling",
    "bike sharing",
    "refurbished cycle",
    "green commuting",
    "low-carbon transport",
    "bicycle reuse",
  ],
  "ate veg full day": [
    "vegetarian diet",
    "plant-based meal",
    "meatless day",
    "vegan diet",
    "sustainable eating",
    "low-carbon food",
    "ethical eating",
    "green meals",
    "meat-free meals",
    "plant-forward eating",
  ],
  carpooling: [
    "ride sharing",
    "shared commute",
    "car-sharing service",
    "eco-friendly travel",
    "reduced emissions",
    "green transportation",
    "fuel-saving commute",
    "low-carbon travel",
    "group travel",
    "sustainable transport",
  ],
  "zero waste shopping": [
    "plastic-free shopping",
    "bulk buying",
    "reuse containers",
    "eco-friendly shopping",
    "sustainable shopping",
    "minimal waste purchase",
    "recyclable packaging",
    "refill station",
    "waste-free groceries",
    "low-waste products",
  ],
  "planted tree": [
    "tree plantation",
    "reforestation",
    "forest restoration",
    "tree sapling",
    "gardening",
    "garden",
    "Nature",
    "eco-friendly activity",
    "carbon offset",
    "environmental conservation",
    "green initiative",
    "native tree planting",
    "afforestation effort",
  ],
  "switch to LED bulbs": [
    "energy-efficient lighting",
    "LED replacement",
    "low-energy bulbs",
    "eco-friendly lights",
    "sustainable lighting",
    "green energy saving",
    "carbon footprint reduction",
    "long-lasting bulbs",
    "LED retrofit",
    "energy-saving solutions",
  ],
  "plastic-free packaging": [
    "biodegradable packaging",
    "compostable packaging",
    "recyclable materials",
    "zero plastic wraps",
    "Package Delivery",
    " cardboard",
    "box",
    "disposable Cup",
    "carton",
    "eco-friendly packaging",
    "sustainable packaging",
    "waste-free packaging",
    "natural materials",
    "paper-based packaging",
    "green product packaging",
  ],
};

const REKOG_API_URL = process.env.awsrec;
export async function POST(req) {
  const { userId } = getAuth(req);
  try {
    const payload = await req.json();
    const imageUrl = payload.imagePreviewUrl;
    const category = payload.category;
    const fileName = payload.fileName;

    if (!imageUrl || !category) {
      return new Response(
        JSON.stringify({ message: "Image URL and category are required" }),
        { status: 400 }
      );
    }
    const response = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });
    const tempDir = os.tmpdir();
    const tempImagePath = path.join(
      tempDir,
      Date.now() + path.extname(imageUrl)
    );

    const writer = fs.createWriteStream(tempImagePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", async () => {
        try {
          // Upload image to S3
          const fileStream = fs.createReadStream(tempImagePath);
          const bucketName = "recbuck";
          const objectKey = path.basename(tempImagePath);
          const uploadParams = {
            Bucket: bucketName,
            Key: objectKey,
            Body: fileStream,
            ContentType: response.headers["content-type"],
          };

          await s3.send(new PutObjectCommand(uploadParams));

          // Analyze image (AWS Rekognition)
          const labels = await analyzeImage(bucketName, objectKey);
          console.log(labels);

          if (!Array.isArray(labels)) {
            return resolve(
              new Response(
                JSON.stringify({ message: "Error: Labels are not an array" }),
                { status: 500 }
              )
            );
          }

          const normalizedCategory = category.toLowerCase();
          console.log("here i am ", normalizedCategory);
          if (!categories[normalizedCategory]) {
            return resolve(
              new Response(
                JSON.stringify({ message: "Invalid category provided" }),
                { status: 400 }
              )
            );
          }

          const matchedLabel = labels.some((label) => {
            const normalizedLabelName = label.Name.toLowerCase();
            return categories[normalizedCategory]?.includes(
              normalizedLabelName
            );
          });

          if (matchedLabel) {
            await connectToDb();
            const user = await User.findOne({ clerkId: userId });

            user.points += 5; // Add points for correct match
            await user.save();

            const activity = await Activity.findOne({ clerkId: userId });

            if (activity) {
              activity.reduction += 50; // Add reduction value
              await activity.save();
            } else {
              const newActivity = new Activity({
                clerkId: userId,
                suggestions: "New activity for this user",
                co2: 0,
                reduction: 100, // Initial reduction value
                date: new Date(),
              });

              await newActivity.save();
            }

            return resolve(
              new Response(
                JSON.stringify({
                  message: "Points awarded successfully!",
                  imageUrl: `https://${bucketName}.s3.amazonaws.com/${objectKey}`,
                  points: 5,
                }),
                { status: 200 }
              )
            );
          } else {
            return resolve(
              new Response(
                JSON.stringify({
                  message: "Wrong category, no points awarded.",
                }),
                { status: 400 }
              )
            );
          }
        } catch (uploadError) {
          console.error("Error during upload or analysis:", uploadError);
          return resolve(
            new Response(JSON.stringify({ message: "Internal server error" }), {
              status: 500,
            })
          );
        }
      });

      writer.on("error", (error) => {
        console.error("Error saving image:", error);
        return resolve(
          new Response(JSON.stringify({ message: "Error saving image" }), {
            status: 500,
          })
        );
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

async function analyzeImage(bucketName, objectKey) {
  const response = await axios.post(
    REKOG_API_URL,
    {
      imageKey: objectKey,
      bucketName: bucketName,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  let suggestions;
  if (response.data && response.data.body) {
    const lambdaBody = JSON.parse(response.data.body);
    suggestions =
      lambdaBody.Labels || "Unexpected response format from Lambda.";
  } else {
    suggestions = "Unexpected response format from Lambda.";
  }
  return suggestions;
}
