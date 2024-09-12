import PoemForm from "./components/PoemForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-amber-50 text-gray-800 font-serif">
            <header className="text-center py-8">
                <h1 className="text-4xl font-bold">宋词生成器</h1>
            </header>
            <main className="container mx-auto px-4">
                <PoemForm />
            </main>
        </div>
    );
}
