import UserModel from "@/utils/models/user"
import { verifyToken } from "@/utils/server/account-security"
import connect from "@/utils/server/connect"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    await connect()
    const session = (await cookies()).get("token").value

    const data = await verifyToken(session)

    const itsGoogleData = data.payload ? true : false

    const user = await UserModel.findOne({
        email: itsGoogleData ? data.payload.email.email : data.email
    })

    if (!user) return NextResponse.json({
        message: "User not found"
    }, { status: 404 })

    return NextResponse.json((
        user
    ), {
        status: 200
    })
}