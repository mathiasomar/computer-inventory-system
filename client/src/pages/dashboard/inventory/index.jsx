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
import { Button } from "@mui/material";
import useInventory from "../../../hooks/useInventory";

const Inventory = () => {
  const { inventoryQueryAll, deleteInventoryMutation } = useInventory();
  const confirm = (id) => {
    deleteInventoryMutation.mutate(id);
  };
  const cancel = (e) => {
    console.log(e);
    toast.error("Process Cancelled");
  };

  const columns = [
    {
      field: "serialNo",
      headerName: "Serial NO",
      cellClassName: "name-column--cell",
      flex: 0.25,
    },
    {
      field: "type",
      headerName: "Device",
      flex: 0.2,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 0.25,
    },
    {
      field: "specs",
      headerName: "Specs",
      flex: 0.25,
    },
    {
      field: "condition",
      headerName: "Condition",
      flex: 0.25,
      renderCell: ({ row: { condition } }) => (
        <span
          className={`capitalize px-4 py-1 ${
            condition === "good"
              ? "bg-green-400"
              : condition === "bad"
              ? "bg-red-400"
              : "bg-orange-400"
          } text-white rounded-xl`}
        >
          {condition}
        </span>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      flex: 0.25,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { _id } }) => (
        <Box>
          <a href={`/dashboard/view-inventory/${_id}`}>
            <Button variant="outlined" color="info">
              View
            </Button>
          </a>
        </Box>
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
          <a href={`/dashboard/edit-inventory/${_id}`}>
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
              loading={deleteInventoryMutation.isPending}
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
        pageTitle="Inventories"
        showBtn
        btnIcon={<AiOutlinePlusCircle />}
        href="/dashboard/add-inventory"
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
            color: "blue",
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
        {inventoryQueryAll.isError && (
          <Alert severity="error">
            {inventoryQueryAll.error.response.data.message}
          </Alert>
        )}
        <DataGrid
          columns={columns}
          rows={inventoryQueryAll.data}
          getRowId={(row) => row._id}
          loading={inventoryQueryAll.isLoading}
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

export default Inventory;
