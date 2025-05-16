import {
  PageContainer,
  ContentCard,
  LoginForm,
  RegisterForm,
} from "@/components";
function Login() {
  return (
    <>
      <PageContainer>
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
