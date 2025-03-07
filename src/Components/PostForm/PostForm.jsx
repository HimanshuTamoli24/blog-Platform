import { useCallback, useEffect } from "react";
import React from 'react'
import { useForm } from "react-hook-form";
import { Button, Input, Rte } from "../"
import service from "../../AppWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues }
        = useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                featuredImage: post?.featuredImage || '',
                status: post?.status || 'active',
            }
        })
    const navigation = useNavigate()
    const userData = useSelector(state => state.user.userData)
    const onSubmit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? service.uploadFile(data.image[0]) : null
                if (file) {
                    service.deleteFile(post.featuredImage)
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,//will work on later
                    userId: userData.$id,
                })

                if (dbPost) {
                    navigation(`/post/${dbPost.$id}}`)
                }

            } else {
                const file = data?.image[0]
                if (file) {
                    const dbPost = await service.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        featuredImage: file ? service.uploadFile(file).$id : "",
                        status: data.status,
                        userId: userData.$id,
                    })
                    if (dbPost) {
                        navigation(`/post/${dbPost.$id}`)
                    }
                }
            }
        }
        catch (error) {
            console.error("Error creating or updating post:", error.message)
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === string) {
            return value.trim().toLowerCase().replace(/\s+/g, '-')
        }
        return ''
    },[])
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        })
        return () => subscription.unsubscribe();


    }, [watch, slugTransform, setValue])
    return (
        <div>PostForm</div>
    )
}

export default PostForm;