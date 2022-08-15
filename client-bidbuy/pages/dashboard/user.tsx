import React, { useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { IUser } from "../../types";
import DashboardLayout from "../../components/Layout/Dashboard";
import { makeId } from "../../utils/String";
import UserList from "../../components/Dashboard/User/UserList";

const tabNames = ["Overview", "User List", "Upcoming Flights", "Flight List"];
interface Props {
  users: IUser[];
  tab: string;
  hasError: boolean;
}

// export default user;
const UserDashboard: NextPage<Props> = ({ users, tab, hasError = false }) => {

  useEffect(() => {
    console.log("useEffect");
  }, []);
  if (hasError) return <div>Error</div>;
  return (
    <DashboardLayout
      currentTab={tab}
      tabs={tabNames}
      elements={[<UserList key={2} users={users} />]}
    />
  );
};
export default UserDashboard;
