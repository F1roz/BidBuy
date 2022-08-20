import React from "react";
import Layout from "../../Layout";
import UserList from "./users/UserList";

const AdminDashboard = () => {
  return (
    <Layout role="admin">
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <div>
        <UserList />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
