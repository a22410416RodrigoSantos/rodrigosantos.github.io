import Image from "next/image";

interface TecnologiaDetailsProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 max-w-lg mx-auto mt-12 border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-8">
          <Image
            src={`/tecnologias/${image}`}
            alt={title}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 text-center">
        {description}
      </p>
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Nível de domínio: {"⭐".repeat(rating)} ({rating}/5)
        </p>
      </div>
    </div>
  );
}