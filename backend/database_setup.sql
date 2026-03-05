-- Portfolio Testimonials Database Setup
-- MySQL Workbench Script
-- User: root
-- Password: Chuckn0riz

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS testimonials;

-- Create testimonials table
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  text TEXT NOT NULL,
  avatar VARCHAR(10),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT TRUE,
  is_user_submitted BOOLEAN DEFAULT TRUE
);

-- Insert existing static testimonials as seed data
INSERT INTO testimonials (name, role, text, avatar, color, is_user_submitted) VALUES
('Maria Santos', 'CTO, Pixel Labs', 'One of the sharpest developers I''ve worked with. Delivers clean, scalable code and always goes beyond what''s asked.', 'MS', '#00f5d4', FALSE),
('Jake Reyes', 'Product Manager, ByteForge', 'Incredible attention to detail and a natural problem-solver. Our team''s velocity doubled after they joined.', 'JR', '#f72585', FALSE),
('Sofia Cruz', 'Lead Designer, Startup Hive', 'Rare talent who bridges design and engineering beautifully. Turns Figma files into pixel-perfect reality.', 'SC', '#7209b7', FALSE);

-- Insert a sample user-submitted testimonial
INSERT INTO testimonials (name, role, text, avatar, color, is_user_submitted) VALUES
('Alex Johnson', 'Freelance Developer', 'Amazing portfolio design! The glassmorphism effect is stunning and the code quality is top-notch.', 'AJ', '#4cc9f0', TRUE);

-- Verify the data
SELECT * FROM testimonials;

-- Show table structure
DESCRIBE testimonials;