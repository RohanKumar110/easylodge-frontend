import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validators/auth-form-validator";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import { setLocalStorageItem } from "@/lib/store.manager";
import { useAuthContext } from "@/lib/providers/auth-context-provider";
import PATHS from "@/config/path.config";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";

function useSignInForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get(SEARCH_PARAMS_KEYS.NEXT_REDIRECT);
  const { setAuth, refetchCurrentUser } = useAuthContext();

  const { mutate, data, isLoading, error } = useMutation(
    API_CONFIG.AUTH.SIGN_IN,
    "POST"
  );

  const form = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSearchFormSubmit(formData) {
    mutate(formData, {
      onSuccess: async (res) => {
        toast("Signed in successfully", {
          type: "success",
        });
        setLocalStorageItem(AUTH_TOKEN_KEY, res.data.accessToken);
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
        }));
        await refetchCurrentUser();
        console.log()
        navigate(next || PATHS.LANDING, {
          replace: true,
        });
      },
      onError: (err) => {
        toast("Error:", {
          description: err.message,
          type: "error",
        });
      },
    });
  }

  return { form, data, isLoading, error, handleSearchFormSubmit };
}

export default useSignInForm;
