import React from "react";
import { Outlet } from "react-router";
import SettingsSidebar from "./settings-sidebar";
import TravellerContextProvider from "@/lib/providers/travellers-context-provider";

function SettingsLayout() {
  return (
    <div className="container flex gap-6 mt-6 mb-12">
      <SettingsSidebar />
      <div className="flex-1">
        <TravellerContextProvider>
          <Outlet />
        </TravellerContextProvider>
      </div>
    </div>
  );
}

export default SettingsLayout;
