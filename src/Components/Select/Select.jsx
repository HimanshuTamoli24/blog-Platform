import React, { forwardRef, useId } from "react";

const Select = forwardRef(({ options, label, className = "", ...props }, ref) => {
    const generatedId = useId();
    const selectId =  generatedId;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                {...props}
                id={selectId}
                ref={ref}
                className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
