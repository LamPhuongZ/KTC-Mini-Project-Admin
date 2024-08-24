import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import {
  deleteAccountAPI,
  getAccountAllAPI,
} from "../../redux/services/accountAPI";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function UserManagementPage() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const getAccounts = async () => {
    try {
      const response = await getAccountAllAPI();
      console.log(response);

      setAccounts(response);
    } catch (error) {
      toast.error("Unable to get account list");
      throw error;
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  // handle redirect to create account page
  const onNavigateToCrateAccount = () => {
    navigate("/user-management/create");
  };

  // Process to switch to information editing page
  const onNavigateToEditAccount = async (accountName) => {
    navigate(`/user-management/edit/${accountName}`);
  };

  // handle delete account
  const onDeleteAccount = async (accountName) => {
    try {
      // await deleteAccountAPI(accountName);
      // toast.success("Account deleted successfully!");
      // getAccounts();
    } catch (error) {
      toast.setError("Account deletion failed");
      throw error;
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Date Create",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <div className="flex items-center">
            <button
              onClick={onNavigateToEditAccount}
              className="text-green-500 text-2xl mr-4 hover:opacity-80 transition"
            >
              <EditOutlined />
            </button>
            <button
              onClick={onDeleteAccount()}
              className="text-red-500 text-2xl hover:opacity-80 transition"
            >
              <DeleteOutlined />
            </button>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <ButtonUI title="Add User" width={'20%'} onClick={onNavigateToCrateAccount} />
        <SearchForm placeholder="Search..." className="ml-4" />
      </div>
      <Table columns={columns} dataSource={accounts} />
    </Fragment>
  );
}

export default UserManagementPage;
