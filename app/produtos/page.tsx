'use client';

import useSWR from 'swr';
import { Product } from '@/models/interfaces';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProdutoCard from "@/components/ProdutoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";  // Componente Input do Shadcn
import { useState, useEffect } from "react";

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

    // Estado para o termo de pesquisa
    const [search, setSearch] = useState<string>("");

    // Estado para os produtos filtrados
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    // Atualiza filteredData sempre que search ou data mudarem
    useEffect(() => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        if (search.trim() === "") {
            setFilteredData(data);
        } else {
            const lowerSearch = search.toLowerCase();
            const filtered = data.filter((produto) =>
                produto.title.toLowerCase().includes(lowerSearch)
            );
            setFilteredData(filtered);
        }
    }, [search, data]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <p className="text-2xl text-red-600">Erro ao carregar produtos: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    DEISI Shop - Produtos
                </h1>

                {/* Input de pesquisa */}
                <div className="max-w-md mx-auto mb-12">
                    <Input
                        type="text"
                        placeholder="Pesquisar produtos pelo nome..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Resultados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="h-64 w-full" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-1/2" />
                                </CardContent>
                            </Card>
                        ))
                        : filteredData.length === 0
                            ? <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-400">
                                Nenhum produto encontrado.
                            </p>
                            : filteredData.map((produto) => (
                                <ProdutoCard key={produto.id} produto={produto} />
                            ))}
                </div>
            </div>
        </div>
    );
}