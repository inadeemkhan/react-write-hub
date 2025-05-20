import React from 'react';

const ArticlePost = ({ jsonData }) => {
    console.log(jsonData);

    return (
        <div className="row article-post mt-4">
            <div className='heading text-center mb-4 mt-4'>
                <h2>Our Latest Articles</h2>
                <p className='my-0'>Stay updated with the latest articles and news in the world of technology.</p>
            </div>

            {/* Loop through the jsonData and display each article */}
            {jsonData?.map((article, index) => (
                <div className='col-md-4 mb-4' key={index}>
                    <div className="card h-100">
                        <img 
                            src={`https://picsum.photos/400/400?random=${index}`} 
                            className="card-img-top" 
                            alt="Article" 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{article.title || 'Untitled'}</h5>
                            <p className="card-text">{article.content || 'No content available.'}</p>
                            <p className="card-text my-0">
                                <small className="text-muted">Updated: {article.updatedAt || 'N/A'}</small>
                            </p>
                            <p className="card-text my-0">
                                <small className="text-muted">Author: {article.author || 'Unknown'}</small>
                            </p>
                            <p className="card-text my-0">
                                <small className="text-muted">Tags: {(article.tags || []).join(', ')}</small>
                            </p>
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlePost;