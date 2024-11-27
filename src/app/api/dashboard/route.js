import { connectToDb } from "@/libs/connectToDb";
import Activity from "@/models/Activity/Schema";
import User from "@/models/User/Schema";
import { getAuth } from "@clerk/nextjs/server"; // Clerk authentication

export async function GET(req) {
  try {
    await connectToDb();
    console.log("i am here");
    // Authenticate and fetch user ID from Clerk
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Get user data from database
    const userData = await User.findOne({ clerkUserId: userId });
    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Fetch activities for the authenticated user
    const activities = await Activity.find({ userId: userData._id });

    const maxCo2Footprint = 3000;
    const contribution = 10;

    // Calculate CO2 data
    const co2Emitted = activities.reduce(
      (total, activity) => total + activity.co2,
      0
    );
    const co2Percentage = Math.min((co2Emitted / maxCo2Footprint) * 100, 100);

    // Extract suggestions
    const suggestionsArray = activities
      .map((activity) => activity.suggestions)
      .filter((suggestion) => suggestion.trim() !== "");

    // Return response
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
