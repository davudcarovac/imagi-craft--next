interface PageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: PageProps) {
  return (
    <div>
      <h1>Reset Token: {params.token}</h1>
    </div>
  );
}
