import { useState, useEffect } from "react";
import Title from "./Title";
import InfoBox from "./InfoBox";
import Button from "../common/Button";
import pageState from "../../stores/pageState";


function HomeSidebar() {
    const { goToSurvey } = pageState();

    const popupUrl = window.location.href;
    const urlObj = new URL(popupUrl);

    useEffect(() => {
        if (window.opener) { // 팝업 화면에서
            const popupUrl = window.location.href; // 팝업의 현재 URL을 가져옵니다.
            const token = urlObj.searchParams.get("token");
            localStorage.setItem("token", token);
            
            window.opener.postMessage({ type: "authSuccess" }, "*");

            window.close();
        } else { // 메인 화면에서
            const handler = (e) => {
                if (e.data && e.data.type === "authSuccess") {
                    goToSurvey();
                }
            };
            window.addEventListener("message", handler);
            return () => window.removeEventListener("message", handler);
        }
    }
        , []);

    const handleGoToSurvey = () => {
        window.open(
            "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=511055804638-56kh312s0e0rk6qp53qe0g79id1uufq8.apps.googleusercontent.com&redirect_uri=https://mytownfit.com/auth/google/callback&response_type=code&scope=openid%20profile&access_type=offline&state=1&service=lso&o2v=2&flowName=GeneralOAuthFlow",
            "_blank",
            "width=500,height=700"
        );
    };

    return (
        <div className="flex flex-col items-center justify-between w-[450px] h-full bg-white">
            <Title />
            <div className="">
                <InfoBox
                    title="10초 설문으로 딱 맞는 동네 추천"
                    description={
                        <>
                            자녀, 부모님, 반려동물까지 <br />
                            당신의 생활 조건을 빠르게 분석해요.
                        </>
                    }
                />
                <InfoBox
                    title="AI가 추천 이유까지 설명"
                    description={
                        <>
                            왜 이 동네가 적합한지 <br />
                            의료, 교육, 자연환경 기준으로 알려줘요.

                        </>
                    }
                />
                <InfoBox
                    title="지도에서 확인하고 시세까지 체크"
                    description={
                        <>
                            추천 동네를 지도에서 보고, <br />
                            아파트 시세도 함께 확인할 수 있어요.
                        </>
                    }
                />
            </div>
            <Button content="바로 시작하기" onClick={handleGoToSurvey} />
        </div>
    );
}

export default HomeSidebar;