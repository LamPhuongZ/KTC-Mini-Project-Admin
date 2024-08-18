import { Fragment} from "react";
import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";

function UserManagementPage() {
  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <ButtonUI title="Add User" />
        <SearchForm placeholder="Search..." className="ml-4" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th scope="col" className="px-4 py-2">
                #
              </th>
              <th scope="col" className="px-4 py-2">
                Full Name
              </th>
              <th scope="col" className="px-4 py-2">
                Email
              </th>
              <th scope="col" className="px-4 py-2">
                Password
              </th>
              <th scope="col" className="px-4 py-2">
                Phone
              </th>
              <th scope="col" className="px-4 py-2">
                Role
              </th>
              <th scope="col" className="px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default UserManagementPage;
