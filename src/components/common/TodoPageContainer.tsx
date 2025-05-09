function TodoPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white max-w-[600px] mx-auto border border-black rounded-lg shadow-lg p-4">
      {children}
    </div>
  );
}

export default TodoPageContainer;
