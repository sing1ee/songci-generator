import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'artwork.db'));

const getArtworks = db.prepare(`
    SELECT * FROM artworks
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ?
`);

const getTotalCount = db.prepare('SELECT COUNT(*) as count FROM artworks');

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const artworks = getArtworks.all(limit, offset);
        const totalCount = getTotalCount.get().count;

        return NextResponse.json({
            artworks,
            totalCount,
            hasMore: offset + limit < totalCount
        });
    } catch (error) {
        console.error('Error fetching artworks:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}