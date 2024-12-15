import UserModel from "@/utils/models/user"
import { setTokenCookie, units } from "@/utils/modules"
import { createToken, hashPassword } from "@/utils/server/account-security"
import connect from "@/utils/server/connect"
import { registerSchema } from "@/utils/validations"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connect()
        const userInfos = await req.json()

        const test = registerSchema.safeParse(userInfos)

        if (!test.success) return NextResponse.json({
            message: "Invalid data"
        }, {
            status: 400
        });

        const { lowerCase } = units

        const isUserAlreadyExist = await UserModel.findOne({
            $or: [
                { email: lowerCase(userInfos.email) },
                { username: lowerCase(userInfos.username) }
            ]
        });

        if (isUserAlreadyExist) return NextResponse.json({
            message: "User already exist"
        }, {
            status: 409
        });

        const token = await createToken(userInfos.email);

        (await cookies()).set("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
            path: "/"
        })

        const password = await hashPassword(userInfos.password)

        const user = await UserModel.create({
            ...userInfos,
            password,
            username: lowerCase(userInfos.username),
            role: "USER"
        })
        console.log("user")
        console.log(user)

        if (!user) return NextResponse.json({
            message: "Error creating user"
        }, {
            status: 500
        });

        return NextResponse.json({
            message: "User created successfully",
            user
        })


    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}