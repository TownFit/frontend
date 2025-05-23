function Button({content}) {
    return (
        <button className="bg-sky text-blue-600 font-bold text-lg px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white transition-all border-2 border-blue-600">
            {content}
        </button>
    );
}
export default Button;