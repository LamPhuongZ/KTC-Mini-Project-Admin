import { useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";

export function FeatureNotificationPage() {
  const [showNotification, setShowNotification] = useState(false);

  // Custom hook usage
  useWindowResize(890, null, setShowNotification);

  return (
    <>
      {showNotification && (
        <div className="bg-yellow-300 text-center text-black p-4">
          Tính năng đang phát triển
        </div>
      )}
    </>
  );
}
