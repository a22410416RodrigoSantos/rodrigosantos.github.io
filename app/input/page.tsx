import GestaoTarefas from "@/components/GestaoTarefas";

export default function InputPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Gestão de Tarefas Interativa
        </h1>
        <GestaoTarefas />
      </div>
    </div>
  );
}