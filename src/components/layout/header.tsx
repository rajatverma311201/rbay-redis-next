import Link from "next/link";
import { Button } from "../ui/button";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <div className="fixed top-0 mb-8 w-full border-b bg-accent p-2">
            <div className="container mx-auto flex flex-row items-center justify-between">
                <Link href="/">
                    <p className="ml-8 flex text-lg text-primary">RBay</p>
                </Link>
                {/* <Search /> */}
                <div className="mr-8 flex items-center gap-4 md:flex">
                    {/* {#if $session && $session.userId}
				<p>{$session.username}</p> */}
                    <Button asChild>
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
                    </Button>
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
