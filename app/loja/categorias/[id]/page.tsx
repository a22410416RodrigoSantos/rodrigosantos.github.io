import shopData from "@/app/data/shop.json";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriaProdutosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { categorias, produtos } = shopData;

  const categoria = categorias.find((c) => c.id === id);

  if (!categoria) {
    return <p className="text-center text-2xl mt-20">Categoria não encontrada</p>;
  }

  const produtosCategoria = produtos.filter((p) => p.categoria === id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/loja/categorias" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Voltar às Categorias
        </Link>
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Produtos - {categoria.nome}
        </h1>
        {produtosCategoria.length === 0 ? (
          <p className="text-center text-xl text-gray-600 dark:text-gray-400">
            Sem produtos nesta categoria ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produtosCategoria.map((produto) => (
              <Link key={produto.id} href={`/loja/produto/${produto.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden cursor-pointer">
                  <Image
                    src={`/shop/${produto.imagem}`}
                    alt={produto.nome}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {produto.nome}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {produto.preco}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}