import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { poem } = await req.json();

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: '你是一个SVG生成器，能够将宋词转换为优雅的SVG图片。' },
            { role: 'user', content: `请将以下宋词转换为SVG格式的图片，风格要符合宋朝的浪漫风格：${poem}` }
        ],
    });

    const svgCode = completion.choices[0].message.content;

    return NextResponse.json({ svgCode });
}