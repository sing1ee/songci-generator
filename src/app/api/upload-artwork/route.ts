import { NextRequest, NextResponse } from 'next/server';
import { insertArtwork } from '@/lib/db';

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