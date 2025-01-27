import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "宋词雅韵 - AI 驱动的宋词创作平台",
    description: "宋词雅韵是一个AI驱动的宋词创作平台，让每个人都能轻松创作优美的宋词。提供智能写作建议、韵律指导和典故推荐，帮助您创作出意境优美的宋词作品。",
    icons: {
        icon: [
            {
                url: '/favicon.svg',
                type: 'image/svg+xml',
            }
        ]
    },
    openGraph: {
        title: "宋词雅韵 - AI 驱动的宋词创作平台",
        description: "让每个人都能创作优美的宋词，AI辅助创作，传承古典文学之美",
        type: "website",
        locale: "zh_CN",
        images: [
            {
                url: '/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'AI Chat',
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "宋词雅韵 - AI 驱动的宋词创作平台",
        description: "让每个人都能创作优美的宋词，AI辅助创作，传承古典文学之美",
        images: ["/images/og-image.jpg"],
    },
    viewport: "width=device-width, initial-scale=1",
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7e8d8] min-h-screen`}
            >
                <div className="bg-[url('/images/chinese-pattern.png')] bg-repeat min-h-screen">
                    <Navigation />
                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
