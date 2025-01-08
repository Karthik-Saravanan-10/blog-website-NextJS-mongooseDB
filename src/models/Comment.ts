import mongoose, { Schema, Document } from "mongoose";

interface CommentType extends Document {
    blogId: mongoose.Types.ObjectId;
    authorID: mongoose.Types.ObjectId;
    text: string
}

const CommentSchema: Schema<CommentType> = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    }
})

const Comments = mongoose?.models?.Comments || mongoose.model<CommentType>("Comments", CommentSchema)

export default Comments