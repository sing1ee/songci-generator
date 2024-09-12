import { NextResponse } from 'next/server';
import { generatePoem } from '@/lib/openai';

export async function POST(req: Request) {
    const { cipai, prompt } = await req.json();

    const stream = await generatePoem(cipai, prompt);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                const text = chunk.choices[0]?.delta?.content || '';
                controller.enqueue(encoder.encode(text));
            }
            controller.close();
        },
    });

    return new NextResponse(readable, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}