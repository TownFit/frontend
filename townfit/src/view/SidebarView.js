import HomeSidebar from "../components/home/HomeSidebar"; // HomeSidebar 컴포넌트를 import합니다.
import SurveySidebar from "../components/survey/SurveySidebar";
import SuggestionSidebar from "../components/suggestion/SuggestionSidebar";
import pageState from "../stores/states";

function SidebarView() {
    const { page } = pageState();
    const pages = {
        home: <HomeSidebar />,
        survey: <SurveySidebar />,
        suggestion: <SuggestionSidebar />,
    }

    return (
        <div className="flex flex-col justify-center py-20 w-[450px] h-full">
            {pages[page]}
        </div>
    )
}

export default SidebarView;