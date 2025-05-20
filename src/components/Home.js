import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import ArticlePost from './ArticlePost';

const Home = () => {
    const baseUrl = "http://localhost:7700/api/articles/getAll/";
    const [jsonData, setJsonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const authToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchArticles = async () => {
            if (!authToken) {
                setIsLoading(false);
                return;
            }
    
            try {
                const response = await fetch(baseUrl, {
                    method: "GET",
                    headers: {
                        "auth-token": authToken,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
    
                const data = await response.json();
                setJsonData(data.articles || []); // Adjust to match API structure
            } catch (error) {
                console.error("Failed to fetch articles:", error.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchArticles();
    }, [authToken]);

    const customStyle = {
        minHeight: '40vh',
    };

    return (
        <div className='row' style={customStyle}>
            <Slider />
            {authToken ? (
                isLoading ? (
                    <p>Loading articles...</p>
                ) : (
                    <ArticlePost jsonData={jsonData} />
                )
            ) : (
                <p>Please login to view articles.</p>
            )}
        </div>
    );
};

export default Home;