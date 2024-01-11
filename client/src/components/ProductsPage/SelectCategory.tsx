import { useEffect, useRef, useState } from "react";

const SelectCategory = ({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (s: string) => void;
  categories: string[];
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
        className="w-[165px] rounded-md border-2 border-border bg-foreground py-1 text-copy dark:border-dark-border dark:bg-transparent dark:text-border"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select category"}
      </button>
      <div
        className={`${
          isOpen ? "top-[120%] opacity-100" : "invisible top-1/2 opacity-0"
        } r absolute z-10 w-full rounded-md border-2 border-border bg-foreground transition-all duration-300 dark:border-dark-border dark:bg-dark-foreground dark:text-border`}
      >
        <button
          className="block w-full cursor-pointer p-1.5 text-left hover:bg-border dark:hover:bg-dark-border"
          onClick={() => onChange("")}
        >
          all
        </button>
        {categories.map((category) => (
          <button
            onClick={() => onChange(category)}
            className="block w-full p-1.5 text-left hover:bg-border dark:hover:bg-dark-border"
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
