import HomeSidebar from "../components/home/HomeSidebar"; // HomeSidebar 컴포넌트를 import합니다.
import SurveySidebar from "../components/survey/SurveySidebar";

function SidebarView() {
    return (
        <div className="flex justify-center py-20 w-[450px] h-full bg-white">
            {/* <HomeSidebar /> */}
            <SurveySidebar/>
        </div>
    );
}

export default SidebarView;