import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/NotFound";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/home";
import WebsiteManager from "../pages/website-manager";

const AppRouting = () => {

  return (
    <Routes>

      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Private route start */}
      <Route path="/" element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/website-manager" element={<WebsiteManager />} />

        <Route path="/home" element={<Home />} />
      </Route>
      {/* Private route end */}

      {/* Public route start */}
      {/* <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route> */}
      {/* Public route end */}

      <Route path="/login" element={<Login />} />

      {/* Not found route start */}
      <Route path="*" element={<NotFound />} />
      {/* Not found route end */}
    </Routes>
  );
};

export default AppRouting;
