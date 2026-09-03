import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui";

interface GoogleAuthButtonProps {
  readonly text: string;
  readonly onClick?: () => void;
}

export function GoogleAuthButton({ text, onClick }: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      className="bg-surface hover:bg-surface-subtle border-border text-foreground flex h-11 w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all active:scale-[0.98]"
      onClick={onClick}
    >
      <FcGoogle className="size-5" />
      {text}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="border-border w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-surface text-muted-foreground px-3 font-medium">
          Or continue with
        </span>
      </div>
    </div>
  );
}
