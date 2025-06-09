import InfoBox from "../home/InfoBox";

function DescriptionBox({ recommendations }) {
    if (!recommendations || recommendations.length === 0) {
        return <div>추천 설명이 없습니다.</div>;
    }

    return (
        <div>
            {recommendations.map((rec, idx) => (
                <InfoBox
                    key={rec.id || idx}
                    title={`${idx + 1}. ${rec.facility_type?.name || "추천"}`}
                    description={
                       rec.facility_type?.description
                    }
                />
            ))}
        </div>
    );
}

export default DescriptionBox;