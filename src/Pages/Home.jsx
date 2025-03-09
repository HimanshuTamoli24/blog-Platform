import React, { useEffect, useState } from 'react';
import service from '../AppWrite/configure';
import { Container, Postcard } from '../Components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getAllPosts()
            .then(res => {
                if (res?.documents) {
                    setPosts(res.documents);
                }
            })
            .catch(err => console.error("Error fetching posts:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h1>Loading posts...</h1>;

    if (posts.length === 0) {
        return (
            <Container>
                <h1>No posts found</h1>
                <p>Be the first to create a post!</p>
            </Container>
        );
    }

    return (
        <Container>
            {posts.map(post => (
                <Postcard key={post.$id} post={post} />
            ))}
        </Container>
    );
}

export default Home;
