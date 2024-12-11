import { SignJWT, jwtVerify } from 'jose'
import { compare, hashSync, genSaltSync } from 'bcryptjs'

const SECRET_KEY = (process.env.JWT_SECRET, 'utf-8')
const PRIVATE_KEY = new TextEncoder().encode(SECRET_KEY)

export const createToken = async (email) => {
    try {
        // مطمئن شوید که payload یک شیء است
        const payload = { email };  // { email: email }

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("90d")
            .sign(new TextEncoder().encode(process.env.PRIVATE_KEY)); // استفاده از کلید خصوصی

        return token;
    } catch (error) {
        // پیام خطا را دقیق‌تر چاپ کنید
        console.error("Error creating token:", error);
        throw new Error("Token creation failed");
    }
};


export const verifyToken = async (token) => {
    const { payload } = await jwtVerify(token, PRIVATE_KEY)
    return payload
}

export const hashPassword = async (password) => {
    const salt = genSaltSync(12)
    const hashedPassword = hashSync(password, salt)
    return hashedPassword
}