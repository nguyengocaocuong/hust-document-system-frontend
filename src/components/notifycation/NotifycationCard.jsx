import React from "react";

import SharedNofifycation from "./SharedNofifycation";
import ApproveNofifycation from "./ApproveNofifycation";
import LoadingNotifycation from "./LoadingNotifycation";

const NotificationCard = ({ notification }) => {
  return notification.type === "SHARED" ? (
    <SharedNofifycation notification={notification} />
  ) : notification.type === "APPROVE" ? (
    <ApproveNofifycation notifycation={notification} />
  ) : (
    <LoadingNotifycation notifycation={notification} />
  );
};

export default NotificationCard;
