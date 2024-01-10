import { useState } from "react";

function SubmitButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onClickWithLoading = () => {
    setIsLoading(true);
    onClick!();
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={onClick && onClickWithLoading}
      className={`${
        isLoading ? "bg-primary-dark" : "bg-primary hover:bg-primary-dark"
      } mx-auto flex w-full items-center justify-center gap-4 py-2 font-bold text-dark-copy ${className}`}
    >
      <span className={isLoading ? "ml-4" : ""}>Submit</span>
      {isLoading && <Spinner />}
    </button>
  );
}

const Spinner = () => {
  return (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default SubmitButton;
