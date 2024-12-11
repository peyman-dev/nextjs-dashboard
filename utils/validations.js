import { z } from "zod";

export const loginSchema = z.object({
    idenitifier: z.string("This field is required").min(4, "This field must be at least 4 characters long"),
    password: z.string("Please enter your password").min(8)
});


export const registerSchema = z.object({
    fullName: z.string("Please enter your full name").min(4, "This field must be at least 4 characters long"),
    email: z.string("Please enter your email address").email("Please enter a valid email address"),
    password: z.string("Please enter your password").min(8, "This field must be at least 8 characters long"),
    username: z.string("Please enter your username").min(4, "This field must be at least 4 characters long"),
})