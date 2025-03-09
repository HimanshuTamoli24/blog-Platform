import React, { useEffect, useState } from 'react';
import { Container, Postcard } from '../Components';
import service from '../AppWrite/configure';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        service.getAllPosts()
            .then((response) => {
                if (!response || !response.documents) {
                    setError('No posts found.');
                    return;
                }

                if (response.documents.length === 0) {
                    setError('No posts available.');
                    return;
                }

                setPosts(response.documents);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setError('Failed to load posts.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            {posts.map(post => (
                <Postcard key={post.$id} post={post} />
            ))}
        </Container>
    );
}

export default AllPost;
