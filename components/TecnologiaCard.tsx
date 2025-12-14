import Image from "next/image";
import Link from "next/link";

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologias/${index}`}>
      <div className="w-52 h-60 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 m-4 flex flex-col items-center justify-center cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-500">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 mb-4">
          <Image
            src={`/tecnologias/${image}`}
            alt={title}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
}