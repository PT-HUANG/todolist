function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-[100vh] bg-amber-50 px-4 py-6 sm:px-8 sm:py-8 flex flex-col items-center gap-4">
      {children}
    </div>
  );
}

export default PageContainer;
