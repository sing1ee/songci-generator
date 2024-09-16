"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    宋词生成器
                </Link>
                <div className="space-x-4">
                    <Link
                        href="/"
                        className={`hover:text-gray-300 ${
                            pathname === "/" ? "underline" : ""
                        }`}
                    >
                        首页
                    </Link>
                    <Link
                        href="/artwork-wall"
                        className={`hover:text-gray-300 ${
                            pathname === "/artwork-wall" ? "underline" : ""
                        }`}
                    >
                        作品墙
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
