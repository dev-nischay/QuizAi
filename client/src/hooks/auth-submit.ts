import { useState } from "react";
import type { loginInput } from "../components/auth/auth.types";

import type { ZodType } from "zod";

type Data = loginInput | Omit<loginInput, "username">;

export const useAuthSubmit = () => {
  const [fieldErrors, setFieldErrors] = useState({ usernameError: "", passwordError: "", emailError: "" });

  const validator = (data: Data, schema: ZodType) => {
    // emptying old errors
    setFieldErrors({ emailError: "", passwordError: "", usernameError: "" });
    console.log("validator ran");
    const result = schema.safeParse(data);

    if (!result.success) {
      // handle error
      const readableError = Object.fromEntries(
        result.error.issues.map((issue) => [issue.path.join(), issue.message]),
      ) as Data;

      console.log(readableError);
      // setting errros
      setFieldErrors({
        usernameError: readableError.username ?? "",
        passwordError: readableError.password ?? "",
        emailError: readableError.email ?? "",
      });
    }
  };

  return {
    validator,
    fieldErrors,
  };
};
