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
            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold text-[#8b4513] mb-4">友情链接</h2>
                <div className="flex justify-center items-center gap-6">
                    <a 
                        href="https://www.deepseek.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-md border-2 border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white transition-colors duration-300"
                    >
                        Deepseek
                    </a>
                    <a 
                        href="https://deepbolt.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-md border-2 border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white transition-colors duration-300"
                    >
                        Deepbolt
                    </a>
                </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
                Powered by{" "}
                <a 
                    href="https://www.deepseek.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b4513] hover:underline"
                >
                    Deepseek R1
                </a>
            </p>
        </div>
    );
}
