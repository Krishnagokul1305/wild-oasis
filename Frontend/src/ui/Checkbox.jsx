function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex gap-4 bg-white px-5 py-6">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`h-6 w-6 outline-offset-2 transform origin-left ${
          disabled ? "accent-gray-400" : "accent-blue-600"
        }`}
      />
      <label
        htmlFor={!disabled ? id : ""}
        className="flex-1 flex items-center gap-2"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
