import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validators/auth-form-validator";

function useSignUpForm() {
  const navigate = useNavigate();

  const { mutate, data, isLoading, error } = useMutation(
    API_CONFIG.AUTH.SIGN_UP,
    "POST"
  );

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUpFormSubmit(data) {
    mutate(data, {
      onSuccess: (res) => {
        toast("Account created successfully", {
          description: "Use your credentials to Sign In!",
          type: "success",
          position: "bottom-center",
        });
        navigate("/signin", { replace: true });
      },
      onError: (err) => {},
    });
  }

  return { form, data, isLoading, error, handleSignUpFormSubmit };
}

export default useSignUpForm;
