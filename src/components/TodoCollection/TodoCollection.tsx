import Todo from "./Todo";

const dummyData = [
  {
    title: "Learn react-router",
    isDone: true,
    id: 1,
  },
  {
    title: "Learn to create custom hooks",
    isDone: false,
    id: 2,
  },
  {
    title: "Learn to use context",
    isDone: true,
    id: 3,
  },
  {
    title: "Learn to implement auth",
    isDone: false,
    id: 4,
  },
];

function TodoCollection() {
  return (
    <div className="p-4 sm:px-4">
      {dummyData?.map((data) => {
        return <Todo key={data.id} title={data.title} isDone={data.isDone} />;
      })}
    </div>
  );
}

export default TodoCollection;
