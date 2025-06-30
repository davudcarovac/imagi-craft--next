import { FC } from "react";

interface PageProps {
  params: {
    token: string;
  };
}

const ResetPasswordPage: FC<PageProps> = ({ params }) => {
  return (
    <div>
      <h1>Token: {params.token}</h1>
    </div>
  );
};

export default ResetPasswordPage;
