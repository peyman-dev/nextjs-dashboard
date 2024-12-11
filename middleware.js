import { NextResponse } from "next/server"
import { exact, startsWith } from "./utils/modules"

const middleware = (request) => {
    let path = request.nextUrl.pathname
    const { message, ok: isEmptyAuthRoute } = exact.safeTest(path, "/auth")
    console.log(path)

    if (isEmptyAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

}

export default middleware