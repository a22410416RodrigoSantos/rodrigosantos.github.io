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
  rating
}: TecnologiaDetailsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

      <div className="flex justify-center mb-4">
        <Image
          src={`/tecnologias/${image}`}
          alt={title}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      <p className="mb-2">{description}</p>
      <p className="font-semibold">Rating: ⭐ {rating}/5</p>
    </div>
  );
}
