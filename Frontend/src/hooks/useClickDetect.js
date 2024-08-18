import { useEffect, useRef } from "react";

function useClickDetect(handleFn) {
  const ref = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handleFn();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [handleFn]
  );
  return ref;
}

export default useClickDetect;
