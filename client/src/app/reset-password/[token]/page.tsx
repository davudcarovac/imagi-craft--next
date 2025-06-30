interface PageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  return (
    <div>
      <h1>Reset Token: {token}</h1>
    </div>
  );
}
