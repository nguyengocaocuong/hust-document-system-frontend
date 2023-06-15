import React from "react";
import { useSelector } from "react-redux";
import AdminModal from "./AdminModal";
import UserModal from "./UserModal";
function Modal() {
  const { user } = useSelector((state) => state.authentication);
  return user.roleType === "ADMIN" ? <AdminModal /> : <UserModal />;
}

export default Modal;
