import './App.css';
import MapView from './view/MapView';
import SidebarView from './view/SidebarView';

function App() {
  return (
    <div className="flex flex-row-reverse w-full h-screen">
      <SidebarView />
      <div className="flex-grow">
        <MapView />
      </div>
    </div>
  );
}

export default App;
