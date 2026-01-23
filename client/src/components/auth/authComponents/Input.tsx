import type { InputProps } from "../auth.types";

export default function Input({ placeholder, id, className, ref }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-xs 2xl:text-sm text-gray-400  uppercase tracking-wider  font-semibold ">
        {id}
      </label>
      <input
        type="text"
        id={id}
        ref={ref}
        required
        placeholder={placeholder}
        className={`w-full  px-4 py-3 rounded-lg outline-none mt-1  ring-0 bg-black border border-emerald-900  placeholder:text-gray-500 focus:border-emerald-600 ${className}`}
      />
    </div>
  );
}
