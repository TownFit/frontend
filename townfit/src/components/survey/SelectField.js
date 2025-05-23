function SelectField({opt, selected, handleSelect}) {
    return (
        <button
            key={opt}
            type="button"
            className={`rounded-xl px-4 py-3 border-2 transition-all
                ${selected.includes(opt)
                    ? "bg-blue-100 border-blue-600 text-blue-700 font-bold shadow"
                    : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"}
              `}
            onClick={() => handleSelect(opt)}
        >
            {opt}
        </button>
    )
}
export default SelectField;