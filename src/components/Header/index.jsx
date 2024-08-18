function Header() {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleToggle = () => setIsOpen(!isOpen);

  // const handleLogOut = () => {
  //   // Handle logout logic here
  //   localStorage.removeItem("accessToken");
  // };

  return (
    <header className="z-[999] relative">
      <div className="min-w-[100px] flex m-0 p-0 relative">
        <button
          // onClick={handleToggle}
          className="color-inherit bg-transparent border-0 flex items-center hover:text-orange-500"
        >
          <p className="text-center pt-3 min-w-[100px] flex items-center">
            <span className="text-gray-500 text-[23px] mr-1.5 transition-all duration-300">
              <i className="fa fa-user-circle"></i>
            </span>
            Username
          </p>
        </button>

        {/* {isOpen && ( */}
          <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              // onClick={handleLogOut}
            >
              Log out
            </li>
          </ul>
        {/* )} */}
      </div>
    </header>
  );
}

export default Header;
