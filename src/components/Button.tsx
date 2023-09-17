import React from "react";

import cls from "classnames";

interface ButtonProps {
    icon?: string;
    iconOutline?: boolean;
    loading?: boolean;
    fadeIn?: boolean;
    disabled?: boolean;
    role?: "primary" | "secondary" | "success" | "danger";
    klass?: string;
    children?: React.ReactNode;
}

function Button({
    icon,
    iconOutline = false,
    loading = false,
    fadeIn = false,
    disabled = false,
    role = "primary",
    klass,
    children,
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
    const iconKlasses = cls(
        "text-center mr-1",
        {
            "animate-spin": loading,
        },
        iconOutline ? "material-icons-outlined" : "material-icons",
    );

    const common = cls(fadeIn ? "opacity-30 hover:opacity-100" : "", {
        "opacity-75": loading,
    });

    const textButton = cls(
        common,
        {
            "bg-green-500 hover:bg-green-700 disabled:bg-green-300":
                role === "success",
            "bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300":
                role === "primary",
            "bg-gray-500 hover:bg-gray-700 disabled:bg-gray-300":
                role === "secondary",
            "bg-red-500 hover:bg-red-700 disabled:bg-red-300":
                role === "danger",
            "cursor-not-allowed": disabled,
        },
        `py-2 px-4 flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full`,
        "flex items-center align-center",
        klass,
    );

    return (
        <>
            <button
                disabled={disabled || loading}
                type="button"
                className={textButton}
            >
                {icon && <span className={iconKlasses}>{icon}</span>}
                {children}
            </button>
        </>
    );
}

export default Button;
