import shopData from "@/app/data/shop.json";
import Link from "next/link";

export default function CategoriasPage() {
  const { categorias } = shopData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Categorias DEISIshop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categorias.map((cat) => (
            <Link key={cat.id} href={`/loja/categorias/${cat.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-12 text-center cursor-pointer">
                <div className="mx-auto mb-6 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  {cat.id === "roupa" && <span className="text-6xl">👕</span>}
                  {cat.id === "acessorios" && <span className="text-6xl">🎒</span>}
                  {cat.id === "canecas" && <span className="text-6xl">☕</span>}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cat.nome}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}