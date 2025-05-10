import {
  Header,
  TodoInput,
  TodoCollection,
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
        </TodoPageContainer>
      </PageContainer>
    </>
  );
}

export default Home;
