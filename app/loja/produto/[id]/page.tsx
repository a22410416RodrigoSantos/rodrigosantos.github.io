import shopData from "@/app/data/shop.json";
import Image from "next/image";
import Link from "next/link";

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produtoId = Number(id);
  const { produtos } = shopData;

  const produto = produtos.find((p) => p.id === produtoId);

  if (!produto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-700 dark:text-gray-300">Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/loja" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Voltar à Loja
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 grid md:grid-cols-2 gap-10">
          <Image
            src={`/shop/${produto.imagem}`}
            alt={produto.nome}
            width={600}
            height={600}
            className="rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {produto.nome}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              {produto.descricao}
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-10">
              {produto.preco}
            </p>
            <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
              Adicionar ao Carrinho (simulação)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}