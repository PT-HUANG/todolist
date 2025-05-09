import {
  Header,
  TodoInput,
  TodoCollection,
  Footer,
  PageContainer,
  TodoPageContainer,
} from "@/components";

function Home() {
  return (
    <>
      <PageContainer>
        <TodoPageContainer>
          <Header />
          <TodoInput />
          <TodoCollection />
          <Footer />
        </TodoPageContainer>
      </PageContainer>
    </>
  );
}

export default Home;
