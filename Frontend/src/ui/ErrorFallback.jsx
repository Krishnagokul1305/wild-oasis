const ErrorFallback = ({  resetErrorBoundary }) => {
  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center p-12">
      <Box resetErrorBoundary={resetErrorBoundary} />
    </main>
  );
};

const Box = ({ resetErrorBoundary }) => {
  return (
    <div className=" flex-1 max-w-6xl text-center">
      <h1 className="mb-4 font-bold">Something went wrong 🥲</h1>
      <span onClick={resetErrorBoundary} className="cursor-pointer text-sm text-blue-700">
       &larr; Go to Home Page
      </span>
    </div>
  );
};

export default ErrorFallback;
