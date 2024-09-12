import { NextResponse } from 'next/server';
import { generateSvg } from '@/lib/openai';

export async function POST(req: Request) {
    const { result } = await req.json();

    const svgCode = await generateSvg(result);

    return NextResponse.json({ svgCode });
}