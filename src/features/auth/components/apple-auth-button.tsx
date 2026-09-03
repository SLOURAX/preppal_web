import { FaApple } from "react-icons/fa6";

interface AppleAuthButtonProps {
  readonly text: string;
  readonly onClick?: () => void;
}

export function AppleAuthButton({ text, onClick }: AppleAuthButtonProps) {
  return (
    <button
      type="button"
      className="h-11 w-full rounded-xl flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
      onClick={onClick}
    >
      <FaApple className="size-5 mb-0.5" />
      {text}
    </button>
  );
}
