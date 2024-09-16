import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'artwork.db'));

// Create the artwork table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS artworks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    svgCode TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertArtwork = db.prepare('INSERT INTO artworks (svgCode) VALUES (?)');

export async function POST(request: NextRequest) {
    try {
        const { svgCode } = await request.json();

        if (!svgCode) {
            return NextResponse.json({ error: 'SVG code is required' }, { status: 400 });
        }

        const result = insertArtwork.run(svgCode);

        return NextResponse.json({ message: 'Artwork uploaded successfully', id: result.lastInsertRowid }, { status: 201 });
    } catch (error) {
        console.error('Error uploading artwork:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}