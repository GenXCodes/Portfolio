// API Service for Testimonials
// Base URL for API - defaults to localhost:3000 for development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for API requests
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Testimonials API
export const testimonialsAPI = {
    // Get all testimonials
    getAll: async () => {
        return await apiRequest('/testimonials');
    },

    // Get testimonial by ID
    getById: async (id) => {
        return await apiRequest(`/testimonials/${id}`);
    },

    // Create a new testimonial
    create: async (testimonialData) => {
        return await apiRequest('/testimonials', {
            method: 'POST',
            body: JSON.stringify(testimonialData),
        });
    },

    // Update a testimonial
    update: async (id, testimonialData) => {
        return await apiRequest(`/testimonials/${id}`, {
            method: 'PUT',
            body: JSON.stringify(testimonialData),
        });
    },

    // Delete a testimonial
    delete: async (id) => {
        return await apiRequest(`/testimonials/${id}`, {
            method: 'DELETE',
        });
    },

    // Get user-submitted testimonials only
    getUserTestimonials: async () => {
        return await apiRequest('/testimonials/user');
    },

    // Get static testimonials only
    getStaticTestimonials: async () => {
        return await apiRequest('/testimonials/static');
    },

    // Approve a testimonial
    approve: async (id) => {
        return await apiRequest(`/testimonials/${id}/approve`, {
            method: 'PATCH',
        });
    },
};

// Health check
export const healthAPI = {
    check: async () => {
        try {
            const response = await fetch(`${API_BASE.replace('/api', '')}/health`);
            return await response.json();
        } catch (error) {
            return { status: 'ERROR', message: 'Backend not reachable' };
        }
    },
};

// Helper functions for testimonial data
export const testimonialHelpers = {
    // Generate avatar from name
    generateAvatar: (name) => {
        if (!name) return '??';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    },

    // Get random color from portfolio palette
    getRandomColor: () => {
        const colors = ['#00f5d4', '#f72585', '#7209b7', '#4cc9f0'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Format testimonial for submission
    formatForSubmission: (name, role, text) => {
        return {
            name: name.trim(),
            role: role?.trim() || '',
            text: text.trim(),
        };
    },

    // Validate testimonial data
    validate: (name, text) => {
        const errors = [];

        if (!name || name.trim().length < 2) {
            errors.push('Name must be at least 2 characters');
        }

        if (!text || text.trim().length < 10) {
            errors.push('Testimonial text must be at least 10 characters');
        }

        if (text && text.trim().length > 500) {
            errors.push('Testimonial text must be less than 500 characters');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },
};

// Export default API instance
export default {
    testimonials: testimonialsAPI,
    health: healthAPI,
    helpers: testimonialHelpers,
};