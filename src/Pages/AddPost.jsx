import React from 'react';
import { Container, PostForm } from '../Components';
import service from '../AppWrite/configure';
import { useNavigate } from 'react-router-dom';

function AddPost() {
    const navigate = useNavigate();

    const handlePostSubmit = async (postData) => {
        try {
            const newPost = await service.createPost(postData);
            if (newPost) {
                navigate(`/post/${newPost.$id}`); // Redirect to the new post
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Container>
            <PostForm onSubmit={handlePostSubmit} post={{ title: '', content: '' }} />
        </Container>
    );
}

export default AddPost;
