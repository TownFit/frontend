import React from "react";
import MapView from "../../components/MapView";
import SideBarView from "../../components/SideBarView";

function Home() {
  return (
    <div className="flex flex-row-reverse w-full h-screen">
      <SideBarView />
      <div className="flex-grow">
        <MapView />
      </div>
    </div>
  );
}
export default Home;