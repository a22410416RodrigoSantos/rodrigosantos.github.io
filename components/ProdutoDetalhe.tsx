import Image from "next/image";
import { Product } from "@/models/interfaces";
import { Badge } from "@/components/ui/badge";

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
        <Image
          src={`https://deisishop.pythonanywhere.com${produto.image}`}
          alt={produto.title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {produto.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {produto.description}
          </p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {Number(produto.price).toFixed(2)}€
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="capitalize text-lg">
            {produto.category}
          </Badge>
          <Badge variant="outline" className="text-lg">
            Avaliação: {produto.rating.rate} ⭐ ({produto.rating.count} votos)
          </Badge>
        </div>
      </div>
    </div>
  );
}