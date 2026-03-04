import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-primary">
      <SignUp />
    </div>
  );
}
