import { useEffect, useState } from "react";
import SubTitle from "../common/SubTitle";
import DescriptionBox from "./DescriptionBox";
import Button from "../common/Button";
import pageState from "../../stores/pageState";
import locationState from "../../stores/locationState";
import axios from "axios";

function SuggestionSidebar() {
    const { goToSurvey } = pageState();
    const { location } = locationState();

    // 추천 데이터 상태
    const [areas, setAreas] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const res = await axios.get("https://mytownfit.com/map/get-recommendations");
                setAreas(res.data.areas || []);
                setRecommendations(res.data.recommendations || []);
            } catch (error) {
                alert("추천 데이터를 불러오지 못했습니다.");
            }
        }
        fetchRecommendations();
    }, []);

    const handleGoToHome = () => {
        if (!location || location.length === 0) return;
        const lat = location[0].lat;
        const lng = location[0].lng;
        const zoomLevel = 13;
        const aValue = "IA01";
        window.open(`https://isale.land.naver.com/iSale/Map/#?SYMap=${lat},${lng},${zoomLevel}&a=${aValue}`, "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-between gap-20 h-full">
            <SubTitle content={areas[0]?.name || "추천 동네"} />

            <DescriptionBox description={recommendations[0]?.description} />

            <Button content="추천 동네 부동산 보기! 👀" onClick={handleGoToHome} />
        </div>
    )
}
export default SuggestionSidebar;