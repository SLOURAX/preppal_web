interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </header>
  );
}
