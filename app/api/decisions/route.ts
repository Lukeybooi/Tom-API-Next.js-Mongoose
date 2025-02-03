import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Decision from "@/models/Decision";

await connectDB();

/**
 * @desc Fetch all stored decisions
 * @route GET /api/decisions
 */
export async function GET() {
  try {
    const decisions = await Decision.find().lean();
    return NextResponse.json(
      { success: true, data: decisions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving decisions",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

/**
 * @desc Store a new decision
 * @route POST /api/decisions
 */
export async function POST(req: Request) {
  try {
    const { modelId, inputs, decision } = await req.json();

    if (!modelId || !inputs || !decision) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDecision = await Decision.create({ modelId, inputs, decision });

    return NextResponse.json(
      {
        success: true,
        message: "Decision saved successfully",
        data: newDecision,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error saving decision",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
