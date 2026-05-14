import Search from "@/features/search";
import React from "react";
import { Outlet } from "react-router";

function WithSearchLayout() {
  return (
    <div>
      <div className="bg-linear-to-b from-brand from-50% to-transparent to-50%">
        <Search />
      </div>
      <Outlet />
    </div>
  );
}

export default WithSearchLayout;
