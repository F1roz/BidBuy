import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAuthenticatedFetch from "../../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../../service";
import { IUser } from "../../../../types";
import Layout from "../../../Layout";

export default function UserList() {
  const { tokenRefreshed, user } = useAuth();
  const {
    data: userList,
    isLoading: isUserLoading,
    isError,
    isSuccess,
    refetch,
    setData,
  } = useAuthenticatedFetch<IUser[]>(`user/`, [tokenRefreshed, user]);
  const handleDelete = (id: number) => {
    toast.promise(
      jsxService()
        .delete(`user/delete?id=${id}`)
        .then(() => {
          refetch();
        })
        .catch(console.error),
      {
        error: "Error deleting user",
        loading: "Deleting user...",
        success: "Deleted",
      }
    );
  };

  return (
    <Layout role="admin">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-7 p-8">
        <div className="flex justify-between items-center pb-4 bg-white">
          <div></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Username
                <div className="font-normal text-gray-500">Email</div>
              </th>

              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Nid
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!!userList &&
              userList.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap"
                  >
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.username}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="py-4 px-6">{user.kyc?.name}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{user.kyc?.address}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{user.kyc?.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{user.kyc?.number}</div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isUserLoading && <p>Loading Users Data...</p>}
        {isError && <p>Error Loading Users Data</p>}
      </div>
    </Layout>
  );
}
