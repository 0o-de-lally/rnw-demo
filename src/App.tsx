// Consolidated App and AppNavigator
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import CommunityWalletList from "./components/CommunityWalletList";
import { USE_HASH_ROUTER } from "./config/routerMode";
import Debug from "./components/Debug";
import Menu from "./components/Menu";

const basePath = import.meta.env.BASE_URL || "/";

export default function App() {
  return (
    <>
      {USE_HASH_ROUTER ? (
        <HashRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/community-wallets"
              element={<CommunityWalletList />}
            />
            <Route path="/details" element={<DetailsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter basename={basePath}>
          <Menu />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/community-wallets"
              element={<CommunityWalletList />}
            />
            <Route path="/details" element={<DetailsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </BrowserRouter>
      )}
      <Debug />
    </>
  );
}
