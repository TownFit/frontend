import React, { useEffect, useRef } from "react";
import pageState from "../stores/pageState";
import locationState from "../stores/locationState";

function MapView() {
    const { page } = pageState();
    const { location, locationIndex, setLocationIndex } = locationState();
    const mapRef = useRef(null);
    const circlesRef = useRef([]);

    // 지도 최초 1회만 생성
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=mrmfym9y53";
        script.async = true;
        document.body.appendChild(script);

        window.navermap_authFailure = function () {
            alert("네이버 지도 인증에 실패했습니다. API 키를 확인하세요.");
        };

        script.onload = () => {
            mapRef.current = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(37.2820187, 127.0463409),
                zoom: 14
            });

            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(37.2820187, 127.0463409),
                map: mapRef.current
            });
            const infoWindow = new window.naver.maps.InfoWindow({
                content: '<div style=text-align:center;padding:10px;"><b>“내가 살기 가장 좋은 동네는 어디일까?”</b></div>'
            });
            infoWindow.open(mapRef.current, marker.getPosition());
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // location이 바뀔 때마다 원만 갱신
    useEffect(() => {
        if (!window.naver || !window.naver.maps || !mapRef.current) return;

        // 기존 원 삭제
        circlesRef.current.forEach(circle => circle.setMap(null));
        circlesRef.current = [];

        // location이 배열이 아니면 배열로 변환
        const locations = Array.isArray(location) ? location : location ? [location] : [];

        locations.forEach((loc, idx) => {
            if (loc && typeof loc.lat === "number" && typeof loc.lng === "number") {
                const isSelected = idx === locationIndex;
                const circle = new window.naver.maps.Circle({
                    map: mapRef.current,
                    center: new window.naver.maps.LatLng(loc.lat, loc.lng),
                    radius: 1000,
                    strokeWeight: 2,
                    strokeColor: isSelected ? '#ff0000' : '#888888', // 선택: 빨강, 비선택: 회색
                    fillColor: isSelected ? 'red' : '#cccccc',       // 선택: 빨강, 비선택: 연회색
                    fillOpacity: 0.4,
                    clickable: true,
                    zIndex: 10
                });
                // 클릭 이벤트 등록
                window.naver.maps.Event.addListener(circle, "click", () => {
                    setLocationIndex(idx);
                });
                circlesRef.current.push(circle);
            }
        });

    }, [location, setLocationIndex, locationIndex, locationIndex]);

    // locationIndex가 변경될 때마다 지도 중심 이동 (debounce 적용)
    useEffect(() => {
        if (
            !window.naver ||
            !window.naver.maps ||
            !mapRef.current ||
            !location ||
            !Array.isArray(location) ||
            location.length === 0
        ) return;

        const target = location[locationIndex];
        if (target && typeof target.lat === "number" && typeof target.lng === "number") {
            // 디바운스 타이머
            let timer = setTimeout(() => {
                mapRef.current.panTo(
                    new window.naver.maps.LatLng(target.lat, target.lng)
                );
            }, 100); // 0.25초 후에 실행

            // cleanup: 이전 타이머 제거
            return () => clearTimeout(timer);
        }
    }, [locationIndex, location, mapRef]);

    if (page === "home") {
        return (
            <div className="relative w-full h-full border-r-2 border-blue-400">
                {/* 지도 */}
                <div id="map" className="w-full h-full" />
                {/* 왼쪽 하단에서 우측 상단으로 투명해지는 파란색 그라데이션 오버레이 */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-blue-500/60 via-blue-400/20 to-transparent" />
                {/* 왼쪽 하단 텍스트 */}
                <div className="absolute left-12 bottom-12 z-20 text-white text-8xl font-bold drop-shadow-lg select-none">
                    이 동네의 점수는?
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative w-full h-full border-r-2 border-blue-400">
                {/* 지도 */}
                <div id="map" className="w-full h-full" />
            </div>
        );
    }


}

export default MapView;