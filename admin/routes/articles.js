const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { validationResult } = require("express-validator");
const { articleValidation } = require("../validations/articleValidation");
const fetchUser = require("../middleware/fetchUser");

// POST a new article
router.post("/create", fetchUser, articleValidation, async (req, res) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // extract the author from the request using auth token
    req.body.author = req.author.id;
    const { title, content, author, tags } = req.body;

    // Check if the article already exists
    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
        return res.status(400).json({ message: "Article with this title already exists" });
    }

    // Create a new article
    const newArticle = new Article({ title, content, author, tags });

    try {
        const savedArticle = await newArticle.save();
        return res.status(201).json({ message: "Article saved successfully", savedArticle });
    } catch (error) {
        return res.status(500).json({ message: "Error saving article", error });
    }
});

// edit an article
router.put("/edit/:id", fetchUser, articleValidation, async (req, res) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const autherObjectId = req.author.id;  // Extract the author ID from the request using auth token
    const articleAuthorId = req.body.author;  // Extract the author ID from the request body
    if (autherObjectId !== articleAuthorId) {
        return res.status(401).json({ error: "Unauthorized access. Please log in as a valid customer to proceed." });
    }

    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    
    const { title, content, author, tags } = req.body;
    const updatedArticle = { title, content, author, tags };
    try {
        const savedArticle = await Article.findByIdAndUpdate(articleId, updatedArticle, { new: true });
        return res.status(200).json({ message: "Article updated successfully", savedArticle });
    } catch (error) {
        return res.status(500).json({ message: "Error updating article", error });
    }

});

// Delete an article
router.delete("/delete/:id", fetchUser, async (req, res) => {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    
    const authorObjectId = req.author.id;  // Extract the author ID from the request using auth token
    const articleAuthorId = article.author.toString();  // Extract the author ID from the article

    if (authorObjectId !== articleAuthorId) {
        return res.status(401).json({ error: "Unauthorized access. Please log in as a valid customer to proceed." });
    }

    try {
        await Article.findByIdAndDelete(articleId);
        return res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting article", error });
    }
});

// Get all articles of a user
router.get("/getAll", fetchUser, async (req, res) => {
    const userId = req.author.id;
    try {
        const articles = await Article.find({ author: userId });
        return res.status(200).json({ message: "Articles fetched successfully", articles });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching articles", error });
    }
});

module.exports = router;
