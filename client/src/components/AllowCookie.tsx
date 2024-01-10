import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function AllowCookie() {
  const [isHidden, setIsHidden] = useState(
    JSON.parse(localStorage.getItem("isCookieAllowed") || "false"),
  );

  const handleClose = () => {
    localStorage.setItem("isCookieAllowed", JSON.stringify(true));
    setIsHidden(true);
  };

  return (
    <div
      className={`${
        isHidden ? "hidden" : ""
      } absolute left-0 top-0 z-50 flex min-h-[70px] items-start bg-secondary px-4 py-2 text-dark-copy`}
    >
      <p className="px-2">
        If you're using this site, you're allowing the use of cookies. Cookies
        are small text files that are stored on your device to enhance your
        browsing experience. By continuing to use this site, you consent to the
        use of cookies
      </p>
      <button onClick={handleClose} className="cursor-pointer">
        <XMarkIcon className="h-8 w-8" />
      </button>
    </div>
  );
}
export default AllowCookie;
