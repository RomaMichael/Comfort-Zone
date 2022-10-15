import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminProvider";
import { useAuthContext } from "../../context/AuthProvider";
import { useReport } from "../../context/ReportProvider";
import { useUsers } from "../../context/UsersProvider";
import { AiFillCloseCircle } from "react-icons/ai";

import "./Inbox.css";
import AdminInbox from "./AdminInbox/AdminInbox";
import UserInbox from "./UserInbox/UserInbox";

export default function Inbox() {
  const { getReports } = useReport();
  const { adminAuth } = useAdminContext();

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="inbox-page">
      <div className="inbox-container">
        {adminAuth ? (
          <div>
            <AdminInbox />
          </div>
        ) : (
          <div>
            <UserInbox />
          </div>
        )}
      </div>
    </div>
  );
}
