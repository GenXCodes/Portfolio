const Testimonial = require('../models/Testimonial');

// Helper function to generate avatar from name
function generateAvatar(name) {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Helper function to get random color from portfolio palette
function getRandomColor() {
    const colors = ['#00f5d4', '#f72585', '#7209b7', '#4cc9f0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching testimonials',
            error: error.message
        });
    }
};

// Get testimonial by ID
exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching testimonial',
            error: error.message
        });
    }
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
    try {
        const { name, role, text } = req.body;

        // Validate required fields
        if (!name || !text) {
            return res.status(400).json({
                success: false,
                message: 'Name and testimonial text are required'
            });
        }

        // Prepare testimonial data
        const testimonialData = {
            name,
            role: role || '',
            text,
            avatar: generateAvatar(name),
            color: getRandomColor(),
            is_approved: true, // Auto-approve for now
            is_user_submitted: true
        };

        // Create the testimonial
        const newTestimonial = await Testimonial.create(testimonialData);

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully!',
            data: newTestimonial
        });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating testimonial',
            error: error.message
        });
    }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
    try {
        const { name, role, text, avatar, color, is_approved } = req.body;

        // Check if testimonial exists
        const existingTestimonial = await Testimonial.findById(req.params.id);
        if (!existingTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        // Prepare update data
        const updateData = {
            name: name || existingTestimonial.name,
            role: role !== undefined ? role : existingTestimonial.role,
            text: text || existingTestimonial.text,
            avatar: avatar || existingTestimonial.avatar,
            color: color || existingTestimonial.color,
            is_approved: is_approved !== undefined ? is_approved : existingTestimonial.is_approved
        };

        // Update the testimonial
        const updatedTestimonial = await Testimonial.update(req.params.id, updateData);

        res.json({
            success: true,
            message: 'Testimonial updated successfully',
            data: updatedTestimonial
        });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating testimonial',
            error: error.message
        });
    }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
    try {
        // Check if testimonial exists
        const existingTestimonial = await Testimonial.findById(req.params.id);
        if (!existingTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        // Delete the testimonial
        await Testimonial.delete(req.params.id);

        res.json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting testimonial',
            error: error.message
        });
    }
};

// Get user-submitted testimonials only
exports.getUserTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.getUserSubmitted();
        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching user testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user testimonials',
            error: error.message
        });
    }
};

// Get static testimonials only
exports.getStaticTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.getStatic();
        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching static testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching static testimonials',
            error: error.message
        });
    }
};

// Approve a testimonial
exports.approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.approve(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.json({
            success: true,
            message: 'Testimonial approved successfully',
            data: testimonial
        });
    } catch (error) {
        console.error('Error approving testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while approving testimonial',
            error: error.message
        });
    }
};