import HomeSidebar from "../components/home/HomeSidebar"; // HomeSidebar 컴포넌트를 import합니다.
import SurveySidebar from "../components/survey/SurveySidebar";
import SuggestionSidebar from "../components/suggestion/SuggestionSidebar";

function SidebarView() {
    return (
        <div className="flex flex-col justify-center py-20 w-[450px] h-full">
            <HomeSidebar />
            {/* <SurveySidebar/> */}
            {/* <SuggestionSidebar /> */}
        </div>
    );
}

export default SidebarView;