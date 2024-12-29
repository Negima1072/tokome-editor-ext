import { useEffect, useState } from "react";

export const useLocation = () => {
  const [currentHref, setCurrentHref] = useState(window.location.href);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentHref(window.location.href);
    };

    const originalPushState = history.pushState;
    history.pushState = function (
      data: unknown,
      ununsed: string,
      url?: string | URL | null
    ) {
      originalPushState.apply(this, [data, ununsed, url]);
      handleLocationChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function (
      data: unknown,
      ununsed: string,
      url?: string | URL | null
    ) {
      originalReplaceState.apply(this, [data, ununsed, url]);
      handleLocationChange();
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return currentHref;
};
