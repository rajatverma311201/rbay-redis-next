"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Link from "next/link";
import { signin, signup } from "@/actions/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

interface AuthFormProps {
    isSignUp?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

        toast.loading("Please Wait...");

        try {
            if (isSignUp) {
                const success = await signup(data.username, data.password);
                if (success) {
                    toast.dismiss();
                    toast.success("Account created successfully");
                }
            } else {
                const success = await signin(data.username, data.password);
                if (success) {
                    toast.dismiss();
                    toast.success("Sign In successfull");
                }
            }
            router.replace("/");
        } catch (error: any) {
            if (error instanceof Error) {
                toast.dismiss();

                toast.error(error.message);

                console.error("HELLO", error.message);
                form.setError("username", {
                    message: error.message,
                });
            }
        }
    }

    const titles = {
        "sign-up": "Create a new account",
        "sign-in": "Sign In to Your Account",
    };

    const descriptions = {
        "sign-up": "Already have an account?",
        "sign-in": "Don't have an account?",
    };

    const linkHrefs = {
        "sign-up": "/auth/sign-in",
        "sign-in": "/auth/sign-up",
    };

    const linkTexts = {
        "sign-up": "Sign In",
        "sign-in": "Sign Up",
    };

    const buttonTexts = {
        "sign-up": "Sign Up",
        "sign-in": "Sign In",
    };

    const key = isSignUp ? "sign-up" : "sign-in";

    return (
        <div className="grid place-items-center px-2 py-10 md:py-20">
            <Card className="mx-auto w-full sm:w-auto">
                <CardHeader>
                    <CardTitle>{titles[key]}</CardTitle>
                    <CardDescription>
                        {descriptions[key]}{" "}
                        <Link
                            href={linkHrefs[key]}
                            className="ml-2 font-medium text-blue-700 underline hover:text-blue-600"
                        >
                            {linkTexts[key]}
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-6 sm:min-w-96"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your unique public display
                                            name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your password
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full disabled:cursor-not-allowed disabled:opacity-75"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2
                                            className="mr-5 animate-spin text-primary-foreground"
                                            // size={18}
                                        />{" "}
                                        Please Wait
                                    </>
                                ) : (
                                    buttonTexts[key]
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    );
};
