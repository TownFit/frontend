import { useEffect, useState } from "react";
import SubTitle from "../common/SubTitle";
import DescriptionBox from "./DescriptionBox";
import Button from "../common/Button";
import MiniButton from "./MiniButton";
import pageState from "../../stores/pageState";
import locationState from "../../stores/locationState";
import SelectLocationButton from "./SelectLocationButton";
import InfoTown from "./\bInfoTown";
import axios from "axios";

function SuggestionSidebar() {
    const { goToSurvey } = pageState();
    const { setLocation, locationIndex, setLocationIndex } = locationState();

    // areas, recommendations를 상태로 관리
    const [areas, setAreas] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // JWT 토큰을 localStorage에서 가져옴
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const res = await axios.get("https://mytownfit.com/map/get-recommendations", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAreas(res.data.areas || []);
                setRecommendations(res.data.recommendations || []);
                // locationState에 위경도 저장
                setLocation(
                    (res.data.areas || []).map(area => ({
                        name: area.name,
                        lat: area.centroid.latitude,
                        lng: area.centroid.longitude,
                        range: area.range,
                        score: area.score,
                    }))
                );
            } catch (error) {
                alert("추천 데이터를 불러오지 못했습니다.");
            }
        }
        if (token) {
            fetchRecommendations();
        } else {
            alert("로그인이 필요합니다.");
        }
    }, [token]);

    const handleGoToNaveriSaleLand = () => {
        if (!areas[locationIndex]) return;
        const lat = areas[locationIndex].centroid.latitude;
        const lng = areas[locationIndex].centroid.longitude;
        const zoomLevel = 14;
        const aValue = "IA01";
        window.open(
            `https://isale.land.naver.com/iSale/Map/#?SYMap=${lat},${lng},${zoomLevel}&a=${aValue}`,
            "_blank"
        );
    };

    return (
        <div className="flex flex-col items-center justify-between h-full">
            {areas[locationIndex]
                ? <SubTitle content={areas[locationIndex].name} />
                : <SubTitle content="추천 동네가 없습니다." />}

            <InfoTown
                ranking={locationIndex + 1}
                score={areas[locationIndex] ? areas[locationIndex].score : 0}
            />

            <SelectLocationButton
                areas={areas}
                locationIndex={locationIndex}
                setLocationIndex={setLocationIndex}
            />

            <DescriptionBox recommendations={recommendations} />

            <Button
                content="이 동네 부동산 보기! 👀"
                onClick={handleGoToNaveriSaleLand}
            />
            <MiniButton
                content="설문 다시하기"
                onClick={goToSurvey}
            />
        </div>
    );
}

export default SuggestionSidebar;