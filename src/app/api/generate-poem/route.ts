import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { cipai, prompt } = await req.json();

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: '你是一个宋词生成器。' },
            { role: 'user', content: `请以"${cipai}"的格式创作一首宋词，内容要求：${prompt}` }
        ],
        stream: true,
    });

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