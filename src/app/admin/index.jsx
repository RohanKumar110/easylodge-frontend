import Header from "@/components/layouts/header.layout";
import React from "react";
import { Outlet } from "react-router";

function AdminPage() {
  return (
    <>
      <Header showServiceList={false} />
      <main className="py-5">
        <Outlet />
      </main>
    </>
  );
}

export default AdminPage;
