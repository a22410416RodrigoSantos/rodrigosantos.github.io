'use client';

import useSWR from 'swr';
import { Product } from '@/models/interfaces';
import ProdutoCard from '@/components/ProdutoCard';
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';

const API_URL = 'https://deisishop.pythonanywhere.com/products';

const fetcher = async (url: string): Promise<Product[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export default function ProdutosPage() {
    const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

    const [search, setSearch] = useState<string>("");
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');
    const [displayData, setDisplayData] = useState<Product[]>([]);

    const [isStudent, setIsStudent] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<string>("");
    const [isBuying, setIsBuying] = useState<boolean>(false);
    const [buyResponse, setBuyResponse] = useState<{ success: boolean; message: string } | null>(null);
    const { items: cartItems, clearCart } = useCart();

    const handleBuy = async () => {
        setIsBuying(true);
        setBuyResponse(null);

        try {
            const response = await fetch("https://deisishop.pythonanywhere.com/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: cartItems.map((product) => product.id),
                    name: "",
                    student: isStudent,
                    coupon: coupon.trim(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro na compra");
            }

            setBuyResponse({
                success: true,
                message: result.message || "Compra realizada com sucesso!",
            });

            clearCart();
        } catch (error) {
            setBuyResponse({
                success: false,
                message: error instanceof Error ? error.message : "Erro ao processar a compra",
            });
        } finally {
            setIsBuying(false);
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    useEffect(() => {
        if (!data) {
            setDisplayData([]);
            return;
        }

        let filtered = data;

        if (search.trim() !== "") {
            const lowerSearch = search.toLowerCase();
            filtered = filtered.filter((produto) =>
                produto.title.toLowerCase().includes(lowerSearch)
            );
        }

        const sorted = [...filtered].sort((a, b) => {
            if (sortOption === 'name-asc') return a.title.localeCompare(b.title);
            if (sortOption === 'name-desc') return b.title.localeCompare(a.title);
            if (sortOption === 'price-asc') return Number(a.price) - Number(b.price);
            if (sortOption === 'price-desc') return Number(b.price) - Number(a.price);
            return 0;
        });

        setDisplayData(sorted);
    }, [data, search, sortOption]);

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

                {/* Controles: pesquisa e ordenação */}
                <div className="flex flex-col sm:flex-row gap-6 mb-12 max-w-3xl mx-auto">
                    <Input
                        type="text"
                        placeholder="Pesquisar produtos pelo nome..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name-asc">Nome (A → Z)</option>
                        <option value="name-desc">Nome (Z → A)</option>
                        <option value="price-asc">Preço (menor → maior)</option>
                        <option value="price-desc">Preço (maior → menor)</option>
                    </select>
                </div>

                {/* Lista de produtos disponíveis */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Produtos disponíveis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                    {isLoading ? (
                        <p className="col-span-full text-center text-xl">A carregar produtos...</p>
                    ) : displayData.length === 0 ? (
                        <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-400">
                            Nenhum produto encontrado.
                        </p>
                    ) : (
                        displayData.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto} />
                        ))
                    )}
                </div>

                {/* Secção do Carrinho */}
                {cartItems.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            Carrinho de Compras ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {cartItems.map((produto) => (
                                <ProdutoCard key={produto.id} produto={produto} inCart={true} />
                            ))}
                        </div>

                        {/* Formulário de compra */}
                        <div className="border-t pt-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="student"
                                    checked={isStudent}
                                    onChange={(e) => setIsStudent(e.target.checked)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="student" className="text-lg text-gray-700 dark:text-gray-300">
                                    Sou estudante DEISI
                                </label>
                            </div>

                            <div>
                                <label htmlFor="coupon" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Cupão de desconto
                                </label>
                                <Input
                                    id="coupon"
                                    type="text"
                                    placeholder="Insira o código do cupão"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    Total: {totalPrice.toFixed(2)}€
                                </p>

                                <Button
                                    size="lg"
                                    onClick={handleBuy}
                                    disabled={isBuying}
                                    className="px-8 py-6 text-xl"
                                >
                                    {isBuying ? "A processar compra..." : "Comprar"}
                                </Button>
                            </div>

                            {/* Resposta da compra */}
                            {buyResponse && (
                                <div className={`mt-8 p-6 rounded-xl text-center text-lg font-semibold ${buyResponse.success
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    }`}>
                                    {buyResponse.message}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}