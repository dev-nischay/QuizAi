import { useState } from "react";
import type { ZodType } from "zod";

export const useFormSubmit = <T>() => {
  const [fieldErrors, setFieldErrors] = useState<T>();
  const [submitCount, setSubmitCount] = useState(0);
  const validator = (data: T, schema: ZodType) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      // handle error
      console.log(result.error.issues);
      let readableError = Object.fromEntries(
        result.error.issues.map((issue) => [issue.path.join(), issue.message]),
      ) as T;
      setFieldErrors(readableError);
      setSubmitCount((prev) => prev + 1);
      return false;
    }

    return true;
    // fetch
  };

  return {
    validator,
    fieldErrors,
    submitCount,
    setFieldErrors,
  };
};
