const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', testimonialController.getAllTestimonials);

// @route   GET /api/testimonials/user
// @desc    Get user-submitted testimonials only
// @access  Public
router.get('/user', testimonialController.getUserTestimonials);

// @route   GET /api/testimonials/static
// @desc    Get static testimonials only
// @access  Public
router.get('/static', testimonialController.getStaticTestimonials);

// @route   GET /api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get('/:id', testimonialController.getTestimonialById);

// @route   POST /api/testimonials
// @desc    Create a new testimonial
// @access  Public
router.post('/', testimonialController.createTestimonial);

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
// @access  Public (should be protected in production)
router.put('/:id', testimonialController.updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
// @access  Public (should be protected in production)
router.delete('/:id', testimonialController.deleteTestimonial);

// @route   PATCH /api/testimonials/:id/approve
// @desc    Approve a testimonial
// @access  Public (should be protected in production)
router.patch('/:id/approve', testimonialController.approveTestimonial);

module.exports = router;