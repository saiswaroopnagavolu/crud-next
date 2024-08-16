import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    
    {
        title: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const topic = mongoose.models.Topic || mongoose.model("Topic",topicSchema);

export default topic;