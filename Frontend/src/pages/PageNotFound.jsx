import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-grey-100">
      <h1 className="text-3xl font-semibold text-grey-600 mb-6">
        The page you are looking for could not be found 😢
      </h1>
      <button
        onClick={moveBack}
        className="px-4 py-2 space-x-2 bg-blue-500 text-white text-base font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default PageNotFound;
