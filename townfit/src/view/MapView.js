import React, { useEffect } from "react";

function MapView() {
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
    }, []);

    // 네이버 지도 콜백 함수 정의 (window에 등록)
    useEffect(() => {
        window.initMap = function () {

            const mapOptions = {
                    center: new window.naver.maps.LatLng(37.2820187, 127.0463409),
                    zoom: 14};
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
        };
    }, []);

    return (
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    );
}

export default MapView;