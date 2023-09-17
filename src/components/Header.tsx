import React from "react";
import Button from "./Button";
import Link from "next/link";

function Header() {
    return (
        <>
            <div className="shadow-xs mb-8 w-full bg-amber-500 p-2">
                <div className="container mx-auto flex flex-row items-center justify-between">
                    <Link href="/">
                        <div className="ml-8 flex text-lg text-white">RBay</div>
                    </Link>
                    {/* <Search /> */}
                    <input />
                    <div className="mr-8 flex hidden items-center gap-4 md:flex">
                        {/* {#if $session && $session.userId} */}
                        {/* <p>{$session.username}</p> */}

                        {/* <Link href="/dashboard/items/new">
                            <Button>New</Button>
                        </Link>
                        <Link href="/dashboard/items">
                            <Button>Dashboard</Button>
                        </Link>
                        <Button role="secondary">Logout</Button> */}

                        {/* {:else} */}
                        <Link href="/auth/signin">
                            <Button>Sign In</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
