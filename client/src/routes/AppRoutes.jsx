import { Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { lazy, Suspense, useContext } from "react";
import Loader from "../components/Loader";
import { Skeleton } from "antd";
import { AuthContext } from "../contexts/AuthContext";

const Login = lazy(() => delayForLoading(import("../pages/Login")));
const DashboardLayout = lazy(() =>
  delayForLoading(import("../layouts/DashboardLayout"))
);
const Dashboard = lazy(() => delayForLoading(import("../pages/dashboard")));
const User = lazy(() => delayForLoading(import("../pages/dashboard/user")));
const AddUser = lazy(() =>
  delayForLoading(import("../pages/dashboard/user/AddUser"))
);
const EditUser = lazy(() =>
  delayForLoading(import("../pages/dashboard/user/EditUser"))
);
const Inventory = lazy(() =>
  delayForLoading(import("../pages/dashboard/inventory"))
);
const ViewInventory = lazy(() =>
  delayForLoading(import("../pages/dashboard/inventory/ViewInventory"))
);
const AddInventory = lazy(() =>
  delayForLoading(import("../pages/dashboard/inventory/AddInventory"))
);

const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader />}>
                <DashboardLayout />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Skeleton />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/* User routes */}
          <Route
            path="/dashboard/users"
            element={
              <Suspense fallback={<Skeleton />}>
                <User />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/add-user"
            element={
              <Suspense fallback={<Skeleton />}>
                <AddUser />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/edit-user/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <EditUser />
              </Suspense>
            }
          />

          {/* Inventory routes */}
          <Route
            path="/dashboard/inventories"
            element={
              <Suspense fallback={<Skeleton />}>
                <Inventory />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/view-inventory/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <ViewInventory />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/add-inventory"
            element={
              <Suspense fallback={<Skeleton />}>
                <AddInventory />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const delayForLoading = (promise) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
};

export default AppRoutes;
