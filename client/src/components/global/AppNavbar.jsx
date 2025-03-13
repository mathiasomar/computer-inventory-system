import {
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineMenuFold,
  AiOutlineUser,
} from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Badge, Dropdown } from "antd";
import { FaAngleDown } from "react-icons/fa";
import { IconButton, Typography } from "@mui/material";
import Container from "./../Container";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useLogin from "../../hooks/useLogin";

const AppNavbar = ({ handleToggle, collapsed }) => {
  const { currentUser } = useContext(AuthContext);
  const { logoutUser } = useLogin();

  const handleLogout = () => {
    logoutUser();
  };
  const note = [
    {
      key: 1,
      label: (
        <a
          href="/dashboard/notification"
          className="flex flex-col max-w-[250px] mb-2 py-2"
        >
          <h1 className="text-md font-[600]">Student Registration</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
            eum.
          </p>
        </a>
      ),
    },
    {
      key: 2,
      label: (
        <a
          href="/dashboard/notification"
          className="flex flex-col max-w-[250px] mb-2 py-2"
        >
          <h1 className="text-md font-[600]">Student Registration</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
            eum.
          </p>
        </a>
      ),
    },
    {
      key: 3,
      label: (
        <a
          href="/dashboard/notification"
          className="flex flex-col max-w-[250px] mb-2 py-2"
        >
          <h1 className="text-md font-[600]">Student Registration</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
            eum.
          </p>
        </a>
      ),
    },
  ];

  const account = [
    {
      key: 1,
      label: (
        <a
          href="/dashboard/profile"
          className="flex items-center gap-4 cursor-pointer"
        >
          <AiOutlineUser /> Profile
        </a>
      ),
    },
    {
      key: 2,
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 cursor-pointer"
        >
          <AiOutlineLogout /> Logout
        </button>
      ),
    },
  ];
  return (
    <div className={`navbar ${collapsed && "active"}`}>
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2 -ml-1">
          <IconButton onClick={() => handleToggle("collapsed")}>
            {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </IconButton>

          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            Device Inventory Management System
          </Typography>
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <span
              className={`px-4 py-1 ${
                currentUser.role === "admin" ? "bg-green-600" : "bg-orange-600"
              } text-white text-[10px] rounded-2xl`}
            >
              {currentUser.role}
            </span>
          </li>
          <li>
            <span className="w-[30px] h-[30px] rounded-full bg-blue-100 grid place-items-center cursor-pointer">
              <Dropdown trigger={["click"]} menu={{ items: note }}>
                <Badge count={3}>
                  <AiOutlineBell size={20} />
                </Badge>
              </Dropdown>
            </span>
          </li>
          <li>
            <Dropdown trigger={["click"]} menu={{ items: account }}>
              <div className="flex items-center gap-2 cursor-pointer">
                <p className="!text-sm text-fade">{currentUser.name}</p>
                {/* <Avatar src="/images/review2.png" size="large" /> */}
                <span>
                  <FaAngleDown />
                </span>
              </div>
            </Dropdown>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default AppNavbar;
