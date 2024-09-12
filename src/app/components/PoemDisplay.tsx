"use client";

import { useState } from "react";

export default function PoemDisplay() {
    const [poem, setPoem] = useState("");

    // TODO: Implement poem generation and display logic

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">生成的宋词</h2>
            <pre className="whitespace-pre-wrap">{poem}</pre>
            {poem && (
                <button
                    onClick={() => {
                        /* TODO: Implement SVG generation */
                    }}
                    className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    生成分享图片
                </button>
            )}
        </div>
    );
}
