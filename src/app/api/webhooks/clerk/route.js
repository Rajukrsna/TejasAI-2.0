import { Webhook } from "svix";
import { headers } from "next/headers";
import { createUser } from "@/libs/actions/user.action";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with ID: ${id} and type: ${eventType}`);
  console.log("Webhook body:", body);

  if (evt.type === "user.created") {
    console.log("userId:", evt.data.id);

    const { id, email_addresses, image_url, username } = evt.data;
    const user = {
      clerkId: id,
      username: username,
      email: email_addresses[0].email_address,
    };

    console.log("from Clerk webhooks", user);
    try {
      console.log("before new user");
      const newUser = await createUser(user);
      console.log("new user is", newUser);

      // if (newUser) {
      //   await clerkClient.users.updateUser(id, {
      //     publicMetadata: {
      //       userId: newUser._id,
      //     },
      //   });
      //   console.log("Metadata updated successfully");
      // }
    } catch (error) {
      console.error(
        "Error during user creation or Clerk metadata update:",
        error
      );
    }
    return new Response(
      JSON.stringify({
        message: "User added successfully",
      }),
      { status: 200 }
    );
  }

  return new Response("", { status: 200 });
}