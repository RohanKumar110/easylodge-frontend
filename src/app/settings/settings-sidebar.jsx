import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import PATHS from "@/config/path.config";
import { useAuthContext } from "@/lib/providers/auth-context-provider";
import { cn, getDefaultProfile } from "@/lib/utils";
import React from "react";
import { NavLink } from "react-router";
import useLogoutHandler from "../auth/hooks/useLogoutHandler";

function SettingsSidebar() {
  const { authenticatedUser: user } = useAuthContext();

  const { logoutHandler, isLoading } = useLogoutHandler();

  const avatarUrl =
    user?.profilePicture || getDefaultProfile(user?.userName.charAt(0));

  return (
    <aside className="sticky w-full px-4 py-6 shadow-md rounded-xl top-6 basis-72 shrink-0 h-max">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Avatar className="cursor-pointer size-24">
            <AvatarImage
              loading="lazy"
              src={avatarUrl}
              width={36}
              height={36}
            />
            <AvatarFallback>
              {user?.name && user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            className="absolute w-6 h-6 p-1 rounded-full bottom-1 right-1">
            <Icon icon="pen" size="12" />
          </Button>
        </div>

        <h3 className="text-lg font-bold truncate max-w-64">{user?.name}</h3>
        <Separator className="my-4" />

        <div className="space-y-1 w-full">
          <NavLink
            to={PATHS.SETTINGS.PROFILE}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2",
                }),
                isActive && "bg-primary/10 text-primary pointer-events-none"
              )
            }>
            <Icon size="18" icon="user" />
            Profile
          </NavLink>

          <NavLink
            to={PATHS.SETTINGS.BOOKING_HISTORY}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2",
                }),
                isActive && "bg-primary/10 text-primary pointer-events-none"
              )
            }>
            <Icon size="18" icon="bookingHistory" />
            Bookings History
          </NavLink>

          <NavLink
            to={PATHS.SETTINGS.TRAVELLERS_MANAGEMENT}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start gap-2",
                }),
                isActive && "bg-primary/10 text-primary pointer-events-none"
              )
            }>
            <Icon size="18" icon="travellers" />
            Co-Travelers
          </NavLink>

          <Button
            disabled={isLoading}
            onClick={logoutHandler}
            className={"w-full justify-center my-3 cursor-pointer"}
            variant={"outline"}>
            <Icon size="18" icon="logout" />
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default SettingsSidebar;
