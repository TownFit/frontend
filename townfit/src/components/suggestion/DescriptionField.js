function DescriptionField({ title, description}) {
    return (
        <div className="flex flex-col items-head mb-10">
                <h2 className="text-lg font-extrabold">{title}</h2>
                <p className="font-bold">{description}</p>
            </div>
    )
}
export default DescriptionField;