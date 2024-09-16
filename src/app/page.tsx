import PoemForm from "./components/PoemForm";

export default function Home() {
    return (
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center text-[#8b4513] font-serif">
                宋词雅韵
            </h1>
            <div className="border-4 border-[#8b4513] p-6 rounded-lg">
                <p className="text-lg mb-6 text-[#5c3317] italic">
                    &quot;词至宋代，渐成流行，且愈盛愈工。&quot; ——
                    王国维《人间词话》
                </p>
                <PoemForm />
            </div>
        </div>
    );
}
