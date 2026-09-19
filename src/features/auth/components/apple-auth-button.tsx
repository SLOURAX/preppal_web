import { FaApple } from "react-icons/fa6";

interface AppleAuthButtonProps {
  readonly text: string;
  readonly onClick?: () => void;
}

export function AppleAuthButton({ text, onClick }: AppleAuthButtonProps) {
  return (
    <button
      type="button"
      className="bg-foreground hover:bg-foreground/90 text-background flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
      onClick={onClick}
    >
      <FaApple className="mb-0.5 size-5" />
      {text}
    </button>
  );
}
