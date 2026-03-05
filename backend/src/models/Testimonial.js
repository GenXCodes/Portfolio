const { query } = require('../config/database');

class Testimonial {
    // Get all testimonials (with optional filtering)
    static async findAll(approvedOnly = true) {
        let sql = 'SELECT * FROM testimonials';
        const params = [];

        if (approvedOnly) {
            sql += ' WHERE is_approved = ?';
            params.push(true);
        }

        sql += ' ORDER BY created_at DESC';

        return await query(sql, params);
    }

    // Get testimonial by ID
    static async findById(id) {
        const sql = 'SELECT * FROM testimonials WHERE id = ?';
        const results = await query(sql, [id]);
        return results[0] || null;
    }

    // Create a new testimonial
    static async create(testimonialData) {
        const { name, role, text, avatar, color, is_approved = true, is_user_submitted = true } = testimonialData;

        const sql = `
      INSERT INTO testimonials 
      (name, role, text, avatar, color, is_approved, is_user_submitted) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        const result = await query(sql, [name, role, text, avatar, color, is_approved, is_user_submitted]);

        // Return the newly created testimonial
        return await this.findById(result.insertId);
    }

    // Update a testimonial
    static async update(id, testimonialData) {
        const { name, role, text, avatar, color, is_approved } = testimonialData;

        const sql = `
      UPDATE testimonials 
      SET name = ?, role = ?, text = ?, avatar = ?, color = ?, is_approved = ?
      WHERE id = ?
    `;

        await query(sql, [name, role, text, avatar, color, is_approved, id]);
        return await this.findById(id);
    }

    // Delete a testimonial
    static async delete(id) {
        const sql = 'DELETE FROM testimonials WHERE id = ?';
        await query(sql, [id]);
        return true;
    }

    // Get user-submitted testimonials
    static async getUserSubmitted() {
        const sql = 'SELECT * FROM testimonials WHERE is_user_submitted = ? ORDER BY created_at DESC';
        return await query(sql, [true]);
    }

    // Get static testimonials
    static async getStatic() {
        const sql = 'SELECT * FROM testimonials WHERE is_user_submitted = ? ORDER BY created_at DESC';
        return await query(sql, [false]);
    }

    // Approve a testimonial
    static async approve(id) {
        const sql = 'UPDATE testimonials SET is_approved = ? WHERE id = ?';
        await query(sql, [true, id]);
        return await this.findById(id);
    }

    // Count testimonials
    static async count(whereClause = '') {
        let sql = 'SELECT COUNT(*) as count FROM testimonials';
        if (whereClause) {
            sql += ` WHERE ${whereClause}`;
        }
        const results = await query(sql);
        return results[0].count;
    }
}

module.exports = Testimonial;