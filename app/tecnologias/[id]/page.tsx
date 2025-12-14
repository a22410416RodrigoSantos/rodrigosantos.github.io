import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import Link from "next/link";

export default function TecnologiaPage({ params }: { params: { id: string } }) {
  const index = Number(params.id);

  if (isNaN(index) || index < 0 || index >= tecnologias.length) {
    return <p>Tecnologia não encontrada</p>;
  }

  const tecnologia = tecnologias[index];

  return (
    <div className="p-4">
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />
      <Link href="/tecnologias" className="block mt-4 text-blue-600">
        Voltar
      </Link>
    </div>
  );
}
