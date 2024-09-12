import PoemForm from "./components/PoemForm";
import PoemDisplay from "./components/PoemDisplay";
import SvgDisplay from "./components/SvgDisplay";

export default function Home() {
    return (
        <div className="min-h-screen bg-amber-50 text-gray-800 font-serif">
            <header className="text-center py-8">
                <h1 className="text-4xl font-bold">宋词生成器</h1>
            </header>
            <main className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <PoemForm />
                    <div>
                        <PoemDisplay />
                        <SvgDisplay />
                    </div>
                </div>
            </main>
        </div>
    );
}
