import Header from "@/components/layouts/header.layout";
import React from "react";
import { Outlet } from "react-router";

function AdminPage() {
  return (
    <>
      <Header showServiceList={false} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminPage;
