import React from 'react';

function Button({
    children,
    type = "button",
    className = "",
    bgColor = "bg-blue-400",
    ...props
}) {
    return (
        <button
            type={type}
            className={`${bgColor} ${className} px-4 py-2 text-white rounded`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
