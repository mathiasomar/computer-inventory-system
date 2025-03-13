import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteInventory,
  addInventory,
  fetchInventories,
  updateInventory,
} from "../services/api/inventory";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const useInventory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  axios.defaults.headers.common["Authorization"] = currentUser.token;

  const inventoryQueryAll = useQuery({
    queryKey: ["inventories"],
    queryFn: fetchInventories,
    staleTime: 1000,
  });

  const addInventoryMutation = useMutation({
    mutationFn: addInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success(data.message);
      navigate("/dashboard/inventories");
    },
  });

  const updateInventoryMutation = useMutation({
    mutationFn: updateInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success(data.message);
    },
  });

  const deleteInventoryMutation = useMutation({
    mutationFn: deleteInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success(data.message);
    },
  });
  return {
    inventoryQueryAll,
    addInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation,
  };
};

export default useInventory;
