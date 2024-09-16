"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";

const CIPAI_OPTIONS = [
    "江城子",
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
    const [author, setAuthor] = useState("");
    const [poem, setPoem] = useState("");
    const [result, setResult] = useState("");
    const [svgCode, setSvgCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSvgCode("");

        const response = await fetch("/api/generate-poem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cipai, author, prompt }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result += decoder.decode(value, { stream: true });
            setPoem(result);
            setResult(result);
        }
    };

    const handleGenerateSvg = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/generate-svg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ result }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate SVG");
            }

            const svgData = await response.json();
            const svgText = svgData.svgCode;
            const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/;
            const match = svgText.match(svgRegex);

            if (match) {
                const extractedSvg = match[0]; // 提取的完整 <svg> 标签及其内容
                setSvgCode(extractedSvg);
            } else {
                setSvgCode(svgText);
            }
        } catch (error) {
            console.error("Error generating SVG:", error);
            // Handle error (e.g., show error message to user)
        } finally {
            setLoading(false);
        }
    };

    const uploadArtwork = async () => {
        try {
            const response = await fetch("/api/upload-artwork", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ svgCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload artwork");
            }

            const data = await response.json();
            console.log("Artwork uploaded successfully:", data);
            // Optionally, you can update the UI or show a success message
        } catch (error) {
            console.error("Error uploading artwork:", error);
            // Optionally, you can show an error message to the user
        }
    };

    const downloadSvg = () => {
        const blob = new Blob([svgCode], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "poem.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPng = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 创建一个 Image 对象
        const img = new Image();

        // 将 SVG 转换为 data URL
        const svgBlob = new Blob([svgCode], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        img.src = url;
        img.onload = () => {
            // 设置 canvas 尺寸
            canvas.width = img.width;
            canvas.height = img.height;

            // 在 canvas 上绘制图像
            ctx?.drawImage(img, 0, 0);

            // 将 canvas 转换为 PNG 并下载
            canvas.toBlob((blob) => {
                saveAs(blob!, "peom.png");
            });

            // 清理
            URL.revokeObjectURL(url);
        };
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
                    <label htmlFor="author" className="block mb-2 font-bold">
                        创作者
                    </label>
                    <input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
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

            {(loading || svgCode) && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">分享图片</h2>
                    {loading ? (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                            <p>生成中...</p>
                        </div>
                    ) : svgCode ? (
                        <div>
                            <div
                                dangerouslySetInnerHTML={{ __html: svgCode }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            />
                            <div className="mt-4 flex justify-center space-x-4">
                                <button
                                    onClick={downloadSvg}
                                    className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                                >
                                    下载 SVG
                                </button>
                                <button
                                    onClick={downloadPng}
                                    className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
                                >
                                    下载 PNG
                                </button>
                                <button
                                    onClick={uploadArtwork}
                                    className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                                >
                                    上传
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default PoemForm;
