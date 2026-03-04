import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-primary">
      <SignIn />
    </div>
  );
}
