import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Products from '@/lib/models/car.model';
export async function GET(req: NextRequest) {
    await connectToDatabase();

    // Extract productId from query parameters
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    // Validate userId
    if (!productId) {
        return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    try {
        // Fetch tasks associated with the productId
        const tasks = await Products.find({ productId });

        // Instead of returning a 404 error, return an empty array if no tasks are found
        return NextResponse.json({ contents: tasks }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}
