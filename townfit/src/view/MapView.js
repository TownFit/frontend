import React, { useEffect } from "react";
import pageState from "../stores/pageState";
import locationState from "../stores/locationState";

function MapView() {
    const { page } = pageState();
    const { location, setLocation } = locationState();

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=mrmfym9y53&callback=initMap";
        script.async = true;
        document.body.appendChild(script);

        // 인증 실패 콜백 등록
        window.navermap_authFailure = function () {
            alert("네이버 지도 인증에 실패했습니다. API 키를 확인하세요.");
        };
 
        // cleanup: remove script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [location]);

    // 네이버 지도 콜백 함수 정의 (window에 등록)
    useEffect(() => {
        window.initMap = function () {

            const mapOptions = {
                center: new window.naver.maps.LatLng(37.2820187, 127.0463409),
                zoom: 14
            };
            const map = new window.naver.maps.Map("map", mapOptions);

            // 마커 추가 예시
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(37.2820187, 127.0463409),
                map: map
            });
            const infoWindow = new window.naver.maps.InfoWindow({
                content: '<div style=text-align:center;padding:10px;"><b>“이 학교, 학점 말고 점수는요?”</b></div>'
            });
            infoWindow.open(map, marker.getPosition());

            // location 상태가 초기화된 후에 이 코드가 실행되도록 하거나,
            // location이 비어있을 경우를 대비한 방어 코드가 필요합니다.
            if (location && location.length >= 1) {
                const circle_LatLng1 = new window.naver.maps.LatLng(location[0].lat, location[0].lng);

                // 원 그리기
                new window.naver.maps.Circle({
                    map: map,
                    center: circle_LatLng1,
                    radius: 1000,
                    strokeWeight: 0,
                    fillColor: 'red',
                    fillOpacity: 0.2
                });
            }
        };
    }, [location, setLocation]); // location이 변경될 때 initMap을 다시 정의하거나, 지도 내용을 업데이트해야 한다면 추가

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