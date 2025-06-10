function Score({ score }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-500">동네 점수:</span>
      <span className="text-lg font-semibold">{score}</span>
    </div>
  );
}
export default Score;