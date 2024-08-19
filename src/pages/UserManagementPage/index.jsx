import { Fragment, useEffect, useState } from "react";
import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";
import { Space, Table } from "antd";
import { deleteAccountAPI, getAccountAllAPI } from "../../redux/services/accountAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserManagementPage() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const getAccounts = async () => {
    try {
      const response = await getAccountAllAPI();
      setAccounts(response.content);
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
      await deleteAccountAPI(accountName);
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
      dataIndex: "key",
      key: "key",
      // render: (_, __, index) => <a>{index + 1}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      // render: (_, { tags }) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button className="" onClick={onNavigateToEditAccount}>Edit</button>
          <button onClick={onDeleteAccount(event)}>Delete</button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <ButtonUI title="Add User" onClick={onNavigateToCrateAccount} />
        <SearchForm placeholder="Search..." className="ml-4" />
      </div>
      <Table columns={columns} dataSource={accounts} />
    </Fragment>
  );
}

export default UserManagementPage;
