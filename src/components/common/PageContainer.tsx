function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full sm:min-h-[100vh] bg-slate-100 px-4 py-6 sm:px-8 sm:py-8 flex flex-col-reverse justify-end items-center sm:flex-row sm:justify-center sm:items-start gap-4">
      {children}
    </div>
  );
}

export default PageContainer;
