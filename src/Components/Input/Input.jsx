import React, { useId } from 'react';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { label, type = 'text', className = "", ...props },
    ref
) {
    const id = useId(); // Generate a unique ID

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}
            <input
                id={id}
                type={type}
                ref={ref}
                className={`border border-gray-300 px-3 py-2 rounded ${className}`}
                {...props}
            />
        </div>
    );
});

export default Input;
