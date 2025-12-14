import Link from "next/link";

interface CaracteristicaProps {
  texto: string;
  index: number;
}

export default function Caracteristica({ texto, index }: CaracteristicaProps) {
  return (
    <Link href={`/caracteristicas/${index}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 m-4 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-500">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-100 text-center">
          {texto}
        </p>
      </div>
    </Link>
  );
}