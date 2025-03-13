import { Alert, Box, Skeleton } from "@mui/material";
import PageHeader from "../../../components/global/PageHeader";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../../../services/api/inventory";
import { List } from "antd";
import moment from "moment";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const ViewInventory = () => {
  const { id } = useParams();

  const { currentUser } = useContext(AuthContext);

  axios.defaults.headers.common["Authorization"] = currentUser.token;

  const inventoryQuery = useQuery({
    queryKey: ["inventories", id],
    queryFn: () => fetchInventory(id),
    staleTime: 1000,
  });
  return (
    <Box>
      <PageHeader
        pageTitle={`Viewing Inventory`}
        showBtn
        btnIcon={<AiOutlineOrderedList />}
        href="/dashboard/inventories"
        btnText="Manage"
      />

      <Box mt="20px">
        <div className="p-4 border border-gray-300">
          {inventoryQuery.isError ? (
            <Alert severity="error">
              {inventoryQuery.error.response.data.message}
            </Alert>
          ) : (
            <div className="w-full grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="p-2 border border-gray-300 shadow-md">
                  <h1 className="text-lg font-[700] text-blue-700 mb-4">
                    Device Details
                  </h1>
                  <List>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Serial N0:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.serialNo
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Device Type:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.type
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Model:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.model
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Specs:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.specs
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Condition:</strong>
                      {inventoryQuery.isLoading ? (
                        <Skeleton sx={{ minWidth: "60px" }} />
                      ) : (
                        <span
                          className={`min-w-[60px] text-sm ml-2 px-4 py-1 capitalize font-semibold text-white ${
                            inventoryQuery.data.condition === "good"
                              ? "bg-green-400"
                              : inventoryQuery.data.condition === "bad"
                              ? "bg-red-400"
                              : "bg-orange-400"
                          }`}
                        >
                          {inventoryQuery.data.condition}
                        </span>
                      )}
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Description:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.description
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Date Recorded:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          moment(inventoryQuery.data.createdAt).format(
                            "DD MMMM YYYY"
                          )
                        )}
                      </span>
                    </List.Item>
                  </List>
                </div>
              </div>

              <div className="col-span-1">
                <div className="p-2 border border-gray-300 shadow-md">
                  <h1 className="text-lg font-[700] text-blue-700 mb-4">
                    Officer Details
                  </h1>
                  <List>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Name:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.officerID.name
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Email Address:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.officerID.email
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Phone Number:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.officerID.phone
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Role:</strong>
                      {inventoryQuery.isLoading ? (
                        <Skeleton sx={{ minWidth: "60px" }} />
                      ) : (
                        <span
                          className={`min-w-[60px] text-sm ml-2 px-4 py-1 capitalize font-semibold text-white ${
                            inventoryQuery.data.officerID.role === "admin"
                              ? "bg-green-600"
                              : "bg-orange-600"
                          }`}
                        >
                          {inventoryQuery.data.officerID.role}
                        </span>
                      )}
                    </List.Item>
                  </List>
                </div>
              </div>

              <div className="col-span-1">
                <div className="p-2 border border-gray-300 shadow-md">
                  <h1 className="text-lg font-[700] text-blue-700 mb-4">
                    Officer Using the Device
                  </h1>
                  <List>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Name:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.officer
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Floor N0:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.floorNo
                        )}
                      </span>
                    </List.Item>
                    <List.Item className="flex items-center mb-2">
                      <strong className="text-sm">Office N0:</strong>
                      <span className="min-w-[60px] text-sm ml-2">
                        {inventoryQuery.isLoading ? (
                          <Skeleton />
                        ) : (
                          inventoryQuery.data.officeNo
                        )}
                      </span>
                    </List.Item>
                  </List>
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ViewInventory;
