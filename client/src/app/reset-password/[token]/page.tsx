import ResetPasswordClient from "@/components/ResetPasswordPage/ResetPasswordClient";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  return <ResetPasswordClient resetToken={token} />;
}
