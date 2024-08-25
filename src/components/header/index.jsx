import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeAPI } from "../../redux/services/accountAPI";
import { logOut } from "../../redux/slices/userAdminSlice";

function Header() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async () => {
      const response = await getMeAPI();
      setUser(response);
    };
    getMe();
  }, []);

  const { token } = useSelector((state) => state.userReducer);
  const handleLogOut = () => {
    dispatch(logOut());
  };

  const items = [
    {
      key: "1",
      label: (
        <ul>
          <li
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={handleLogOut}
          >
            Log out
          </li>
        </ul>
      ),
    },
  ];

  return (
    <header className="z-[999] relative">
      <div className="min-w-[100px] flex m-0 p-0 relative">
        {token && (
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {user.name}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
    </header>
  );
}

export default Header;
