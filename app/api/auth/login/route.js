import UserModel from "@/utils/models/user";
import { comparePassword, createToken, setToken } from "@/utils/server/account-security";
import connect from "@/utils/server/connect";
import { loginSchema } from "@/utils/validations";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();

        // Validate the request data against the schema
        const validate = loginSchema.safeParse(data);
        if (!validate.success) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }

        const { idenitifier, password } = validate.data;

        // Check if the user exists by email or username
        const user = await UserModel.findOne({
            $or: [
                { email: idenitifier },
                { username: idenitifier }
            ]
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }

        // Verify the provided password with the stored hashed password
        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }

        const result = await setToken({
            email: user.email,
        })

        console.log(result)


        // Respond with a success message if all checks pass
        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

    } catch (error) {
        // Handle unexpected errors
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
};
