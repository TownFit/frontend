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
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={handlePrev}
        >
          이전
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SelectLocationButton;