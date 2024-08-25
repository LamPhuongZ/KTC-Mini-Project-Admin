import ButtonUI from "../../components/button";
import SearchForm from "../../components/SearchForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import {
  deleteAccountAPI,
  getAccountAllAPI,
} from "../../redux/services/accountAPI";

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
  const onNavigateToCreateAccount = () => {
    navigate("/user-management/create");
  };

  // handle delete account
  const onDeleteAccount = async (accountId) => {
    try {
      await deleteAccountAPI(accountId);
      toast.success("Account deleted successfully!");
      getAccounts();
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
      render: (text, record) => (
        <Space size="middle">
          <div className="flex items-center">
            <button
              onClick={() => onDeleteAccount(record.id)}
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
    <div className="p-8">
      <Fragment>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="flex justify-between items-center mb-4">
          <ButtonUI
            title="Add User"
            width={"20%"}
            onClick={onNavigateToCreateAccount}
          />
          <SearchForm placeholder="Search..." className="ml-4" />
        </div>
        <Table columns={columns} dataSource={accounts} />
      </Fragment>
    </div>
  );
}

export default UserManagementPage;
