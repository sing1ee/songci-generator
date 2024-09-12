import { NextResponse } from 'next/server';
import { generateSvg } from '@/lib/openai';

export async function POST(req: Request) {
    const { poem } = await req.json();

    const svgCode = await generateSvg(poem);

    return NextResponse.json({ svgCode });
}