const Loader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center h-screen">
      <div className="h-6 w-6 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6 bg-secondary rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
