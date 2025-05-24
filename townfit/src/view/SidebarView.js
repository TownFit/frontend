import HomeSidebar from "../components/home/HomeSidebar"; // HomeSidebar 컴포넌트를 import합니다.
import SurveySidebar from "../components/survey/SurveySidebar";
import SuggestionSidebar from "../components/suggestion/SuggestionSidebar";
import pageState from "../stores/states";

function SidebarView() {
    const { page } = pageState();

    if (page === "home") {
        return (
            <div className="flex flex-col justify-center py-20 w-[450px] h-full">
                <HomeSidebar />
            </div>
        );
    } else if (page === "survey") {
        return (
            <div className="flex flex-col justify-center py-20 w-[450px] h-full">
                <SurveySidebar />
            </div>
        );
    } else if (page === "suggestion") {
        return (
            <div className="flex flex-col justify-center py-20 w-[450px] h-full">
                <SuggestionSidebar />
            </div>
        );
    }
}

export default SidebarView;