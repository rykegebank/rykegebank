import { useState, useEffect } from "react";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";

// Custom hook to handle permission requests
const usePermission = (permission) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getPermissionStatus = async () => {
      // Check the current permission status
      const currentStatus = await check(permission);
      setStatus(currentStatus);
    };

    getPermissionStatus();
  }, [permission]);

  const requestPermission = async () => {
    try {
      // Request permission
      const result = await request(permission);
      setStatus(result);
      return result !== "denied";
    } catch (error) {
      console.error("Permission request failed:", error);
      return false; // return DENIED as fallback
    }
  };

  return { status, requestPermission };
};

export default usePermission;