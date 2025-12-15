import { Product } from '@/models/interfaces';
import ProdutoDetalhe from '@/components/ProdutoDetalhe';
import Link from 'next/link';

const API_URL = 'https://deisishop.pythonanywhere.com/products';

async function fetchProdutos(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 }, // Revalida a cada 60 segundos (opcional)
  });

  if (!response.ok) {
    throw new Error('Erro ao carregar a lista de produtos');
  }

  return response.json();
}

export default async function ProdutoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produtoId = Number(id);

  let produtos: Product[];
  try {
    produtos = await fetchProdutos();
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-2xl text-red-600">
          Erro ao carregar os produtos. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const produto = produtos.find((p) => p.id === produtoId);

  if (!produto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          Produto não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/produtos" className="inline-block mb-8 text-blue-600 hover:underline font-semibold">
          ← Voltar à lista de produtos
        </Link>
        <ProdutoDetalhe produto={produto} />
      </div>
    </div>
  );
}