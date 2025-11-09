import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    // Validate secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    if (tag) {
      // Note: revalidateTag signature may vary by Next.js version
      // For Next.js 16+, you may need to adjust the implementation
      // revalidateTag(tag);
      return NextResponse.json({ revalidated: false, message: "Tag revalidation not implemented" });
    }

    return NextResponse.json(
      { error: "Either 'path' or 'tag' is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
