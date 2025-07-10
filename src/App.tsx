// Consolidated App and AppNavigator
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import { USE_HASH_ROUTER } from "./config/routerMode";

// Normalize basePath to remove trailing slash for Router basename
const basePath = (import.meta.env.BASE_URL || "/");
const RouterComponent = USE_HASH_ROUTER ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <RouterComponent basename={basePath}>

        <div style={{ position: "fixed", top: 0, left: 0, background: "#eee", zIndex: 9999, fontSize: 12, padding: 4 }}>
          <div>BASE_PATH: <b>{basePath}</b></div>
          <div>window.location.pathname: <b>{window.location.pathname}</b></div>
        </div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </RouterComponent>
  );
}
