import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validators/auth-form-validator";

function useSignInForm() {
  const navigate = useNavigate();

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

  async function handleSignInFormSubmit(data) {
    mutate(data, {
      onSuccess: (res) => {
        toast("Signed in successfully", {
          type: "success",
          position: "bottom-center",
        });
        navigate("/", { replace: true });
      },
      onError: (err) => {},
    });
  }

  return { form, data, isLoading, error, handleSignInFormSubmit };
}

export default useSignInForm;
