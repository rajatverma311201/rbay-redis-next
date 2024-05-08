import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <div className="fixed top-0 z-50 mb-8 w-full border-b bg-accent p-3">
            <div className="mx-auto grid  grid-cols-3 items-center justify-items-stretch">
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
                <div className="mr-8 flex items-center justify-end gap-4 md:flex">
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
                    <Button asChild>
                        <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                    {/* {/if} */}
                </div>
            </div>
        </div>
    );
};
