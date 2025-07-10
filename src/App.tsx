// Consolidated App and AppNavigator
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import { USE_HASH_ROUTER } from "./config/routerMode";
import Debug from "./components/Debug";

const basePath = import.meta.env.BASE_URL || "/";

export default function App() {
  return (
    <>
      {USE_HASH_ROUTER ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/details" element={<DetailsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/details" element={<DetailsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </BrowserRouter>
      )}
      <Debug />
    </>
  );
}
