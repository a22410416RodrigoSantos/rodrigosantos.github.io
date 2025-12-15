import Image from "next/image";
import { Product } from "@/models/interfaces";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProdutoCardProps {
  produto: Product;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700">
        <Image
          src={`https://deisishop.pythonanywhere.com${produto.image}`}
          alt={produto.title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
          {produto.title}
        </h3>

        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          {Number(produto.price).toFixed(2)}€
        </p>

        <div className="mt-auto">
          <Link href={`/produtos/${produto.id}`}>
            <Button variant="outline" className="w-full">
              +info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}