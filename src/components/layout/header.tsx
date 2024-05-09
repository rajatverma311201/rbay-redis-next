"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signout } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface HeaderProps {
    authSession: {
        id: string;
        userId: string;
        username: string;
    } | null;
}

export const Header: React.FC<HeaderProps> = ({ authSession }) => {
    const router = useRouter();
    const handleLogout = async () => {
        toast.loading("Logging out...");
        try {
            await signout();

            toast.dismiss();
            toast.success("Logged out successfully");

            router.replace("/");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to logout");
        }
    };

    return (
        <div className="fixed top-0 z-50 mb-8 w-full border-b bg-accent p-3">
            <div className="mx-auto grid  grid-cols-3 items-center justify-items-start">
                <Link href="/">
                    <p className="ml-8 flex text-xl font-semibold text-primary ">
                        RBay
                    </p>
                </Link>
                {/* <Search /> */}
                <Input
                    className="max-w-96 justify-self-center"
                    placeholder="Search ..."
                />
                <div className="mr-8 flex items-center gap-4 justify-self-end md:flex">
                    {/* {#if $session && $session.userId}
				<p>{$session.username}</p> */}
                    {/* <Button asChild>
                        <Link href="/dashboard/items/new">New</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/items">Dashboard</Link>
                    </Button>
                    <Button
                        variant={"outline"}
                        role="secondary"
                        // on:click={onClick}
                    >
                        Logout
                    </Button> */}
                    {/* {:else} */}
                    {authSession && authSession.userId ? (
                        <>
                            <p>{authSession.username}</p>
                            <Button asChild>
                                <Link href="/dashboard/items/new">New</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/dashboard/items">Dashboard</Link>
                            </Button>

                            <Button
                                variant={"outline"}
                                role="secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href="/auth/sign-in">Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/sign-up">Sign Up</Link>
                            </Button>
                        </>
                    )}
                    {/* {/if} */}
                </div>
            </div>
        </div>
    );
};
