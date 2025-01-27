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
    title: {
        default: 'AI Chat Assistant',
        template: '%s | AI Chat Assistant'
    },
    description: 'An intelligent chat assistant powered by advanced language models',
    icons: {
        icon: '/favicon.svg'
    },
    openGraph: {
        title: 'AI Chat Assistant',
        description: 'An intelligent chat assistant powered by advanced language models',
        images: [
            {
                url: '/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'AI Chat Assistant'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Chat Assistant',
        description: 'An intelligent chat assistant powered by advanced language models',
        images: ['/og-image.svg']
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
