import { Schema } from "mongoose"
import mongoose from "../database/database-mongo"
import bycrptjs from "bcryptjs"

interface IUser{
    name: string,
    email: string,
    password: string,
    createdAt: Date,
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    createdAt: {type: Date, default: Date.now}
})

userSchema.pre("save", async function(next){
    const hash = await bycrptjs.hash(this.password, 10)
    this.password = hash
})

export const User = mongoose.model<IUser>('User', userSchema)