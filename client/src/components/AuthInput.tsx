function AuthInput({
  label,
  name,
  type,
  isError = false,
  errorMessage = "",
  mb = "2",
}: {
  label: string;
  name: string;
  type: string;
  isError?: boolean;
  errorMessage?: string;
  mb?: string;
}) {
  const borderStyle = isError
    ? "border-error"
    : "border-border hover:border-primary focus:border-primary dark:border-dark-border";

  return (
    <div className={`mb-${mb}`}>
      <label htmlFor={name} className="mb-1 block">
        {label}{" "}
        <span className="text-sm text-error">{isError && errorMessage}</span>
      </label>
      <input
        name={name}
        className={`mb-2 w-full border-2 p-2 outline-none dark:text-copy ${borderStyle}`}
        type={type}
      />
    </div>
  );
}
export default AuthInput;
