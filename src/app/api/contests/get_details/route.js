import { connectToDb } from "@/libs/connectToDb";
import UploadImg from "@/models/UploadImage/Schema";

export async function GET(req) {
  const { contestid, userId } = req.query;

  try {
    await connectToDb();
    const detail = await UploadImg.findOne({clerkId: userId});
    const len = detail.images?.length ||  0
    return NextResponse.json(len*5, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error while fetching data" }, { status: 500 });
  }
}
