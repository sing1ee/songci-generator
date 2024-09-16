"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { svgToPng } from "@/utils/svgToPng";
import InfiniteScroll from "react-infinite-scroll-component";

interface Artwork {
    id: number;
    svgCode: string;
    likes: number;
    createdAt: string;
}

const ArtworkWall: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchArtworks = async () => {
        try {
            const response = await fetch(
                `/api/get-artworks?limit=10&offset=${offset}`
            );
            if (response.ok) {
                const data = await response.json();
                setArtworks((prevArtworks) => [
                    ...prevArtworks,
                    ...data.artworks,
                ]);
                setOffset((prevOffset) => prevOffset + 10);
                setHasMore(data.hasMore);
            } else {
                throw new Error("Failed to fetch artworks");
            }
        } catch (error) {
            console.error("Error fetching artworks:", error);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, []);

    const handleDownload = async (svgCode: string, format: "svg" | "png") => {
        try {
            let dataUrl: string;
            let filename: string;

            if (format === "svg") {
                dataUrl =
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(svgCode);
                filename = "artwork.svg";
            } else {
                dataUrl = await svgToPng(svgCode, 800, 600);
                filename = "artwork.png";
            }

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">作品墙</h1>
            <InfiniteScroll
                dataLength={artworks.length}
                next={fetchArtworks}
                hasMore={hasMore}
                loader={<h4>加载中...</h4>}
                endMessage={<p className="text-center mt-4">已加载全部作品</p>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="bg-white p-4 rounded-lg shadow-md relative"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: artwork.svgCode,
                                }}
                            />
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm text-gray-500">
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
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Download SVG"
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
                                        className="text-green-500 hover:text-green-700"
                                        title="Download PNG"
                                    >
                                        <FaDownload className="inline" />
                                    </button>
                                    <button
                                        onClick={() => handleLike(artwork.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Like"
                                    >
                                        <FaHeart className="inline" />{" "}
                                        {artwork.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ArtworkWall;
