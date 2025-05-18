const { body } = require('express-validator');

const articleValidation = [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('content')
      .notEmpty().withMessage('Content is required')
      .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),
    body('tags')
      .optional()
      .isArray().withMessage('Tags must be an array of strings')
      .custom((value) => {
        if (!value.every(tag => typeof tag === 'string')) {
          throw new Error('All tags must be strings');
        }
        return true;
      }),
  ];
module.exports = { articleValidation };