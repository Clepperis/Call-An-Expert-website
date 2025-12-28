import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`px-6 py-4 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={`text-lg font-semibold ${className}`} {...props}>
            {children}
        </h3>
    );
}
