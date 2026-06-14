import React from "react";
import { Outlet } from "react-router";
import SettingsSidebar from "./settings-sidebar";

function SettingsLayout() {
  return (
    <div className="container flex gap-6 mt-6 mb-12">
      <SettingsSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;
