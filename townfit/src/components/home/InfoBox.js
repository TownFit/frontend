function InfoBox({ title, description }) {
    return (
        <div className="bg-white text-black rounded-xl p-5 m-8 shadow-[0_4px_24px_0_rgba(37,99,235,0.25)] border-l-8 border-blue-600">
            <h3 className="text-lg font-bold mb-2 text-blue-600">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default InfoBox;