import { useEffect, useState } from "react";
import type { InputProps } from "../auth.types";

export default function Input({ placeholder, id, errCounter, className, ref, error, ...props }: InputProps) {
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (String(error)?.length > 5) {
      setShouldShake(true);
      const timer = setTimeout(() => {
        setShouldShake(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [errCounter]);

  const hasError = String(error)?.length > 5;

  return (
    <div className="relative">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
      <label htmlFor={id} className="text-xs 2xl:text-sm text-gray-400  uppercase tracking-wider     font-semibold ">
        {id}
      </label>
      <input
        type="text"
        id={id}
        ref={ref}
        {...props}
        placeholder={placeholder}
        className={`w-full  px-4 py-3 rounded-lg outline-none mt-1  ring-0 bg-black border   placeholder:text-gray-500 transition-all  ${className}  ${hasError ? "border-red-700 hover:none  focus:none" : "border-emerald-950  focus:border-emerald-700 hover:border-emerald-700"}  ${shouldShake ? "shake-animation" : ""}`}
      />
      {hasError && (
        <div
          key={errCounter}
          className={`absolute p-1 right-2 text-sm mt-1 font-sans text-red-300 ${shouldShake ? "shake-animation" : ""}`}
        >
          {error}
        </div>
      )}
    </div>
  );
}
