import mongoose, { Schema, Document } from "mongoose";

interface BlogType extends Document {
    title: string;
    description: string;
    imageURL: string;
    category: 'Nature' | 'Mountain' | 'Ocean' | 'Wildlife' | 'Forest';
    authorID: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId
}

const BlogSchema: Schema<BlogType> = new mongoose.Schema<BlogType>({
    title: {
        type: String,
        required: true,
        min:4
    },
    description: {
        type: String,
        required: true,
        min:10
    },
    imageURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Nature',
            'Mountain',
            'Ocean',
            'Wildlife',
            'Forest',
        ]
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }
}, { timestamps: true })

const Blog = mongoose?.models?.Blog || mongoose.model<BlogType>("Blog", BlogSchema)

export default Blog