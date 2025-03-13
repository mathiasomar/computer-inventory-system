import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { useFormik } from "formik";
import useLogin from "../hooks/useLogin";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const { loginUser, error, loading } = useLogin();
  const [open, setOpen] = useState(true); // I will change it to true after starting the backend

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  return (
    <div className="w-screen min-h-screen overflow-auto bg-[#f1f5f9]">
      <div className="container mx-auto w-full px-[30px] py-[20px]">
        <div className="grid grid-cols-2 place-items-center relative w-full">
          {/* Alert */}
          {error && (
            <Collapse
              in={open}
              sx={{ position: "absolute", width: "100%", top: 0, left: 0 }}
            >
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <AiOutlineClose fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>
          )}

          {/* Login Image */}
          <div className="col-span-1">
            <div className="w-full">
              <img
                src="/images/login.gif"
                alt=""
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="col-span-1">
            <div className="w-full px-4 py-6 shadow-md shadow-blue-800">
              {/* Login Header */}
              <div className="flex items-center gap-2 mb-5">
                <img src="/images/logo.png" className="w-[70px]" alt="" />
                <div className="flex flex-col justify-cente">
                  <h1 className="text-neutral font-[800] text-lg">
                    MINISTRY OF INVESTMENT, TRADE AND INDUSTRY
                  </h1>
                  <p className="text-fade1">
                    State Department for Trade | ICT Department | Computer
                    Inventory
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              {/* Form */}
              <div className="">
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    size="medium"
                    label="Email"
                    name="email"
                    variant="filled"
                    placeholder="example@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    type="password"
                    fullWidth
                    margin="normal"
                    size="medium"
                    label="Password"
                    name="password"
                    variant="filled"
                    placeholder="*******"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    flexDirection="column"
                  >
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      color="success"
                      loading={loading}
                    >
                      Login
                    </Button>
                    <p>Forgot Password</p>
                    <a href="/recover" className="inline-block w-full">
                      <Button
                        size="large"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Recover Password
                      </Button>
                    </a>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
