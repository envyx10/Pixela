import { LoginLayout } from "@/features/auth/components/LoginLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  );
}
