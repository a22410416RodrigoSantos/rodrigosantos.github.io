import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

export default function TecnologiaPage({ params }: Params) {
  const id = Number(params.id);

  const tecnologia = tecnologias[id];

  if (!tecnologia) {
    return <p>Tecnologia não encontrada.</p>;
  }

  return (
    <div className="p-4">
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link
        href="/tecnologias"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Voltar
      </Link>
    </div>
  );
}
