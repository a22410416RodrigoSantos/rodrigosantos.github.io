import tecnologias from '@/app/data/tecnologias.json'
import TecnologiaCard from '@/components/TecnologiaCard'

export default function TecnologiasPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Tecnologias Exploradas</h2>

      <div className="flex flex-wrap">
        {tecnologias.map((tech, index) => (
          <TecnologiaCard
            key={tech.title}
            title={tech.title}
            image={tech.image}
            index={index}
          />
        ))}
      </div>
    </>
  )
}
