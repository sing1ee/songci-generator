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
    title: "宋词雅韵",
    description: "每一个人都是宋词大师",
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
