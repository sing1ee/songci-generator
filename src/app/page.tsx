import PoemForm from "./components/PoemForm";

export default function Home() {
    return (
        <div className="bg-amber-50 text-gray-800 font-serif">
            <h1 className="text-3xl font-bold mb-6">宋词创作</h1>
            <PoemForm />
        </div>
    );
}
