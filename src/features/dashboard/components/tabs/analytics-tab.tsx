import { BarChart3, Clock } from "lucide-react";

export function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-foreground text-xl font-bold">Analytics</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Deep insights into your learning patterns and performance.
        </p>
      </div>
      <div className="surface-card flex min-h-[380px] flex-col items-center justify-center gap-4 p-10 text-center">
        <div className="bg-primary/10 grid size-20 place-items-center rounded-3xl">
          <BarChart3 className="text-primary size-10" />
        </div>
        <h3 className="text-foreground text-lg font-bold">Analytics coming soon</h3>
        <p className="text-muted-foreground max-w-sm text-sm leading-6">
          We're building a powerful analytics dashboard that will show you score
          trends, time-per-question, subject heatmaps, and AI-powered study
          recommendations. Stay tuned!
        </p>
        <div className="border-border flex items-center gap-2 rounded-full border px-4 py-2">
          <Clock className="text-muted-foreground size-3.5" />
          <span className="text-muted-foreground text-xs font-medium">Expected Q4 2026</span>
        </div>
      </div>
    </div>
  );
}
