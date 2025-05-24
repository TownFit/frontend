import SubTitle from "../common/SubTitle";
import DescriptionBox from "./DescriptionBox";
import Button from "../common/Button";
import pageState from "../../stores/states";

function SuggestionSidebar() {

    const { goToHome } = pageState();
    const handleGoToHome = () => {
        goToHome();
    };

    return (
        <div className="flex flex-col items-center justify-between gap-20 h-full">
            <SubTitle content="원천동" />

            <DescriptionBox />

            <Button content="추천 동네 부동산 보기! 👀" onClick={handleGoToHome} />
        </div>
    )
}
export default SuggestionSidebar;