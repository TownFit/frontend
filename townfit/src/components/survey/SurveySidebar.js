import Button from "../common/Button";
import SubTitle from "../common/SubTitle";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { useEffect, useState } from "react";
import pageState from "../../stores/pageState";
import axios from "axios";

function SurveySidebar() {
    const [selected, setSelected] = useState([]);
    const [text, setText] = useState("");
    const options = ["반려동물", "아이", "학생", "노인"];
    const { goToSuggestion } = pageState();

    // JWT 토큰을 localStorage에서 가져옴
    const token = localStorage.getItem("token");

    // 1. 마운트 시 GET API 호출 (JWT 인증 헤더 추가)
    useEffect(() => {
        async function checkSurvey() {
            try {
                const res = await axios.get("https://mytownfit.com/survey/has-history", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data === true || res.data.has_history === true) {
                    // goToSuggestion();
                } else {
                    alert("history가 없습니다.")
                }
            } catch (error) {
                alert("설문 조회에 실패했습니다.");
            }
        }
        if (token) {
            checkSurvey();
        } else {
            alert("로그인이 필요합니다.");
        }
    }, [token, goToSuggestion]);

    const handleGoToSuggestion = async () => {
        try {
            // selected 배열을 API 요구사항에 맞게 변환
            const data = {
                has_pet: selected.includes("반려동물"),
                has_child: selected.includes("아이"),
                has_student: selected.includes("학생"),
                has_elderly: selected.includes("노인"),
                notes: text
            };

            console.log("전송 데이터:", data);

            await axios.post("https://mytownfit.com/survey/submit", data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            goToSuggestion();
        } catch (error) {
            alert("설문 제출에 실패했습니다.");
            goToSuggestion();
        }
    };

    const handleSelect = (opt) => {
        setSelected(prev =>
            prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
        );
    };

    return (
        <div className="h-full bg-white flex flex-col gap-20 items-center justify-between">
            <SubTitle content="FIT팅 중 . . ."/>

            <SelectBox
                options={options}
                selected={selected}
                handleSelect={handleSelect}
            />

            <TextBox text={text} setText={setText} />

            <Button content="설문 제출하기" onClick={handleGoToSuggestion}/>
        </div>
    );
}

export default SurveySidebar;