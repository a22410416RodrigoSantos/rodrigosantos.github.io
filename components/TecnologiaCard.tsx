import Image from "next/image";
import Link from "next/link";

interface TecnologiaProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaProps) {
  return (
    <Link href={`/tecnologias/${index}`}>
      <div className="
          w-48 h-56 bg-white dark:bg-gray-800 rounded-xl shadow-md
          flex flex-col items-center justify-between p-4 m-2 transition
          cursor-pointer
        "
      >
        <h3 className="text-lg font-semibold text-center">{title}</h3>

        <div className="flex-grow flex items-center justify-center w-full">
          <Image 
            src={`/tecnologias/${image}`}
            alt={title}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
}
