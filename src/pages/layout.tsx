import { Outlet } from "react-router"
import treeImage from "../images/tree.png";
import santaImage from "../images/santa.png";
import backgroundImage from "../images/background.png";

export default function Layout() {
    return (
      <div id="app" className="h-screen bg-red-100">
        <style>
          {`
          #app {
            background: url(${backgroundImage});
            background-repeat: repeat;
            background-size: 350px;
          }
          `}
        </style>

        <div className="absolute left-0 top-0 z-0 bg-cover bg-center w-64 rotate-[15deg] h-auto">
          <img src={treeImage} alt="Tree" />
        </div>

        <div className="absolute right-20 bottom-20 z-0 bg-cover bg-center w-64 rotate-[-15deg] h-auto">
          <img src={santaImage} alt="Santa" />
        </div>

        <div className="max-w-3xl mx-auto h-full">
          <Outlet />
        </div>

      </div>
    );
}