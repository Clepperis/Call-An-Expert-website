import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", error, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
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

Textarea.displayName = "Textarea";
