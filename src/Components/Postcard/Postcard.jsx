import React from "react";
import { Service } from "../../AppWrite/configure";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-48 overflow-hidden">
                {featuredImage ? (
                    <img
                        src={Service.filePreview(featuredImage)}
                        alt={title || "Post image"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Image
                    </div>
                )}
            </div>
            <h3 className="p-4 text-lg font-semibold text-gray-900">{title}</h3>
        </Link>
    );
}

export default Postcard;
