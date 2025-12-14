import Caracteristica from "@/components/Caracteristica";

const caracteristicas = [
  "JSX, sintaxe que mistura HTML e JS.",
  "Componentes, funções que retornam JSX.",
  "Componentes Reutilizáveis e Modulares.",
  "Roteamento Automático e APIs.",
  "Hooks: useState, useEffect e useSWR.",
  "Renderização Rápida e SEO Friendly.",
  "TypeScript Seguro e Escalável.",
  "Comunidade Ativa e Popularidade.",
];

export default function CaracteristicasPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        Características do React e Next.js
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {caracteristicas.map((texto, index) => (
          <Caracteristica key={index} texto={texto} index={index} />
        ))}
      </div>
    </div>
  );
}