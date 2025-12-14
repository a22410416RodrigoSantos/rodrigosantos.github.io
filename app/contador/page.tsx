import Contador from '@/components/Contador';

export default function ContadorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Contador Interativo
        </h1>
        <Contador />
      </div>
    </div>
  );
}