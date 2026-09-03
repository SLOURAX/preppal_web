import { redirect } from "next/navigation";

// /profile has been moved to the dashboard
export default function ProfilePage() {
  redirect("/dashboard");
}
