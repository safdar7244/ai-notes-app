import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)] bg-purple-200">
      <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-20 rounded-full" />
            </div>
            <ArrowLeftCircle className="w-16 h-16 text-indigo-600 relative animate-bounce" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to NotesAI
            </h1>
            <p className="text-gray-600">
              Get started by creating a new document from the sidebar.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
