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

    // 1. 마운트 시 GET API 호출
    useEffect(() => {
        async function checkSurvey() {
            try {
                const res = await axios.get("https://mytownfit.com/survey/has-history");
                if (res.data === true || res.data.has_history === true) {
                    goToSuggestion();
                } else {
                    alert("history가 없습니다.")
                }
            } catch (error) {
                alert("설문 조회에 실패했습니다.");
            }
        }
        checkSurvey();
    }, []);

    const handleGoToSuggestion = async () => {
        try {
            // 1. API로 데이터 전송
            await axios.post("https://mytownfit.com/survey/submit", {
                selected,
                text
            });
            // 2. 성공 시 페이지 이동 등 추가 동작
            goToSuggestion();
        } catch (error) {
            alert("설문 제출에 실패했습니다.");
            // 필요시 에러 처리
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