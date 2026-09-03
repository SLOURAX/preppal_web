interface FeaturePlaceholderProps {
  title: string;
  description: string;
}

export function FeaturePlaceholder({
  title,
  description,
}: FeaturePlaceholderProps) {
  return (
    <main className="grid min-h-[calc(100dvh-4rem)] place-items-center px-5 py-10 md:min-h-[calc(100dvh-7rem)]">
      <section className="surface-card w-full max-w-xl p-8 text-center sm:p-10">
        <h1 className="text-foreground mt-5 text-4xl font-bold tracking-[-0.04em]">
          {title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md leading-7 text-pretty">
          {description}
        </p>
      </section>
    </main>
  );
}
