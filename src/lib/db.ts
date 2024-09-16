import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database;

export function getDb(): Database.Database {
    if (!db) {
        db = new Database(path.join(process.cwd(), 'artwork.db'));

        // Create the artwork table if it doesn't exist
        db.exec(`
            CREATE TABLE IF NOT EXISTS artworks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                svgCode TEXT NOT NULL,
                likes INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
    return db;
}

// Prepared statements
export const insertArtwork = getDb().prepare('INSERT INTO artworks (svgCode) VALUES (?)');
export const getArtworks = getDb().prepare(`
    SELECT * FROM artworks
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ?
`);
export const getTotalCount = getDb().prepare('SELECT COUNT(*) as count FROM artworks');
export const incrementLikes = getDb().prepare(`
    UPDATE artworks
    SET likes = likes + 1
    WHERE id = ?
`);