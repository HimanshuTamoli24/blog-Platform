import { useCallback, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, Rte } from "../";
import service from "../../AppWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            featuredImage: post?.featuredImage || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const onSubmit = async (data) => {
        try {
            let fileId = post?.featuredImage || "";

            // Handle file upload
            if (data.image?.[0]) {
                const uploadedFile = await service.uploadFile(data.image[0]);
                if (uploadedFile) {
                    if (post?.featuredImage) {
                        await service.deleteFile(post.featuredImage);
                    }
                    fileId = uploadedFile.$id;
                } else {
                    throw new Error("File upload failed");
                }
            }

            const postData = {
                ...data,
                featuredImage: fileId,
                userId: userData.$id,
            };

            const dbPost = post
                ? await service.updatePost(post.$id, postData)
                : await service.createPost(postData);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error creating or updating post:", error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        return value?.trim().toLowerCase().replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && value.title) {
                const newSlug = slugTransform(value.title);
                if (getValues("slug") !== newSlug) {
                    setValue("slug", newSlug, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform, getValues]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: "Slug is required" })}
                    onBlur={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                />
                <Rte label="Content :" name="content" control={control} setValue={setValue} getValues={getValues} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: post ? false : "Image is required" })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
