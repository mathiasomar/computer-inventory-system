import { Alert, Box, IconButton } from "@mui/material";
import PageHeader from "../../../components/global/PageHeader";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { Popconfirm, Space } from "antd";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useUser from "../../../hooks/useUser";
import { FaUserSecret, FaUserTie } from "react-icons/fa";

const Admin = () => {
  const { userQueryAll, deleteUserMutation } = useUser();
  const confirm = (id) => {
    deleteUserMutation.mutate(id);
  };
  const cancel = (e) => {
    console.log(e);
    toast.error("Process Cancelled");
  };

  const columns = [
    {
      field: "name",
      headerName: "Names",
      flex: 0.25,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.25,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.25,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 0.25,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.25,
      renderCell: ({ row: { role } }) => (
        <div
          className={`px-4 py-0.5 ${
            role === "admin" ? "bg-green-600" : "bg-orange-600"
          } w-fit rounded-2xl text-white capitalize flex items-center gap-2 h-8 mt-1`}
        >
          <span>{role === "admin" ? <FaUserSecret /> : <FaUserTie />}</span>{" "}
          <span>{role}</span>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: ({ row: { _id } }) => (
        <Space size="small">
          <a href={`/dashboard/edit-user/${_id}`}>
            <IconButton color="primary" title="edit">
              <AiOutlineEdit />
            </IconButton>
          </a>
          <Popconfirm
            title="Delete Student"
            description="Are you sure to delete Student"
            onConfirm={() => confirm(_id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton
              color="error"
              title="Delete"
              loading={deleteUserMutation.isPending}
            >
              <AiOutlineDelete />
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Box>
      <PageHeader
        pageTitle="Users"
        showBtn
        btnIcon={<AiOutlinePlusCircle />}
        href="/dashboard/add-user"
        btnText="Add"
      />

      <Box
        mt="20px"
        overflow="auto"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            maxHeight: "75vh",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#192335",
            fontWeight: 600,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "oklch(0.52 0.105 223.128)",
            borderBottom: "none",
            color: "#fff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#fff",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#f9f9f9",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#000 !important`,
          },
        }}
      >
        {userQueryAll.isError && (
          <Alert severity="error">
            {userQueryAll.error.response.data.message}
          </Alert>
        )}
        <DataGrid
          columns={columns}
          rows={userQueryAll.data}
          getRowId={(row) => row._id}
          loading={userQueryAll.isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
      </Box>
    </Box>
  );
};

export default Admin;
