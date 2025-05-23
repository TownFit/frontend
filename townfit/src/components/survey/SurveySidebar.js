import Button from "../common/Button";
import SubTitle from "../common/SubTitle";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { useState } from "react";

function SurveySidebar() {

    const [selected, setSelected] = useState([]);
    const [text, setText] = useState("");
    const options = ["반려동물", "아이", "학생", "노인"];

    const handleSelect = (opt) => {
        setSelected(prev =>
            prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
        );
    };

    return (
        <div className="w-full max-w-xs bg-white flex flex-col gap-20 text-center justify-center">
            <SubTitle />

            <SelectBox
                options={options}
                selected={selected}
                handleSelect={handleSelect}
            />

            <TextBox text={text} setText={setText} />

            <Button content="제출하기" />
        </div>
    );
}

export default SurveySidebar;