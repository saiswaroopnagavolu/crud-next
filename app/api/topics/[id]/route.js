import connectMongoDB from "@/libs/mongodb";
import topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newDescription: description } = await request.json();

        await connectMongoDB();
        const updatedTopic = await topic.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating topic:", error);
        return NextResponse.json({ message: "Failed to update topic" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;

        await connectMongoDB();
        const topicData = await topic.findById(id);

        if (!topicData) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json(topicData, { status: 200 });
    } catch (error) {
        console.error("Error fetching topic:", error);
        return NextResponse.json({ message: "Failed to fetch topic" }, { status: 500 });
    }
}
