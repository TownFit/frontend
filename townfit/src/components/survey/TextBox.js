function TextBox({ text, setText }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">추가로 원하는 점이 있나요?</label>
            <textarea
                className="border border-blue-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="예: 반려동물 친화적인 동네를 원해요"
            />
        </div>
    )
}
export default TextBox;