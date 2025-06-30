interface Props {
  params: { token: string };
}

const ResetPasswordPage = ({ params }: Props) => {
  return (
    <div>
      {" "}
      <h1>User ID: {params.token}</h1>
    </div>
  );
};

export default ResetPasswordPage;
