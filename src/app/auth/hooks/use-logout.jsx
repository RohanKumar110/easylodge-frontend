import API_CONFIG from "@/config/api.config";
import PATHS from "@/config/path.config";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import useMutation from "@/lib/hooks/useMutation";
import { useAuthContext } from "@/lib/providers/auth-context-provider";
import { removeLocalStorageItem } from "@/lib/store.manager";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useLogoutHandler() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const { mutate, isLoading } = useMutation(API_CONFIG.AUTH.LOGOUT, "POST");

  function logoutHandler() {
    mutate(null, {
      onSuccess: () => {
        removeLocalStorageItem(AUTH_TOKEN_KEY);
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          authenticatedUser: null,
        }));
        toast("Logout Successfully", {
          type: "success",
        });
        navigate(PATHS.LANDING, { replace: true });
      },
      onError: (error) => {
        toast("Could not Log out", {
          type: "error",
          description: `Error: ${error.message}`,
        });
      },
    });
  }

  return { logoutHandler, isLoading };
}

export default useLogoutHandler;
