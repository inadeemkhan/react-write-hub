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
    req.body.author = req.user.id;
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

module.exports = router;
