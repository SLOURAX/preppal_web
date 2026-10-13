import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-16">
      <section className="surface-card w-full max-w-md p-7 text-center sm:p-9">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-500/10 text-amber-600">
          <XCircle className="size-7" />
        </span>
        <h1 className="text-foreground mt-5 text-xl font-black">
          Checkout canceled
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          You were not charged and your Preppal account was not changed.
        </p>
        <Link
          className="bg-primary text-primary-foreground mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl text-sm font-bold"
          href="/pricing"
        >
          Choose a plan
        </Link>
      </section>
    </main>
  );
}
