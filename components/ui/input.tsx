import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-red-500" : "border-gray-300"
                        } ${className}`}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
