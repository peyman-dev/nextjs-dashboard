import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const logOut = () => new Promise(async (resolve, reject) => {
    try {
        cookies().delete("token", {
            path: "/"
        })
        return resolve({
            message: "Token successfully removed"
        })
    } catch (error) {
        return reject(error)
    }

})

export async function GET() {
    await logOut().then((res) => {
        return NextResponse.json(res)
    }).catch((err) => {
        return NextResponse.json(err)
    }
    )
}