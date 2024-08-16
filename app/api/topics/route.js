import connectMongoDB from "@/libs/mongodb";
import topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        await connectMongoDB();
        const newTopic = await topic.create({ title, description });
        
        return NextResponse.json({ message: "Topic Created", topic: newTopic }, { status: 201 });
    } catch (error) {
        console.error("Error creating topic:", error);
        return NextResponse.json({ message: "Failed to create topic" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const topics = await topic.find();

        return NextResponse.json({ topics }, { status: 200 });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ message: "Failed to fetch topics" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        if (!id) {
            return NextResponse.json({ message: "Topic ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        const deletedTopic = await topic.findByIdAndDelete(id);

        if (!deletedTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting topic:", error);
        return NextResponse.json({ message: "Failed to delete topic" }, { status: 500 });
    }
}
