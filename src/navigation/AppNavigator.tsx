import React from "react";

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { USE_HASH_ROUTER } from "../config/routerMode";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

const basePath = import.meta.env.BASE_URL || "/";

const RouterComponent = USE_HASH_ROUTER ? HashRouter : BrowserRouter;

const AppNavigator: React.FC = () => (
  <RouterComponent basename={basePath}>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/details" element={<DetailsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </RouterComponent>
);

export default AppNavigator;
