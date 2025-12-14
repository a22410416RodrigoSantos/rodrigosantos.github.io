import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard";

export default function TecnologiasPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Tecnologias Exploradas</h2>
      <div className="flex flex-wrap justify-center">
        {tecnologias.map((tech, index) => (
          <TecnologiaCard
            key={tech.title}
            title={tech.title}
            image={tech.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
