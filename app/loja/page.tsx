import shopData from "@/app/data/shop.json";
import Link from "next/link";

export default function LojaPage() {
  const { produtos } = shopData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            DEISIshop - Todos os Produtos
          </h1>
          <Link
            href="/loja/categorias"
            className="mt-4 sm:mt-0 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Ver Categorias
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <Link key={produto.id} href={`/loja/produto/${produto.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 text-center cursor-pointer">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-6xl text-gray-400">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {produto.nome}
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {produto.preco}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}