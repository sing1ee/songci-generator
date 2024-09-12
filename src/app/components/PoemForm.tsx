"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const CIPAI_OPTIONS = [
    "水调歌头",
    "念奴娇",
    "满江红",
    "蝶恋花",
    "西江月",
    "卜算子",
];

const PoemForm = () => {
    const [cipai, setCipai] = useState(CIPAI_OPTIONS[0]);
    const [prompt, setPrompt] = useState("");
    const [poem, setPoem] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/generate-poem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cipai, prompt }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result += decoder.decode(value, { stream: true });
            setPoem(result);
        }
    };

    const handleGenerateSvg = () => {
        // TODO: Implement SVG generation
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md mb-8"
            >
                <div className="mb-4">
                    <label htmlFor="cipai" className="block mb-2 font-bold">
                        词牌
                    </label>
                    <select
                        id="cipai"
                        value={cipai}
                        onChange={(e) => setCipai(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        {CIPAI_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="prompt" className="block mb-2 font-bold">
                        创作要求
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={4}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    生成宋词
                </button>
            </form>

            {poem && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">生成的宋词</h2>
                    <ReactMarkdown className="whitespace-pre-wrap">
                        {poem}
                    </ReactMarkdown>
                    <button
                        onClick={handleGenerateSvg}
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        生成分享图片
                    </button>
                </div>
            )}
        </div>
    );
};

export default PoemForm;
