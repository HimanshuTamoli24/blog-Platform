import { useCallback, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Rte } from "../";
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
    const userData = useSelector((state) => state.user.userData);

    const onSubmit = async (data) => {
        try {
            let fileId = post?.featuredImage || "";

            if (data.image?.[0]) {
                const uploadedFile = await service.uploadFile(data.image[0]);
                if (uploadedFile) {
                    if (post?.featuredImage) {
                        await service.deleteFile(post.featuredImage);
                    }
                    fileId = uploadedFile.$id;
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
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
