type ContentCardProps = {
  children: React.ReactNode;
  style: number;
};

function ContentCard({ children, style }: ContentCardProps) {
  return (
    <div
      className={`py-2 grow ${style === 1 && "max-w-[650px]"} ${
        style === 2 && "max-w-[400px]"
      }`}
    >
      <div className="overflow-hidden bg-white mx-auto border border-gray-500 rounded-lg shadow-lg px-4 pt-6 pb-8">
        <div className="mx-auto sm:max-w-full">{children}</div>
      </div>
    </div>
  );
}

export default ContentCard;
