import { useEffect, useState } from "react";
import SubTitle from "../common/SubTitle";
import DescriptionBox from "./DescriptionBox";
import Button from "../common/Button";
import MiniButton from "./MiniButton";
import pageState from "../../stores/pageState";
import locationState from "../../stores/locationState";
import axios from "axios";

function SuggestionSidebar() {
    const { goToSurvey } = pageState();
    const { setLocation, addLocation } = locationState();

    // areas, recommendations를 상태로 관리
    const [areas, setAreas] = useState([]);
    const [currentArea, setCurrentArea] = useState(null); // 선택된 area
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
                addLocation(
                    (res.data.areas || []).map(area => ({
                        name: area.name,
                        lat: area.centroid.latitude,
                        lng: area.centroid.longitude
                    }))
                );
                setLocation({ name: "원천동2", lat: 37.2590187, lng: 127.0792309 });
                // 첫 번째 area를 기본 선택
                if (res.data.areas && res.data.areas.length > 0) {
                    setCurrentArea(res.data.areas[0]);
                }
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

    const handleGoToHome = () => {
        if (!currentArea) return;
        const lat = currentArea.centroid.latitude;
        const lng = currentArea.centroid.longitude;
        const zoomLevel = 13;
        const aValue = "IA01";
        window.open(
            `https://isale.land.naver.com/iSale/Map/#?SYMap=${lat},${lng},${zoomLevel}&a=${aValue}`,
            "_blank"
        );
    };

    return (
        <div className="flex flex-col items-center justify-between h-full">
            {currentArea ? <SubTitle content={currentArea.name} /> : <SubTitle content="추천 동네가 없습니다." />}

            <DescriptionBox recommendations={recommendations} />

            <div className="flex flex-col items-center gap-4">
                <Button
                    content="이 동네 부동산 보기! 👀"
                    onClick={handleGoToHome}
                />
                <MiniButton
                    content="설문 다시하기"
                    onClick={goToSurvey}
                />
            </div>
        </div>
    );
}

export default SuggestionSidebar;