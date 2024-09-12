"use client";

import { useState } from "react";

export default function SvgDisplay() {
    const [svgCode, setSvgCode] = useState("");
    const [loading, setLoading] = useState(false);

    // TODO: Implement SVG generation and display logic

    const downloadSvg = () => {
        // TODO: Implement SVG download
    };

    const downloadPng = () => {
        // TODO: Implement PNG conversion and download
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">分享图片</h2>
            {loading ? (
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    <p>生成中...</p>
                </div>
            ) : svgCode ? (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: svgCode }} />
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={downloadSvg}
                            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            下载 SVG
                        </button>
                        <button
                            onClick={downloadPng}
                            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                            下载 PNG
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
