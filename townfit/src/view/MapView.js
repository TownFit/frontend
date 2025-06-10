import React, { useEffect, useRef, useState } from "react";
import pageState from "../stores/pageState";
import locationState from "../stores/locationState";

function MapView() {
    const { page } = pageState();
    const { location, locationIndex, setLocationIndex } = locationState();
    const mapRef = useRef(null);
    const circlesRef = useRef([]);
    const [zoom, setZoom] = useState(14); // zoom 상태 추가

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

    // 지도 줌 상태와 동기화
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setZoom(zoom);
        }
    }, [zoom]);

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
                    radius: loc.range,
                    strokeWeight: 2,
                    strokeColor: isSelected ? '#ff0000' : '#888888', // 선택: 빨강, 비선택: 회색
                    fillColor: isSelected ? 'red' : '#cccccc',       // 선택: 빨강, 비선택: 연회색
                    fillOpacity: 0.4,
                    clickable: true,
                    zIndex: 10
                });
                console.log(`Circle created for location ${idx}:`, loc);
                // 클릭 이벤트 등록
                window.naver.maps.Event.addListener(circle, "click", () => {
                    setLocationIndex(idx);
                });
                circlesRef.current.push(circle);
            }
        });

    }, [location, setLocationIndex, locationIndex]);

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

    // 지도에서 zoom 변경 시 슬라이더와 동기화
    useEffect(() => {
        if (!mapRef.current) return;
        const listener = window.naver.maps.Event.addListener(mapRef.current, "zoom_changed", () => {
            setZoom(mapRef.current.getZoom());
        });
        return () => {
            window.naver.maps.Event.removeListener(listener);
        };
    }, []);

    // 슬라이더 핸들러
    const handleZoomChange = (e) => {
        setZoom(Number(e.target.value));
    };

    // --- UI ---
    const slider =
        <div className="absolute right-6 bottom-6 z-30 flex flex-col items-center bg-white/80 rounded-lg px-4 py-3 shadow-lg">
            <label className="text-xs text-gray-500 mb-1">지도 확대/축소</label>
            <input
                type="range"
                min={7}
                max={20}
                step={0.1} // 실수 단위로 변경
                value={zoom}
                onChange={handleZoomChange}
                className="w-32 accent-blue-500"
            />
            <span className="text-xs mt-1 text-blue-700 font-semibold">{zoom.toFixed(1)}</span>
        </div>;

    if (page === "home") {
        return (
            <div className="relative w-full h-full border-r-2 border-blue-400">
                {/* 지도 */}
                <div id="map" className="w-full h-full" />
                {/* 우측 하단 슬라이더 */}
                {slider}
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
                <div id="map" className="w-full h-full" />
                {slider}
            </div>
        );
    }
}

export default MapView;