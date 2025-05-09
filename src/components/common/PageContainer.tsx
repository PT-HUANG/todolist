function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] bg-slate-100 p-8">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
}

export default PageContainer;
