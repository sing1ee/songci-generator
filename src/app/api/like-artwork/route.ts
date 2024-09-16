import { NextRequest, NextResponse } from 'next/server';
import { incrementLikes } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Artwork ID is required' }, { status: 400 });
        }

        const result = incrementLikes.run(id);

        if (result.changes === 0) {
            return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Artwork liked successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error liking artwork:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}