import { useEffect, useRef, useState } from "react";

const SortBy = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (s: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOnClick = (e: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOnClick);

    return () => window.removeEventListener("click", handleOnClick);
  }, []);

  return (
    <div className="relative">
      <button
        className="w-[120px] rounded-md border-2 border-border bg-foreground py-1 text-copy dark:border-dark-border dark:bg-transparent dark:text-border"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "sort by"}
      </button>
      <div
        className={`${
          isOpen ? "top-[120%] opacity-100" : "invisible top-3/4 opacity-0"
        } r absolute z-10 w-full rounded-md border-2 border-border bg-foreground transition-all duration-300 dark:border-dark-border dark:bg-dark-foreground dark:text-border`}
      >
        {["default", "price low", "price high"].map((i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className="block w-full cursor-pointer p-1.5 text-left hover:bg-border dark:hover:bg-dark-border"
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBy;
