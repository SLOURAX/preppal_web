import { BookOpen, ChartNoAxesCombined, Target, UserRound } from "lucide-react";

interface ProfileOverviewProps {
  readonly userName: string;
  readonly userPlan: string;
}

const PROFILE_STATS = [
  { label: "Quizzes completed", value: "24", icon: BookOpen },
  {
    label: "Current streak",
    value: "7 days",
    icon: ChartNoAxesCombined,
  },
  { label: "Average score", value: "78%", icon: Target },
] as const;

export function ProfileOverview({ userName, userPlan }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      <section className="surface-card flex items-center gap-4 p-6">
        <div className="bg-primary text-primary-foreground grid size-16 shrink-0 place-items-center rounded-full">
          <UserRound className="size-7" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Learner profile</p>
          <h1 className="text-foreground text-2xl font-bold">{userName}</h1>
          <p className="text-muted-foreground text-sm">{userPlan} plan</p>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        {PROFILE_STATS.map(({ icon: Icon, label, value }) => (
          <div className="surface-card p-5" key={label}>
            <Icon className="text-primary size-5" />
            <p className="text-foreground mt-4 text-xl font-bold">{value}</p>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
