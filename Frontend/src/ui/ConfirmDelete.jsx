function ConfirmDelete({ resourceName, onConfirm, disabled, onClose }) {
  return (
    <div className="w-[40rem] flex flex-col gap-[1.2rem]">
      <h3>Delete {resourceName}</h3>
      <p className="text-gray-500 mb-[1.2rem]">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-[1.2rem]">
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={disabled}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-red-300"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
