import React, {useState, useEffect} from "react";
import ArticlePost from "./ArticlePost";

const MyAccount = () => {

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

  return (
    <div className="row mt-4">
      <div className="col-md-4 col-lg-4"></div>
      <div className="col-md-4 col-lg-4">
        <div className="heading text-center mb-4 mt-4">
          <h2>Add New Articles</h2>
          <p className="my-0">
            Stay updated with the latest articles and news in the world of
            technology.
          </p>
        </div>
        <hr />
        <div className="card shadow rounded-3 px-3 py-3">
          <div className="card-body">
            <h1 className="text-center">Add Your Article</h1>
            <p className="text-center">
              Please enter below details to add new article
            </p>
            <hr />
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Privacy
                </label>
                <select className="form-select" aria-label="Privacy">
                  <option value="1">Public</option>
                  <option value="2">Private</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-12 col-lg-12">
        <div className="row article-post mt-4">
          <div className="heading text-center mb-4 mt-4">
            <h2>Your Latest Articles</h2>
            <p className="my-0">
              Stay updated with the latest articles and news in the world of
              technology.
            </p>
          </div>
          <hr />
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
      </div>

      <ArticlePost />
    </div>
  );
};

export default MyAccount;
