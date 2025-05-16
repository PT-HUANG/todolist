import {
  Header,
  TodoInput,
  TodoCollection,
  PageContainer,
  ContentCard,
} from "@/components";

function Home() {
  return (
    <>
      <PageContainer>
        <ContentCard style={1}>
          <Header />
          <TodoInput />
          <TodoCollection />
        </ContentCard>
      </PageContainer>
    </>
  );
}

export default Home;
