import { FOOTER_SECTION, SOCIAL_LINKS } from "@/config/app.config";
import dayjs from "dayjs";
import React from "react";
import Icon from "../ui/icon";

function Footer() {
  return (
    <div className="bg-secondary">
      <footer className="container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] py-4 gap-6">
          {FOOTER_SECTION.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold">{section.title}</h3>
              <ul className="flex flex-col gap-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="bg-brand">
        <div className="container flex flex-col flex-wrap items-center justify-center gap-4 p-4 mx-auto sm:flex-row sm:justify-between">
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                title={link.title}
                className="text-slate-100 hover:text-slate-300 transition-colors">
                <Icon icon={link.icon} size={18} />
              </a>
            ))}
          </div>
          <div>
            <p className="text-sm text-center text-white">
              Copyright &copy;{" "}
              {`${dayjs().year()} Easylodge.in™. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
