import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        />
    );
}
