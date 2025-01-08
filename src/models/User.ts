import mongoose, { Document, Schema } from "mongoose";

interface userType extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema<userType> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose?.models?.users || mongoose.model<userType>("users", userSchema)

export default User