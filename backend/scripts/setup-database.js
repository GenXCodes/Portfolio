const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    console.log('Setting up portfolio testimonials database...');

    // Connection without database (to create it)
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Chuckn0riz',
        port: process.env.DB_PORT || 3306
    });

    try {
        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'portfolio_db'}`);
        console.log(`Database '${process.env.DB_NAME || 'portfolio_db'}' created or already exists.`);

        // Use the database
        await connection.query(`USE ${process.env.DB_NAME || 'portfolio_db'}`);

        // Create testimonials table
        const createTableSQL = `
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100),
        text TEXT NOT NULL,
        avatar VARCHAR(10),
        color VARCHAR(7),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_approved BOOLEAN DEFAULT TRUE,
        is_user_submitted BOOLEAN DEFAULT TRUE
      )
    `;

        await connection.query(createTableSQL);
        console.log('Table "testimonials" created or already exists.');

        // Insert seed data (static testimonials)
        const seedData = [
            {
                name: 'Maria Santos',
                role: 'CTO, Pixel Labs',
                text: "One of the sharpest developers I've worked with. Delivers clean, scalable code and always goes beyond what's asked.",
                avatar: 'MS',
                color: '#00f5d4',
                is_user_submitted: false
            },
            {
                name: 'Jake Reyes',
                role: 'Product Manager, ByteForge',
                text: "Incredible attention to detail and a natural problem-solver. Our team's velocity doubled after they joined.",
                avatar: 'JR',
                color: '#f72585',
                is_user_submitted: false
            },
            {
                name: 'Sofia Cruz',
                role: 'Lead Designer, Startup Hive',
                text: "Rare talent who bridges design and engineering beautifully. Turns Figma files into pixel-perfect reality.",
                avatar: 'SC',
                color: '#7209b7',
                is_user_submitted: false
            }
        ];

        // Check if we already have data
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM testimonials');

        if (rows[0].count === 0) {
            console.log('Inserting seed data...');
            for (const testimonial of seedData) {
                await connection.query(
                    'INSERT INTO testimonials (name, role, text, avatar, color, is_user_submitted) VALUES (?, ?, ?, ?, ?, ?)',
                    [testimonial.name, testimonial.role, testimonial.text, testimonial.avatar, testimonial.color, testimonial.is_user_submitted]
                );
            }
            console.log('Seed data inserted successfully.');
        } else {
            console.log('Database already contains data. Skipping seed insertion.');
        }

        // Show table structure and data count
        const [structure] = await connection.query('DESCRIBE testimonials');
        console.log('\nTable structure:');
        console.table(structure);

        const [dataCount] = await connection.query('SELECT COUNT(*) as total FROM testimonials');
        console.log(`\nTotal testimonials in database: ${dataCount[0].total}`);

        console.log('\n✅ Database setup completed successfully!');

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

// Run the setup
setupDatabase();