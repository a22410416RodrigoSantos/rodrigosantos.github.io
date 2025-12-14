import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import Link from "next/link";

export default async function TecnologiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = Number(id);

  // Validação de índice
  if (isNaN(index) || index < 0 || index >= tecnologias.length) {
    return <p className="text-center mt-8">Tecnologia não encontrada</p>;
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
      <div className="text-center mt-4">
        <Link href="/tecnologias" className="text-blue-600 hover:underline">
          Voltar
        </Link>
      </div>
    </div>
  );
}