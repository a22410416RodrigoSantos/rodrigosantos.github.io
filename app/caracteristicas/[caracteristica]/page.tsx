import Link from "next/link";

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

export default async function CaracteristicaPage({
  params,
}: {
  params: Promise<{ caracteristica: string }>;
}) {
  const { caracteristica } = await params;
  const index = Number(caracteristica);

  if (isNaN(index) || index < 0 || index >= caracteristicas.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Característica não encontrada
        </p>
      </div>
    );
  }

  const texto = caracteristicas[index];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-12 max-w-2xl w-full text-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Característica
        </h2>
        <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-12">
          {texto}
        </p>
        <Link
          href="/caracteristicas"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar às Características
        </Link>
      </div>
    </div>
  );
}