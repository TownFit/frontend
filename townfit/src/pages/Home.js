import React from "react";
import MapView from "../components/MapView";
import SideBar from "../components/SideBar";

function Home() {
  return (
    <div className="flex flex-row-reverse w-full h-screen">
      <SideBar />
      <div className="flex-grow">
        <MapView />
      </div>
    </div>
  );
}
export default Home;