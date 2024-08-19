import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

function Header() {
  const handleLogOut = () => {
    // Handle logout here
    localStorage.removeItem("accessToken");
  };

  const items = [
    {
      key: "1",
      label: (
        <li
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogOut}
        >
          Log out
        </li>
      ),
    },
  ];

  return (
    <header className="z-[999] relative">
      <div className="min-w-[100px] flex m-0 p-0 relative">
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Username
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
