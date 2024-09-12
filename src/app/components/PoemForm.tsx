"use client";

import { useState } from "react";

const CIPAI_OPTIONS = ["水调歌头", "念奴娇", "满江红", "蝶恋花"];

export default function PoemForm() {
    const [cipai, setCipai] = useState(CIPAI_OPTIONS[0]);
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement API call to generate poem
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
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
    );
}
