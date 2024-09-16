import { NextRequest, NextResponse } from 'next/server';
import { getArtworks, getTotalCount } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const artworks = getArtworks.all(limit, offset);
        const totalCount = getTotalCount.get() as { count: number };
        // console.log(artworks, totalCount)

        return NextResponse.json({
            artworks,
            totalCount,
            hasMore: offset + limit < totalCount.count
        });
    } catch (error) {
        console.error('Error fetching artworks:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}