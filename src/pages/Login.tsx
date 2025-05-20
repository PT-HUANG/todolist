import {
  PageContainer,
  ContentCard,
  LoginForm,
  RegisterForm,
  Firstview,
  Introduction,
} from "@/components";
import { useEffect, useState } from "react";

function Login() {
  const [isLoginShow, setIsLoginShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoginShow(true);
    }, 2000);
  }, []);

  return (
    <>
      <PageContainer>
        <Firstview />
        {isLoginShow && (
          <>
            <Introduction />
            <div className="sm:flex gap-4">
              <ContentCard style={2}>
                <RegisterForm />
              </ContentCard>
              <ContentCard style={2}>
                <LoginForm />
              </ContentCard>
            </div>
          </>
        )}
      </PageContainer>
    </>
  );
}

export default Login;
