import React, { useEffect, useState } from 'react';
import { Container, Postcard } from '../Components';
import service from '../AppWrite/configure';
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) {
            navigate('/');
            return;
        }

        service.getDocument('posts', slug)
            .then(doc => {
                setPost(doc);
            })
            .catch(error => {
                console.error("Error fetching document:", error);
                navigate('/404');
            })
            .finally(() => setLoading(false));
    }, [slug, navigate]);

    if (loading) return <p>Loading...</p>;
    if (!post) return null;

    return (
        <Container>
            <Postcard post={post} />
            {/* Future Edit Form Goes Here */}
        </Container>
    );
}

export default Editpost;
