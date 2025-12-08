import Image from "next/image";
import tecnologiasJSON from "@/app/data/tecnologias.json";

export default function Tecnologias() {
  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJSON));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Tecnologias Exploradas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tecnologias.map((tec: any) => (
          <div
            key={tec.title}
            className="border rounded-xl p-4 shadow bg-white flex flex-col items-center"
          >
            <Image
              src={`/tecnologias/${tec.image}`}
              alt={tec.title}
              width={120}
              height={120}
            />

            <h3 className="text-xl font-semibold mt-4">{tec.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{tec.description}</p>

            <p className="mt-3 font-bold">
              ⭐ {tec.rating}/5
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
