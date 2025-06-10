function SelectLocationButton ({ areas, locationIndex, setLocationIndex }) {
  return (
    <div className="flex flex-col items-center">
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setLocationIndex(locationIndex - 1)}
                        disabled={locationIndex <= 0}
                    >
                        이전
                    </button>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setLocationIndex(locationIndex + 1)}
                        disabled={locationIndex >= areas.length - 1}
                    >
                        다음
                    </button>
                </div>
            </div>
  );
}

export default SelectLocationButton;