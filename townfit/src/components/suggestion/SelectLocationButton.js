function SelectLocationButton({ areas, locationIndex, setLocationIndex }) {
    const handlePrev = () => {
        if (areas.length === 0) return;
        setLocationIndex(locationIndex === 0 ? areas.length - 1 : locationIndex - 1);
    };

    const handleNext = () => {
        if (areas.length === 0) return;
        setLocationIndex(locationIndex === areas.length - 1 ? 0 : locationIndex + 1);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-2">
                <button
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 font-semibold rounded-full border border-blue-200 bg-white shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-all"
                    onClick={handlePrev}>
                    이전
                </button>

                <button
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 font-semibold rounded-full border border-blue-200 bg-white shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-all"
                    onClick={handleNext}>
                    다음
                </button>
            </div>
        </div>
    );
}

export default SelectLocationButton;