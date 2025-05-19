import {
  PageContainer,
  ContentCard,
  LoginForm,
  RegisterForm,
  Firstview,
} from "@/components";
import { useEffect, useState } from "react";
function Login() {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  }, []);
  return (
    <>
      <PageContainer>
        {isShow && <Firstview />}
        <ContentCard style={2}>
          <RegisterForm />
        </ContentCard>
        <ContentCard style={2}>
          <LoginForm />
        </ContentCard>
      </PageContainer>
    </>
  );
}

export default Login;
