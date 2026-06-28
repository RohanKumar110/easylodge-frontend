import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PATHS from "@/config/path.config";
import Icon from "./ui/icon";
import useLogoutHandler from "@/app/auth/hooks/useLogoutHandler";
import { getDefaultProfile, isAdmin } from "@/lib/utils";

function AccountMenu({ user }) {
  const { logoutHandler, isLoading } = useLogoutHandler();

  if (!user) return null;

  const userName = user.name || "User";
  const userEmail = user.email || "";
  const avatarUrl =
    user.profilePicture || getDefaultProfile(userName.charAt(0));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-2 cursor-pointer size-11 border-white/20">
          <AvatarImage
            className="object-cover scale-125"
            src={avatarUrl}
            alt={`Profile image for ${userName}`}
          />
          <AvatarFallback className="font-semibold bg-white text-primary">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-57.5 px-2 py-3 border-border **:cursor-pointer">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 px-1">
            <Avatar>
              <AvatarImage
                src={avatarUrl}
                alt={`Profile image for ${userName}`}
              />
              <AvatarFallback>
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1 gap-0.5">
              <h4 className="text-sm font-medium max-w-37.5 truncate">
                {userName}
              </h4>
              <p className="text-xs truncate max-w-37.5 text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-3" />

        <DropdownMenuItem asChild>
          <Link
            to={PATHS.SETTINGS.PROFILE}
            className="flex items-center justify-start w-full gap-2 px-2 py-1.5">
            <Icon icon="user" size={20} />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to={PATHS.SETTINGS.BOOKING_HISTORY}
            className="flex items-center justify-start w-full gap-2 px-2 py-1.5">
            <Icon icon="bookingHistory" size={20} />
            <span>My Bookings</span>
          </Link>
        </DropdownMenuItem>

        {isAdmin(user) && (
          <DropdownMenuItem asChild>
            <Link
              to={PATHS.ADMIN.ROOT}
              className="flex items-center justify-start w-full gap-2 px-2 py-1.5">
              <Icon icon="dashboard" size={20} />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Button
            onClick={logoutHandler}
            disabled={isLoading}
            variant="ghost"
            className="flex justify-start w-full">
            <div className="flex items-center justify-start gap-2">
              <Icon icon="logout" size={20} />
              <span>Logout</span>
            </div>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountMenu;
