import React, { useState } from "react";
import { IUser } from "../../../types";
import { randomBetween } from "../../../utils/Number";
import { useRouter } from "next/router";



const UserList = ({ users }: { users: IUser[] }) => {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(
    typeof router.query.page == "string" ? parseInt(router.query.page) : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    typeof router.query.show == "string" ? parseInt(router.query.show) : 10
  );

  const handlePageNoChange = (page: number) => {
    setPageNo(page);
    router.push({ query: { ...router.query, page } });
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setPageNo(1);
    router.push({
      query: { ...router.query, show: e.target.value, page: 1 },
    });
  };

  const verifiedPieData = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        label: "# of Verified Users",
        
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const ROLES = ["Admin", "User", "Manager", "FlightManager"];
  const rolePieData = {
    labels: ROLES,
    datasets: [
      {
        label: "# of role based users",
       
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between items-center">
          <h1 className="text-5xl font-bold m-3" id="users">
            Users
          </h1>
          <div>
            <label>Items per page : </label>
            <select
              className="focus:outline-none w-20 text-center border-2 p-1 rounded"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <table className="border-2 text-center">
          <thead>
            <tr>
              <th className="p-2 border-2">Id</th>
              <th className="p-2 border-2">Name</th>
              <th className="p-2 border-2">Username</th>
              <th className="p-2 border-2">Email</th>
              <th className="p-2 border-2">Phone</th>
              <th className="p-2 border-2">Date Of Birth</th>
              <th className="p-2 border-2">Address</th>
              <th className="p-2 border-2">City</th>
              <th className="p-2 border-2">Role</th>
              <th className="p-2 border-2">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (_, index) =>
                  index > (pageNo - 1) * itemsPerPage &&
                  index <= pageNo * itemsPerPage
              )
              .map((user) => (
                <tr key={user.Id}>
                  <td className="p-2 border-2">{user.Id}</td>
                  <td className="p-2 border-2">{user.Username}</td>
                  <td className="p-2 border-2">{user.Email}</td>
                  <td className="p-2 border-2">{user.Type}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div id="pagination" className="m-4 flex"></div>
      </div>
    </div>
  );
};

export default UserList;
