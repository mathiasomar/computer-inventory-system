import { AiOutlineFile, AiOutlineSetting, AiOutlineShop } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { Sidebar as Aside, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaShieldAlt, FaUserCog, FaUserSecret } from "react-icons/fa";

const Sidebar = ({ collapsed, toggled, rtl }) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const menuItemStyle = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: "#fff",
    },
    SubMenuExpandIcon: {
      color: "#fff",
    },
    button: {
      // the active class will be added automatically by react router
      // so we can use it to style the active menu item
      [`&:hover`]: {
        backgroundColor: "#155dfc",
        color: "#fff",
        transition: "all .3s ease",
      },
    },
  };

  return (
    <Box>
      <Aside
        collapsed={collapsed}
        toggled={toggled}
        rtl={rtl}
        style={{
          border: "none",
          height: "100vh",
        }}
        backgroundColor="oklch(0.52 0.105 223.128)"
        // breakPoint="md"
      >
        <div className="flex flex-col h-full">
          <div
            className={`mt-4 mb-8 px-6 ${
              collapsed ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500 ease-in-out`}
          >
            <div className="w-[40px] whitespace-nowrap flex items-center gap-4">
              <img src="/images/logo.png" className="w-full h-auto" alt="" />
              <Typography variant="h6" sx={{ color: "#fff" }}>
                ICT - DIMS
              </Typography>
            </div>
          </div>

          <div className="flex-1 mb-8">
            <Menu menuItemStyles={menuItemStyle}>
              <MenuItem
                className={`menu-item ${pathname === "/dashboard" && "active"}
                ${pathname === "/dashboard/" && "active"}`}
                icon={<AiOutlineDashboard />}
                component={<a href="/dashboard" />}
              >
                Dashboard
              </MenuItem>
            </Menu>

            <div className="my-4">
              <Typography
                variant="body2"
                fontWeight={500}
                className={`${
                  collapsed ? "hidden" : "block"
                } tracking-[0.5px] px-6 text-gray-300 transition-opacity duration-300`}
              >
                Users
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyle}>
              <SubMenu
                icon={<FaUserSecret />}
                label="User"
                className={`sub-menu ${
                  pathname === "/dashboard/add-user" && "active"
                } ${pathname === "/dashboard/users" && "active"} ${
                  pathname === `/dashboard/edit-user/${id}` && "active"
                }`}
              >
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/add-user" && "active"
                  }
                  ${pathname === "/dashboard/add-user" && "active"} ${
                    pathname === `/dashboard/edit-user/${id}` && "active"
                  }`}
                  component={<a href="/dashboard/add-user" />}
                >
                  Add
                </MenuItem>
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/users" && "active"
                  }
                  ${pathname === "/dashboard/users" && "active"}`}
                  component={<a href="/dashboard/users" />}
                >
                  Manage
                </MenuItem>
              </SubMenu>
            </Menu>

            <div className="my-4">
              <Typography
                variant="body2"
                fontWeight={500}
                className={`${
                  collapsed ? "hidden" : "block"
                } tracking-[0.5px] px-6 text-gray-300 transition-opacity duration-300`}
              >
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyle}>
              <SubMenu
                icon={<AiOutlineShop />}
                label="Inventory"
                className={`sub-menu ${
                  pathname === "/dashboard/add-inventory" && "active"
                } ${pathname === "/dashboard/inventories" && "active"} ${
                  pathname === `/dashboard/edit-inventory/${id}` && "active"
                } ${
                  pathname === `/dashboard/view-inventory/${id}` && "active"
                }`}
              >
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/add-inventory" && "active"
                  }
                  ${pathname === "/dashboard/add-inventory" && "active"}`}
                  component={<a href="/dashboard/add-inventory" />}
                >
                  Add
                </MenuItem>
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/inventories" && "active"
                  }
                  ${pathname === "/dashboard/inventories" && "active"} ${
                    pathname === `/dashboard/edit-inventory/${id}` && "active"
                  } ${
                    pathname === `/dashboard/view-inventory/${id}` && "active"
                  }`}
                  component={<a href="/dashboard/inventories" />}
                >
                  Manage
                </MenuItem>
              </SubMenu>
            </Menu>

            <div className="my-4">
              <Typography
                variant="body2"
                fontWeight={500}
                className={`${
                  collapsed ? "hidden" : "block"
                } tracking-[0.5px] px-6 text-gray-300 transition-opacity duration-300`}
              >
                Statistics
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyle}>
              <SubMenu
                icon={<AiOutlineFile />}
                label="Report"
                className={`sub-menu ${
                  pathname === "/dashboard/good-condition" && "active"
                } ${pathname === "/dashboard/bad-condition" && "active"} ${
                  pathname === "/dashboard/to-upgrade" && "active"
                }`}
              >
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/good-condition" && "active"
                  }
                  ${pathname === "/dashboard/good-condition" && "active"}`}
                  component={<a href="/dashboard/good-condition" />}
                >
                  Good Condition
                </MenuItem>
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/bad-condition" && "active"
                  }
                  ${pathname === "/dashboard/bad-condition" && "active"}`}
                  component={<a href="/dashboard/bad-condition" />}
                >
                  Bad Condition
                </MenuItem>
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/to-upgrade" && "active"
                  }
                  ${pathname === "/dashboard/to-upgrade" && "active"}`}
                  component={<a href="/dashboard/to-upgrade" />}
                >
                  To Upgrade
                </MenuItem>
              </SubMenu>
            </Menu>

            <div className="my-4">
              <Typography
                variant="body2"
                fontWeight={500}
                className={`${
                  collapsed ? "hidden" : "block"
                } tracking-[0.5px] px-6 text-gray-300 transition-opacity duration-300`}
              >
                Pages
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyle}>
              <SubMenu
                icon={<FaShieldAlt />}
                label="Privacy & Terms"
                className={`sub-menu ${
                  pathname === "/dashboard/privacy" && "active"
                } ${pathname === "/dashboard/terms" && "active"}`}
              >
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/privacy" && "active"
                  }`}
                  component={<a href="/dashboard/privacy" />}
                >
                  Privacy
                </MenuItem>
                <MenuItem
                  className={`menu-item sub ${
                    pathname === "/dashboard/terms" && "active"
                  }`}
                  component={<a href="/dashboard/terms" />}
                >
                  Terms of Service
                </MenuItem>
              </SubMenu>
            </Menu>

            <div className="my-4">
              <Typography
                variant="body2"
                fontWeight={500}
                className={`${
                  collapsed ? "hidden" : "block"
                } tracking-[0.5px] px-6 text-gray-300 transition-opacity duration-300`}
              >
                Settings
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyle}>
              <MenuItem
                className={`menu-item ${
                  pathname === "/dashboard/system-settings" && "active"
                }`}
                icon={<AiOutlineSetting />}
                component={<a href="/dashboard/system-settings" />}
              >
                System
              </MenuItem>
              <MenuItem
                className={`menu-item ${
                  pathname === "/dashboard/system-settings" && "active"
                }`}
                icon={<FaUserCog />}
                component={<a href="/dashboard/system-settings" />}
              >
                Profile
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Aside>
    </Box>
  );
};

export default Sidebar;
