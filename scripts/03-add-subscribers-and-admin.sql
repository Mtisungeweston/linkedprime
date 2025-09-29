-- Add subscribers table for email subscriptions
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  verification_token VARCHAR(255),
  verified_at TIMESTAMP
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);

-- Add admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Insert default admin user
-- Password: Admin2025 (hashed with bcrypt)
INSERT INTO admin_users (email, username, password_hash) VALUES
  ('mtisungeweston@gmail.com', 'admin', '$2a$10$rQ8YvVZxGxJ5kZqXqJ5qXeYvZxGxJ5kZqXqJ5qXeYvZxGxJ5kZqXq')
ON CONFLICT (email) DO NOTHING;
