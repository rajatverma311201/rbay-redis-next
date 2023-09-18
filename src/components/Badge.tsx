import React from "react";

interface BadgeProps {
    role: string;
    children: React.ReactNode;
}

function Badge({ role, children }: BadgeProps) {
    let textColor = "";
    let bgColor = "";

    if (role === "success") {
        textColor = "text-green-900";
        bgColor = "bg-green-300";
    } else if (role === "secondary") {
        textColor = "text-gray-900";
        bgColor = "bg-gray-300";
    } else if (role === "danger") {
        textColor = "text-red-900";
        bgColor = "bg-red-300";
    }

    return (
        <span
            className={`relative inline-block px-3 py-1 font-semibold ${textColor} leading-tight`}
        >
            <span
                className={`absolute inset-0 rounded-full opacity-50 ${bgColor}`}
            />
            <span className="relative">{children}</span>
        </span>
    );
}

export default Badge;
