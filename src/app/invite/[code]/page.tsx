import { redirect } from "next/navigation";

interface InvitePageProps {
  readonly params: Promise<{ code: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params;
  redirect(`/register?referralCode=${encodeURIComponent(code.toUpperCase())}`);
}
