import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL: process.env.LLM_BASE_URL
});

const dmodel = process.env.LLM_MODEL

function checkEnvironmentVariables() {
    if (!process.env.LLM_API_KEY) {
        throw new Error('LLM_API_KEY is not set');
    }
    if (!process.env.LLM_BASE_URL) {
        throw new Error('LLM_BASE_URL is not set');
    }
    if (!dmodel) {
        throw new Error('LLM_MODEL is not set');
    }
}

// Call the function to check environment variables
checkEnvironmentVariables();

export async function generatePoem(system: string, prompt: string) {
    const stream = await openai.chat.completions.create({
        model: dmodel,
        messages: [
            { role: 'user', content: `${prompt}` }
        ],
        stream: true,
    });

    return stream;
}

export async function generateSvg(result: string) {
    const completion = await openai.chat.completions.create({
        model: dmodel,
        messages: [
            { role: 'system', content: '你是一个SVG生成器，能够将宋词转换为优雅的SVG图片。' },
            {
                role: 'user', content: `给定一首词，先理解词的意境，提炼出设计原则，创建一个符合词意境的 svg，注意 svg包括词的全部文字，只输出 svg 源码。

svg 设计规则：
设置一个画布,宽度为 400 像素,高度为 600 像素,边距为 20 像素,内容占满 100% 的宽度和高度。
使用毛笔楷体作为标题字体。
启用自动缩放功能,设置最小字号为 16。
配色风格采用蒙德里安风格的设计感背景色,主要文字使用汇文明朝体,颜色为粉笔灰。
卡片元素包括以下内容:
1. 居中显示的词名作为标题
2. 分隔线
3. 右对齐的作者名
4. 词的内容
5. 一幅意境深远的线条图,风格抽象、古典
6. 颜色设置符合意境，根据词的内容，提取主要色调
这个设计方案旨在创造一个优雅、富有艺术感的词牌展示效果。

词：
${result}
结果(只返回 svg 代码)：` }
        ],
        temperature: 0.9
    });

    return completion.choices[0].message.content;
}