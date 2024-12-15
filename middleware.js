import { NextResponse } from "next/server"
import { exact, startsWith } from "./utils/modules"
import { cookies } from "next/headers"
import app from "./utils/server/api"

const middleware = async (request) => {
    let path = request.nextUrl.pathname
    const token = (await cookies()).get("token")?.value
    const { message, ok: isEmptyAuthRoute } = exact.safeTest(path, "/auth")

    // if (!token && startsWith(path, '/dashboard')) {
    // return NextResponse.redirect(new URL("/auth/login", request.url))
    // }



    if (token && startsWith(path, '/auth')) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    } else if (token && startsWith(path, '/login')) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    } else if (!token && startsWith(path, '/dashboard')) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (isEmptyAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    console.log(path)

    if (startsWith(path, "/dashboard/signout")) {
        const logout = async () => {
            const res = await app.get("/auth/logout")
            console.log(res)
            return res.data
        }

        logout()

    }

}

export default middleware