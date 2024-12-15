import { SignJWT, jwtVerify } from 'jose'
import { compare, hashSync, genSaltSync, compareSync } from 'bcryptjs'
import { decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET_KEY = (process.env.JWT_SECRET, 'utf-8')
const PRIVATE_KEY = new TextEncoder().encode(SECRET_KEY)

export const createToken = async (email) => {
    try {
        // مطمئن شوید که payload یک شیء است
        const payload = { email };  // { email: email }

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("90d")
            .sign(PRIVATE_KEY) // استفاده از کلید خصوصی

        return token;
    } catch (error) {
        // پیام خطا را دقیق‌تر چاپ کنید
        console.error("Error creating token:", error);
        throw new Error("Token creation failed");
    }
};


export const verifyToken = async (token) => {
    const data = decode(token, {
        complete: true,

    })
    console.log(data)
    return data
}

export const setToken = async (email) => {
    try {
        const token = await createToken(email)

        return (cookies().set("token", token, {
            path: "/",
            maxAge: 90 * 24 * 60 * 60,
            httpOnly: true,
        }
        ))
    } catch (error) {
        throw new Error(error.message)
    }

}

export const hashPassword = async (password) => {
    const salt = genSaltSync(12)
    const hashedPassword = hashSync(password, salt)
    return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
    const isPasswordMatch = compareSync(password, hashedPassword)
    return isPasswordMatch
}