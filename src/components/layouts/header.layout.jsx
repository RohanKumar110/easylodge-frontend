import React from "react";
import { Button } from "@/components/ui/button";
import { SERVICE_LIST } from "@/config/app.config";
import Icon from "../ui/icon";
import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-brand py-2 ">
      <div className="container flex justify-between items-center">
        <div id="logo-wrapper">
          <Link
            className="text-white font-bold text-2xl"
            to="/"
            aria-label="Go to Easylodge.in">
            Easylodge.in
          </Link>
        </div>
        <div id="auth" className="flex gap-2 justify-center items-center">
          <Button
            className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/90"
            asChild>
            <Link to="/signup" aria-label="Go to Sign Up Page">
              Register
            </Link>
          </Button>
          <Button
            className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/90"
            asChild>
            <Link to="/signin" aria-label="Go to Sign In Page">
              Login
            </Link>
          </Button>
        </div>
      </div>
      <div className="container flex gap-1 overflow-x-auto scrollbar">
        {SERVICE_LIST.map(
          (service) =>
            service.show && (
              <Button
                asChild
                key={service.id}
                className={`bg-transparent shadow-none cursor-pointer rounded-full font-normal hover:bg-white/10 flex items-center justify-between gap-2 px-6 h-11 ${service.active && "border border-white bg-white/10"}`}>
                <Link to="/">
                  <Icon icon={service.icon} />
                  {service.title}
                </Link>
              </Button>
            )
        )}
      </div>
    </header>
  );
}

export default Header;
