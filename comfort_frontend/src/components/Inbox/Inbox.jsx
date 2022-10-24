import React, { useEffect } from "react";

import { useAdminContext } from "../../context/AdminProvider";

import { useReport } from "../../context/ReportProvider";

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
