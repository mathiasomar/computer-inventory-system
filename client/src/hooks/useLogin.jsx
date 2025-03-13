import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const loginUser = async (values) => {
    axios.defaults.withCredentials = true;

    try {
      setError(null);
      setLoading(true);

      const res = await axios.post("/api/users/login", values);

      if (res.status === 200) {
        toast.success(res.data.message);
        const user = res.data.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        setError(error.response.data.message);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return { loginUser, error, loading, logoutUser };
};

export default useLogin;
