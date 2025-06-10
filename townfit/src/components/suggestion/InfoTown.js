function InfoTown({ ranking, score }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-500">순위:</span>
      <span className="text-lg font-semibold">{ranking}</span>
      
      <span className="mx-2 text-gray-300">|</span>
      
      <span className="text-sm text-gray-500">편의도:</span>
      <span className="text-lg font-semibold">{score}</span>
    </div>
  );
}
export default InfoTown;