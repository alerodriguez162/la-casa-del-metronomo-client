import { NotificationManager } from "react-notifications";

const createNotification = (type, title, message) => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info(message, title);
        break;
      case "success":
        NotificationManager.success(message, title);
        break;
      case "warning":
        NotificationManager.warning(message, title);
        break;
      case "error":
        NotificationManager.error(message, title);
        break;
      default:
    }
  };
};

export default createNotification;
