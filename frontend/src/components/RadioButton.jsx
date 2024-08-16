const RadioButton = ({ id, label, name, onChange, value, checked }) => {
  return (
    <div className="inline-flex items-center">
      <label
        htmlFor={id}
        className="relative flex items-center p-3 rounded-full cursor-pointer">
        <input
          type="radio"
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          checked={checked}
          className="before:content-[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-black text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
        />
        <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </span>
      </label>
      <label
        htmlFor={id}
        className="mt-px font-light text-gray-700 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
