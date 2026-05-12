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
import { LinkWithIcon } from "./ui/link-with-icon";
import Icon from "./ui/icon";
import useLogoutHandler from "@/app/auth/hooks/use-logout";

function AccountMenu({ user }) {
  const { logoutHandler, isLoading } = useLogoutHandler();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-11 cursor-pointer border-2 border-white/20">
          <AvatarImage
            className="object-cover scale-125"
            src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`}
            alt={`Profile image for ${user.name}`}
          />
          <AvatarFallback className="bg-white text-primary font-semibold">
            {user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-57.5 py-3 px-2 border-border **:cursor-pointer">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 px-1">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`}
                alt={`Profile image for ${user.name}`}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 flex-1">
              <h4 className="text-sm font-medium max-w-37.5 truncate">
                {user.name}
              </h4>
              <p className="max-w-37.5 truncate text-muted-foreground text-xs">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-3" />
        <DropdownMenuItem>
          <Button asChild variant="ghost" className="w-full flex justify-start">
            <Link
              to={PATHS.PROFILE}
              className="flex items-center justify-start gap-2">
              <Icon icon="user" size={20} />
              <span>My Profile</span>
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkWithIcon
            icon="bookingHistory"
            variant="ghost"
            className="w-full flex justify-start"
            to={PATHS.BOOKING_HISTORY}>
            My Bookings
          </LinkWithIcon>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={logoutHandler}
            disabled={isLoading}
            variant="ghost"
            className="w-full flex justify-start">
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
