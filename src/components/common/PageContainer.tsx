function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] bg-slate-100 sm:p-8">
      <div className="container mx-auto p-4">
        <div className="overflow-hidden bg-white max-w-[600px] mx-auto border border-black rounded-lg shadow-lg p-4">
          <div className="max-w-[450px] mx-auto sm:max-w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;
