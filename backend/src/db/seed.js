import pg from "pg";

const pool = new pg.Pool({
  connectionString:
    "postgresql://neondb_owner:npg_ZcmpQ2dLCi3n@ep-plain-hill-a1tzpi1p-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

async function seed() {
  console.log("Seeding database...");

  // Create mock users
  await pool.query(`
    INSERT INTO "user" (id, email, name, image_url, created_at, updated_at)
    VALUES
      ('user_mock_1', 'alice@example.com', 'Alice Johnson', 'https://api.dicebear.com/7.x/avataaars/png?seed=alice', NOW(), NOW()),
      ('user_mock_2', 'bob@example.com', 'Bob Smith', 'https://api.dicebear.com/7.x/avataaars/png?seed=bob', NOW(), NOW()),
      ('user_mock_3', 'carol@example.com', 'Carol Williams', 'https://api.dicebear.com/7.x/avataaars/png?seed=carol', NOW(), NOW()),
      ('user_mock_4', 'dave@example.com', 'Dave Chen', 'https://api.dicebear.com/7.x/avataaars/png?seed=dave', NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log("✓ Users created");

  // Create mock products
  await pool.query(`
    INSERT INTO products (title, description, image_url, user_id, created_at, updated_at)
    VALUES
      ('Smart Home Hub', 'A centralized smart home controller that connects all your IoT devices. Features voice control, automation routines, and energy monitoring. Compatible with Alexa, Google Home, and HomeKit.', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800', 'user_mock_1', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
      ('Productivity Tracker', 'An all-in-one productivity app that combines task management, time tracking, and habit building. Uses AI to suggest optimal work schedules and break times for maximum focus.', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800', 'user_mock_2', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
      ('EcoBottle Pro', 'Self-cleaning water bottle with built-in UV-C sterilization. Tracks your water intake and reminds you to stay hydrated. Made from 100% recycled ocean plastic.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', 'user_mock_1', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
      ('CodeCanvas IDE', 'A next-generation code editor designed for creative developers. Features real-time collaboration, AI-powered code completion, and beautiful syntax themes with zero configuration needed.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', 'user_mock_3', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
      ('FitPod Earbuds', 'Wireless earbuds designed for athletes. Features heart rate monitoring, workout tracking, and adaptive noise cancellation. IPX7 waterproof with 12-hour battery life.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'user_mock_2', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours'),
      ('AeroDesk Standing Desk', 'Motorized standing desk with memory presets, cable management, and built-in wireless charger. Sleek bamboo top with steel frame. Quiet motor transitions in under 5 seconds.', 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800', 'user_mock_3', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours'),
      ('NeuralNote AI', 'An AI-powered note-taking app that automatically organizes, summarizes, and connects your notes. Supports voice, text, and image input. Syncs across all devices instantly.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'user_mock_4', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours'),
      ('SolarPack Charger', 'Ultra-portable solar-powered charger with integrated battery bank. Charges any USB device in direct sunlight. Foldable design, weighs only 350g. Perfect for hiking and travel.', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 'user_mock_4', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours')
    RETURNING id;
  `);
  console.log("✓ Products created");

  // Get product IDs for comments
  const { rows: products } = await pool.query(
    "SELECT id FROM products ORDER BY created_at ASC",
  );

  // Create mock comments
  if (products.length >= 8) {
    await pool.query(
      `
      INSERT INTO comments (content, product_id, user_id, created_at)
      VALUES
        ('This is exactly what I needed for my home setup! The voice control works flawlessly.', $1, 'user_mock_2', NOW() - INTERVAL '4 days'),
        ('Been using this for a week now. The AI scheduling feature is a game-changer for my workflow.', $2, 'user_mock_1', NOW() - INTERVAL '2 days'),
        ('Love the sustainability angle. Great quality product!', $3, 'user_mock_3', NOW() - INTERVAL '1 day'),
        ('The real-time collab feature is incredible. Way better than VS Code Live Share.', $4, 'user_mock_1', NOW() - INTERVAL '18 hours'),
        ('Amazing battery life! Used them for an entire marathon training session.', $5, 'user_mock_3', NOW() - INTERVAL '10 hours'),
        ('Super quiet motor, love the bamboo finish. Worth every penny.', $6, 'user_mock_1', NOW() - INTERVAL '3 hours'),
        ('Does it integrate with Zigbee devices?', $1, 'user_mock_3', NOW() - INTERVAL '3 days'),
        ('The habit tracking feature helped me build a consistent morning routine.', $2, 'user_mock_3', NOW() - INTERVAL '1 day'),
        ('This AI summarization is insanely accurate. Saves me hours every week.', $7, 'user_mock_1', NOW() - INTERVAL '3 hours'),
        ('Great concept but I wish it had Notion integration.', $7, 'user_mock_2', NOW() - INTERVAL '2 hours'),
        ('Used this on a 3-day camping trip. Never ran out of battery!', $8, 'user_mock_3', NOW() - INTERVAL '1 hour'),
        ('How fast does it charge a phone in cloudy conditions?', $8, 'user_mock_1', NOW() - INTERVAL '30 minutes'),
        ('The bamboo top scratches easily though. Use a desk mat.', $6, 'user_mock_2', NOW() - INTERVAL '2 hours'),
        ('Just ordered one. The reviews convinced me!', $5, 'user_mock_4', NOW() - INTERVAL '5 hours'),
        ('Absolutely love the design. Minimalist and functional.', $3, 'user_mock_4', NOW() - INTERVAL '12 hours')
    `,
      products.map((p) => p.id),
    );
    console.log("✓ Comments created");
  } else if (products.length >= 6) {
    await pool.query(
      `
      INSERT INTO comments (content, product_id, user_id, created_at)
      VALUES
        ('This is exactly what I needed for my home setup! The voice control works flawlessly.', $1, 'user_mock_2', NOW() - INTERVAL '4 days'),
        ('Been using this for a week now. The AI scheduling feature is a game-changer for my workflow.', $2, 'user_mock_1', NOW() - INTERVAL '2 days'),
        ('Love the sustainability angle. Great quality product!', $3, 'user_mock_3', NOW() - INTERVAL '1 day'),
        ('The real-time collab feature is incredible. Way better than VS Code Live Share.', $4, 'user_mock_1', NOW() - INTERVAL '18 hours'),
        ('Amazing battery life! Used them for an entire marathon training session.', $5, 'user_mock_3', NOW() - INTERVAL '10 hours'),
        ('Super quiet motor, love the bamboo finish. Worth every penny.', $6, 'user_mock_1', NOW() - INTERVAL '3 hours'),
        ('Does it integrate with Zigbee devices?', $1, 'user_mock_3', NOW() - INTERVAL '3 days'),
        ('The habit tracking feature helped me build a consistent morning routine.', $2, 'user_mock_3', NOW() - INTERVAL '1 day')
    `,
      products.map((p) => p.id),
    );
    console.log("✓ Comments created");
  }

  console.log("\n🎉 Database seeded successfully!");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
