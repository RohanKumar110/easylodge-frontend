import React from "react";
import { Button } from "@/components/ui/button";
import { SERVICE_LIST } from "@/config/app.config";
import Icon from "../ui/icon";

function Header() {
  return (
    <header className="bg-brand py-2 ">
      <div className="container flex justify-between items-center">
        <div id="logo-wrapper">
          <a
            className="text-white font-bold text-2xl"
            href="#"
            aria-label="Go to Easylodge.in">
            Easylodge.in
          </a>
        </div>
        <div id="auth" className="flex gap-2 justify-center items-center">
          <Button className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/90">
            Register
          </Button>
          <Button className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/90">
            Login
          </Button>
        </div>
      </div>
      <div className="container flex gap-1">
        {SERVICE_LIST.map(
          (service) =>
            service.show && (
              <Button
                key={service.id}
                className={`bg-transparent shadow-none cursor-pointer rounded-full font-normal hover:bg-white/10 flex items-center justify-between gap-2 px-6 h-11 ${service.active && "border border-white bg-white/10"}`}>
                <Icon icon={service.icon} />
                {service.title}
              </Button>
            )
        )}
      </div>
    </header>
  );
}

export default Header;
