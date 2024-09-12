import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL: process.env.LLM_BASE_URL
});

const model = process.env.LLM_MODEL

function checkEnvironmentVariables() {
    if (!process.env.LLM_API_KEY) {
        throw new Error('LLM_API_KEY is not set');
    }
    if (!process.env.LLM_BASE_URL) {
        throw new Error('LLM_BASE_URL is not set');
    }
    if (!model) {
        throw new Error('LLM_MODEL is not set');
    }
}

// Call the function to check environment variables
checkEnvironmentVariables();

export async function generatePoem(cipai: string, prompt: string) {
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: '你是一个宋词生成器。' },
            { role: 'user', content: `请以"${cipai}"的格式创作一首宋词，内容要求：${prompt}` }
        ],
        stream: true,
    });

    return stream;
}

export async function generateSvg(poem: string) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: '你是一个SVG生成器，能够将宋词转换为优雅的SVG图片。' },
            { role: 'user', content: `请将以下宋词转换为SVG格式的图片，风格要符合宋朝的浪漫风格：${poem}` }
        ],
    });

    return completion.choices[0].message.content;
}