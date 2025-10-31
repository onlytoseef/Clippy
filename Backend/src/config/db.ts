import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");

    // ---------- PENDING USERS TABLE (Before Verification) ----------
    await client.query(`
      CREATE TABLE IF NOT EXISTS pending_users (
        id SERIAL PRIMARY KEY,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('admin', 'user')),
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        plain_password VARCHAR(100) NOT NULL,
        
        name VARCHAR(100) NOT NULL,
        ip_address VARCHAR(45),

        verification_code VARCHAR(100) NOT NULL,
        verification_expiry TIMESTAMP NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------- USERS TABLE ----------
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('admin', 'user')),
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        profile_image TEXT,

        verification_code VARCHAR(100),
        verification_expiry TIMESTAMP,
        is_verified BOOLEAN DEFAULT true,

        ip_address VARCHAR(45),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------- PLANS TABLE ----------
    await client.query(`
  CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,                    -- Plan name (e.g., Student, Beginner)
    price INTEGER NOT NULL,                        -- Monthly price

    -- Resource credits
    script_credits BIGINT DEFAULT 0,            -- Number of characters allowed for scripts
    voice_credits BIGINT DEFAULT 0,             -- Voiceover credits
    image_credits BIGINT DEFAULT 0,             -- Image generation credits
    video_credits BIGINT DEFAULT 0,             -- Video generation credits (new)

    -- Detailed descriptions
    script_description TEXT,                             -- Script-specific notes
    voice_description TEXT,                              -- Voiceover-specific notes
    image_description TEXT,                              -- Image-specific notes
    video_description TEXT,                              -- Video-specific notes

    popular BOOLEAN DEFAULT FALSE,                       -- Only one plan can be popular
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
   `);

    // ---------- SUBSCRIPTIONS TABLE ----------
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        plan_id INT NOT NULL REFERENCES plans(id) ON DELETE RESTRICT,

        status VARCHAR(20) DEFAULT 'active' CHECK (
          status IN ('active', 'expired', 'cancelled', 'pending')
        ),

        start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP NOT NULL,

        used_script_chars BIGINT DEFAULT 0,
        used_voice_credits BIGINT DEFAULT 0,
        used_image_credits BIGINT DEFAULT 0,
        used_video_credits BIGINT DEFAULT 0,

        payment_method VARCHAR(50),
        transaction_id VARCHAR(100) UNIQUE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------- PASSWORD RESET CODES TABLE ----------
    await client.query(`
      CREATE TABLE IF NOT EXISTS password_reset_codes (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) NOT NULL,
        code VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // // ---------- INDEXES ----------
    // await client.query(`
    //   CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
    //   CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);
    //   CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
    // `);

    client.release();
    console.log("✅ Tables created successfully (No default plans inserted)");
  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default pool;
