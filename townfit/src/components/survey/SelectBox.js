import SelectField from "./SelectField";

function SelectBox({ options, selected, handleSelect }) {
    return (
        <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-700 mb-1">중요하게 생각하는 요소를 <span className="inline-block text-blue-600 font-bold text-xl underline">모두</span> 선택하세요</label>
            <div className="flex flex-col gap-3">
                {options.map((opt, idx) => (

                    <SelectField
                        opt={opt}
                        selected={selected}
                        handleSelect={handleSelect}
                    />

                ))}
            </div>
        </div>
    )
}
export default SelectBox;