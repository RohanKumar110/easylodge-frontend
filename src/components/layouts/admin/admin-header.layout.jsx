import AccountMenu from "@/components/account-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthContext } from "@/lib/providers/auth-context-provider";

const AdminHeader = () => {
  const { authenticatedUser } = useAuthContext();

  return (
    <header className="sticky top-0 z-10 flex items-center border-b h-14 bg-background">
      <div className="container px-4 flex items-center justify-between">
        <SidebarTrigger className={"cursor-pointer"} />
        <AccountMenu user={authenticatedUser} />
      </div>
    </header>
  );
};

export { AdminHeader };
