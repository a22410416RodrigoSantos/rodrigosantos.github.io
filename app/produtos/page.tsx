'use client';

import useSWR from 'swr';
import { Product } from '@/models/interfaces';
import { Spinner } from "@/components/ui/spinner";
import ProdutoCard from '@/components/ProdutoCard';

const API_URL = 'https://deisishop.pythonanywhere.com/products';

const fetcher = async (url: string): Promise<Product[]> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-red-600 mb-4">
                        Erro ao carregar os produtos
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {error.message || 'Tente recarregar a página'}
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Spinner className="size-16" />  {/* Tamanho grande; ajusta para size-8, size-12, etc. se preferires */}
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          DEISI Shop - Produtos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </div>
  );
}