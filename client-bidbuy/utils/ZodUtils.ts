import toast from "react-hot-toast";
import { ZodError } from "zod";

export const toastZodErrors = (error: unknown) => {
  if (error instanceof ZodError) {
    Object.keys(error.flatten().fieldErrors).forEach((key) => {
      if (error instanceof ZodError) {
        const errors = error.flatten().fieldErrors[key];
        if (!!errors) {
          errors.forEach((e) => toast.error(`${key} : ${e}`));
        }
      }
    });
  }
};
