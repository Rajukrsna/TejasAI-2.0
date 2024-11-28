import { connectToDb } from "@/libs/connectToDb";
import Activity from "@/models/Activity/Schema";
import User from "@/models/User/Schema";
import { getAuth } from "@clerk/nextjs/server"; // Clerk authentication

export async function GET(req) {
  try {
    await connectToDb();
    const { userId } = getAuth(req);
    // const userId  = "user_2pQbMG8GIQOhas0DonijxDCsi0T";
    console.log("from backend",userId);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userData = await User.findOne({ clerkId: userId });
    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const activities = await Activity.find({ userId: userData._id });

    const maxCo2Footprint = 3000;
    const contribution = 10;
    const co2Emitted = activities.reduce(
      (total, activity) => total + activity.co2,
      0
    );
    const co2Percentage = Math.min((co2Emitted / maxCo2Footprint) * 100, 100);

    const suggestionsArray = activities
      .map((activity) => activity.suggestions)
      .filter((suggestion) => suggestion.trim() !== "");

    return new Response(
      JSON.stringify({
        user: {
          username: userData.username,
          points: userData.points,
        },
        co2Percentage,
        co2Emitted,
        maxCo2Footprint,
        contribution,
        suggestions: suggestionsArray,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error loading dashboard:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
