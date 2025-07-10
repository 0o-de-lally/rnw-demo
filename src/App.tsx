// Consolidated App and AppNavigator
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import { USE_HASH_ROUTER } from "./config/routerMode";

const basePath = import.meta.env.BASE_URL || "/";
const RouterComponent = USE_HASH_ROUTER ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <RouterComponent basename={basePath}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </RouterComponent>
  );
}
