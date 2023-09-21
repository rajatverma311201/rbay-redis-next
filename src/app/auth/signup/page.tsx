"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { session } from "../app/stores"; // Replace with your store import
import { f, post } from "@/utils/fetch";

function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseData = await post("/api/auth/signup", {
                username,
                password,
            });
            /*
            user id = dfba87
            */
            console.log(responseData);
            // if (response.err) {
            //     setErr(response.err);
            //     return;
            // }

            // const [data] = await f("/sessions"); // Replace with your fetch utility
            // // session.set(data);

            // router.push("/dashboard/items");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mx-auto flex max-w-md flex-col items-center rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-2 self-center text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
                Create a new account
            </div>
            <span className="flex-items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                    href="/auth/signin"
                    className="text-sm text-blue-500 underline hover:text-blue-700"
                >
                    Sign in
                </a>
            </span>
            <div className="mt-8 p-6">
                <form onSubmit={onSubmit}>
                    <div className="mb-2 flex flex-col">
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                                name="username"
                                placeholder="User Name"
                            />
                        </div>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {err && <div className="my-4 text-red-600">{err}</div>}

                    <div className="my-4 flex w-full">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-purple-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
