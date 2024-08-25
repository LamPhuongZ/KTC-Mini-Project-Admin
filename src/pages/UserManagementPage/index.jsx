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
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Page size
  const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination

  const getAccounts = async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await getAccountAllAPI(pageNo, pageSize, "desc");
      setAccounts(response);

      // Nếu số lượng bản ghi trả về ít hơn pageSize, nghĩa là trang cuối
      if (response.length < pageSize) {
        setTotalRecords(pageNo * pageSize + response.length); // Tính tổng số bản ghi
      } else {
        setTotalRecords((prevTotal) => prevTotal + response.length); // Cập nhật tổng số bản ghi tạm thời
      }
    } catch (error) {
      toast.error("Unable to get account list");
      throw error;
    }
  };

  useEffect(() => {
    getAccounts(page - 1, pageSize); // Fetch data based on current page and pageSize
  }, [page, pageSize]);

  // handle redirect to create account page
  const onNavigateToCreateAccount = () => {
    navigate("/user-management/create");
  };

  // handle delete account
  const onDeleteAccount = async (accountId) => {
    try {
      await deleteAccountAPI(accountId);
      toast.success("Account deleted successfully!");
      getAccounts(page - 1, pageSize); // Refresh the current page after deletion
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
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: "Date Create",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
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
    <div className="p-8 hidden md:block">
      <Fragment>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="flex justify-between items-center mb-4">
          <ButtonUI
            title="Add User"
            width="full md:w-1/5"
            onClick={onNavigateToCreateAccount}
          />
          <SearchForm
            placeholder="Search..."
            className="w-full md:w-auto mt-4 md:mt-0 ml-0 md:ml-4"
          />
        </div>
        <Table
          columns={columns}
          dataSource={accounts}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalRecords,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (newPage, newPageSize) => {
              setPage(newPage); // Update current page
              setPageSize(newPageSize); // Update page size
            },
          }}
          rowKey="id"
          className="custom-table"
          scroll={{ y: 400 }}
        />
      </Fragment>
    </div>
  );
}

export default UserManagementPage;
