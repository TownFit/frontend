import React from "react";
import HomeSidebar from "../components/home/HomeSidebar"; // HomeSidebar 컴포넌트를 import합니다.

function SidebarView() {
    return (
        <div className="py-20" style={{ width: "400px", backgroundColor: "#FFFFFF" }}>
            <HomeSidebar />
        </div>
    );
}

export default SidebarView;