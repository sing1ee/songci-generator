"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { saveAs } from "file-saver";

interface Artwork {
    id: number;
    svgCode: string;
    likes: number;
    createdAt: string;
}

const ArtworkWall: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchArtworks = async (page: number) => {
        try {
            const response = await fetch(
                `/api/get-artworks?limit=9&offset=${(page - 1) * 9}`
            );
            if (response.ok) {
                const data = await response.json();
                setArtworks(data.artworks);
                setTotalPages(Math.ceil(data.totalCount / 9));
            } else {
                throw new Error("Failed to fetch artworks");
            }
        } catch (error) {
            console.error("Error fetching artworks:", error);
        }
    };

    useEffect(() => {
        fetchArtworks(currentPage);
    }, [currentPage]);

    const handleDownload = async (svgCode: string, format: "svg" | "png") => {
        try {
            let dataUrl: string;
            let filename: string;

            if (format === "svg") {
                dataUrl =
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(svgCode);
                filename = "artwork.svg";
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
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
            }
        } catch (error) {
            console.error("Error downloading artwork:", error);
        }
    };

    const handleLike = async (id: number) => {
        try {
            const response = await fetch(`/api/like-artwork`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                setArtworks((prevArtworks) =>
                    prevArtworks.map((artwork) =>
                        artwork.id === id
                            ? { ...artwork, likes: artwork.likes + 1 }
                            : artwork
                    )
                );
            }
        } catch (error) {
            console.error("Error liking artwork:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-gray-800 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-[#8b4513] font-serif">
                    词画长廊
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="bg-[#fff8e7] border-2 border-[#8b4513] rounded-lg shadow-lg overflow-hidden flex flex-col"
                        >
                            <div
                                className="artwork-container relative flex-grow"
                                style={{ paddingBottom: "150%" }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: artwork.svgCode,
                                    }}
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                />
                            </div>
                            <div className="p-4 bg-[#8b4513] text-[#fff8e7]">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        {new Date(
                                            artwork.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() =>
                                                handleDownload(
                                                    artwork.svgCode,
                                                    "svg"
                                                )
                                            }
                                            className="hover:text-yellow-300 transition-colors"
                                            title="下载 SVG"
                                        >
                                            <FaDownload className="inline" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDownload(
                                                    artwork.svgCode,
                                                    "png"
                                                )
                                            }
                                            className="hover:text-yellow-300 transition-colors"
                                            title="下载 PNG"
                                        >
                                            <FaDownload className="inline" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleLike(artwork.id)
                                            }
                                            className="hover:text-yellow-300 transition-colors"
                                            title="点赞"
                                        >
                                            <FaHeart className="inline mr-1" />
                                            <span>{artwork.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-[#8b4513] text-white rounded disabled:bg-gray-400"
                    >
                        上一页
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-[#8b4513] text-white rounded disabled:bg-gray-400"
                    >
                        下一页
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkWall;
