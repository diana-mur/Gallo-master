import { } from "dotenv/config"
import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(
        payload,
        process.env.KEY,
        { expiresIn: "24h" }
    )
}