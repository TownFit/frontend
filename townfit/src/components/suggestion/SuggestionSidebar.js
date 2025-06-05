import SubTitle from "../common/SubTitle";
import DescriptionBox from "./DescriptionBox";
import Button from "../common/Button";
import pageState from "../../stores/pageState";
import locationState from "../../stores/locationState";

function SuggestionSidebar() {

    const { goToSurvey } = pageState();
    const { location } = locationState();
    const handleGoToHome = () => {
        const lat = location[0].lat;
        const lng = location[0].lng;
        const zoomLevel = 13;
        const aValue = "IA01";

        window.open(`https://isale.land.naver.com/iSale/Map/#?SYMap=${lat},${lng},${zoomLevel}&a=${aValue}`, "_blank");
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