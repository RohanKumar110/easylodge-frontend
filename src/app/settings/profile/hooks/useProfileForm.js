import API_CONFIG from "@/config/api.config";
import useMutation from "@/lib/hooks/useMutation";
import { useAuthContext } from "@/lib/providers/auth-context-provider";
import { editProfileSchema } from "@/lib/validators/edit-profile-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function useProfileForm() {
  const { mutate, isLoading } = useMutation(API_CONFIG.USER.PROFILE, "PATCH");
  const { authenticatedUser: user, setAuth } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      dateOfBirth: user?.dateOfBirth
        ? dayjs(user.dateOfBirth).format("YYYYMMDD")
        : "",
      gender: user?.gender ?? undefined,
      contactNumber: user?.contactNumber ?? "",
      profilePicture: user?.profilePicture ?? "",
    },
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user.name ?? "",
      email: user.email ?? "",
      dateOfBirth: user.dateOfBirth
        ? dayjs(user.dateOfBirth).format("YYYYMMDD")
        : undefined,
      gender: user.gender ?? undefined,
      contactNumber: user.contactNumber ?? "",
      profilePicture: user.profilePicture ?? "",
    });
  }, [user]);

  async function updateProfileHandler(data) {
    await mutate(data, {
      onSuccess: () => {
        setAuth((prev) => ({
          ...prev,
          authenticatedUser: { ...prev.authenticatedUser, ...data },
        }));
        toast("Profile updated successfully", { type: "success" });
      },
      onError: (error) => {
        toast("Error: " + (err.status || ""), {
          description: err.message,
          type: "error",
        });
      },
    });
  }

  return { form, updateProfileHandler, isLoading };
}

export default useProfileForm;
