function MiniButton({ content, onClick }) {
    return (
        <button
            className="bg-white text-gray-600 font-medium text-sm px-4 py-1 rounded underline hover:bg-gray-100 transition-all"
            onClick={onClick}
        >
            {content}
        </button>
    );
}
export default MiniButton;