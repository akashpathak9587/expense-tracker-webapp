function InputField({ label, id, name, type = 'text', onChange, value }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input type={type} name={name} id={id} className="mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" onChange={onChange} value={value} />
      </div>
  )
}

export default InputField