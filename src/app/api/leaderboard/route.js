import { connectToDb } from '@/libs/connectToDb';
import User from '@/models/User/Schema';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
    try {
        await connectToDb(); // Ensure the database is connected
        const { userId } = getAuth(req);
        // const userId  = "user_2pQbMG8GIQOhas0DonijxDCsi0T";
        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // Fetch the top 10 users based on points
        const users = await User.find().sort({ points: -1 }).limit(10).select('username points');

        // Fetch the current user's data
        const currentUser = await User.findOne({ clerkId: userId }).select('username points'); // Assuming `clerkId` is stored in the User model

        if (!currentUser) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Return leaderboard data
        return new Response(
            JSON.stringify({
                users,
                currentUser,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
