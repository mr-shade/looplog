import { readFileSync } from 'fs';
import { join } from 'path';
import { D1Database } from '@cloudflare/workers-types';

// This script is used to migrate the database schema
// It can be run with:
// npx wrangler d1 execute DB --local --file=./schema.sql

// For remote migration:
// npx wrangler d1 execute DB --file=./schema.sql

async function migrate(db: D1Database) {
  try {
    // Read the schema file
    const schemaPath = join(process.cwd(), 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Execute the schema
    const result = await db.exec(schema);
    console.log('Migration successful:', result);
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

export { migrate };
