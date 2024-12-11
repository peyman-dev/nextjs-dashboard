import { loginSchema } from "@/utils/validations"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const data = await req.json()
        const validate = await loginSchema.safeParse(data)

        console.log(validate?.error?.format())

        if (!validate.success) return NextResponse.json({
            message: "Invalid credentials"
        }, {
            status: 400
        });

        return NextResponse.json({
            message: "User Logged In Successfully !",
            data: validate.data
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}