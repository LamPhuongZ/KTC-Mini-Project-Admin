import { useEffect } from "react";

export const useWindowResize = (
  thresholdWidth,
  collapseSidebarCallback,
  notificationCallback
) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Handle sidebar collapse
      if (collapseSidebarCallback) {
        collapseSidebarCallback(width < thresholdWidth);
      }
      // Handle feature notification display
      if (notificationCallback) {
        notificationCallback(width < 768);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check when the component renders

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [thresholdWidth, collapseSidebarCallback, notificationCallback]);
};
