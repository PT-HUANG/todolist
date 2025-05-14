import { Header, TodoInput, TodoCollection, PageContainer } from "@/components";

function Home() {
  return (
    <>
      <PageContainer>
        <Header />
        <TodoInput />
        <TodoCollection />
      </PageContainer>
    </>
  );
}

export default Home;
