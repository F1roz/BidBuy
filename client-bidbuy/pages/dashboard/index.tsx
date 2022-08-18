import { useRouter } from "next/router";
import React from "react";
import AdminDashboard from "../../components/Dashboards/AdminDashboard";
import UserDashboard from "../../components/Dashboards/UserDashboard";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  if (user === null) router.replace(`/auth/login`); // null means error, redirect to login
  if (!user) return <h1>Loading....</h1>; // undefined means loading current-user
  if (user.roles.includes("admin")) return <AdminDashboard />;
  if (user.roles.includes("user")) return <UserDashboard />;
  router.replace(`/auth/login`);
};

export default Dashboard;
