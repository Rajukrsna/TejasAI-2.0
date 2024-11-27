import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Activity from "@/models/Activity/Schema";
import Daily from "@/models/Daily/Schema";
import User from "@/models/User/Schema";
import axios from "axios";

const LAMBDA_API_URL = process.env.URILAMA;

export async function GET(req) {
    const userId  = "user_2pQbMG8GIQOhas0DonijxDCsi0T";

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Render log activity page here." });
}

export async function POST(req) {
    const userId  = "user_2pQbMG8GIQOhas0DonijxDCsi0T";

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userInput = await req.json(); // Collect input from the user
    const { transportation, energy, diet, recycling, travel } = userInput;

    const emissionFactors2 = {
      car_petrol: 2.4,
      car_diesel: 2.6,
      public_transport: 0.3,
      bicycle: 0,
      walk: 0,
      electric_vehicle: 0.5,
      renewable: 0,
      nonrenewable: 0.7,
      non_vegetarian: 4.7,
      balanced: 2.5,
      vegetarian: 1.5,
      vegan: 1.0,
      flights: 90,
    };

    const co2_transportation = emissionFactors2[transportation] * 20 || 0;
    const co2_energy = emissionFactors2[energy] * 30 || 0;
    const co2_diet = emissionFactors2[diet] * 60 || 0;
    const co2_recycling =
      recycling === "always"
        ? 0.1
        : recycling === "sometimes"
        ? 0.2
        : 0.3; // Example values
    const co2_travel = emissionFactors2.flights * travel;

    // Get user details (ensure schema is compatible)
    const user = await User.findById(userId);

    const dailyact = new Daily({
      userId: user._id,
      transportation,
      energy,
      diet,
      recycling,
      travel,
      co2_transportation,
      co2_energy,
      co2_diet,
      co2_recycling,
      co2_travel,
    });

    await dailyact.save();

    let suggestions = "";

    // Call the AI model for the response
    const response = await axios.post(
      LAMBDA_API_URL,
      {
        prompt: `Given the following user data: ${JSON.stringify(
          userInput
        )}, suggest activities to reduce carbon footprint.`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data && response.data.body) {
      const lambdaBody = JSON.parse(response.data.body);
      suggestions = lambdaBody.reply || "Unexpected response format from Lambda.";
    } else {
      suggestions = "Unexpected response format from Lambda.";
    }

    const co2Emitted =
      (transportation === "car_petrol" ? emissionFactors2.car_petrol * 20 : 0) +
      (diet ? emissionFactors2[diet] * 90 : 0) +
      (travel ? travel * emissionFactors2.flights : 0);

    const co2Reduced =
      ["bicycle", "walk"].includes(transportation) ? 2 : 0; // Example reduction

    const newActivity = new Activity({
      userId: user._id,
      suggestions,
      co2: co2Emitted - co2Reduced,
      reduction: 0,
      date: new Date(),
    });

    await newActivity.save();

    return NextResponse.json({ message: "Data logged successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error logging data" }, { status: 500 });
  }
}
