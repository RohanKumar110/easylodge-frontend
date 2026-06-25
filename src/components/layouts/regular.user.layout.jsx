import React from "react";
import Header from "./header.layout";
import { Outlet } from "react-router";
import Footer from "./footer.layout";

function RegularUserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RegularUserLayout;
