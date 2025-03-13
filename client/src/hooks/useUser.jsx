import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../services/api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useUser = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  axios.defaults.headers.common["Authorization"] = currentUser.token;

  const queryClient = useQueryClient();
  const userQueryAll = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000,
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message);
      navigate("/dashboard/users");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message);
    },
  });
  return {
    userQueryAll,
    addUserMutation,
    deleteUserMutation,
    updateUserMutation,
  };
};

export default useUser;
