import { Gamepad2 } from "lucide-react";

export default function GamesPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[calc(100vh-7rem)]">
      <div className="bg-primary/10 mb-4 rounded-full p-4">
        <Gamepad2 className="text-primary h-9 w-9" />
      </div>
      <h1 className="text-foreground mb-2 text-xl font-bold tracking-tight">
        Games
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        Play focused games and increase your Preppal balance. Sharpen your
        skills while having fun and competing with others.
      </p>
      <div className="mt-8">
        <button
          className="bg-primary/50 text-primary-foreground/90 cursor-not-allowed rounded-full px-6 py-2.5 text-sm font-bold shadow-sm"
          disabled
        >
          Coming Soon
        </button>
      </div>
    </main>
  );
}
