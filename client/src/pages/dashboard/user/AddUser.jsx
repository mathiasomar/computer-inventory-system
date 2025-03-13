import { Box, Button, MenuItem, TextField } from "@mui/material";
import PageHeader from "../../../components/global/PageHeader";
import { AiOutlineOrderedList } from "react-icons/ai";
import Message from "../../../components/global/Message";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import useUser from "../../../hooks/useUser";

const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  username: yup.string().required("Username is required!"),
  designation: yup.string().required("Designation is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Phone number is required!"),
  password: yup.string().required("Password is required!"),
  passwordConf: yup.string().required("Password is required!"),
});

const AddUser = () => {
  const { addUserMutation } = useUser();

  if (addUserMutation.error) {
    console.log(addUserMutation.error.response);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      designation: "",
      role: "",
      password: "",
      passwordConf: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.passwordConf)
        return toast.error("Password do not match");
      addUserMutation.mutate(values);
      // formik.resetForm();
    },
  });
  return (
    <Box>
      <PageHeader
        pageTitle="Add New User"
        showBtn
        btnIcon={<AiOutlineOrderedList />}
        href="/dashboard/users"
        btnText="User List"
      />

      <Box mt="20px">
        {addUserMutation.error && (
          <Message msg={addUserMutation.error.response.data.message} />
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-1">
              <TextField
                fullWidth
                size="small"
                label="Full Names"
                variant="outlined"
                name="name"
                placeholder="Enter full names"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="col-span-1">
              <TextField
                fullWidth
                size="small"
                label="Username"
                variant="outlined"
                name="username"
                placeholder="Create a username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div className="col-span-1">
              <TextField
                fullWidth
                size="small"
                label="Email"
                variant="outlined"
                name="email"
                placeholder="example@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="col-span-1">
              <TextField
                fullWidth
                select
                size="small"
                label="User Role"
                variant="outlined"
                name="role"
                placeholder="Enter full names"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Role</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="officer">Officer</MenuItem>
              </TextField>
            </div>
            <div className="col-span-1">
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                variant="outlined"
                name="phone"
                placeholder="07XXXXXXXX"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </div>
            <div className="col-span-1">
              <TextField
                fullWidth
                size="small"
                label="Designation"
                variant="outlined"
                name="designation"
                placeholder="Enter full Designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.designation &&
                  Boolean(formik.errors.designation)
                }
                helperText={
                  formik.touched.designation && formik.errors.designation
                }
              />
            </div>
            <div className="col-span-1">
              <TextField
                type="password"
                fullWidth
                size="small"
                label="Password"
                variant="outlined"
                name="password"
                placeholder="****************"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="col-span-1">
              <TextField
                type="password"
                fullWidth
                size="small"
                label="Confirm Password"
                variant="outlined"
                name="passwordConf"
                placeholder="****************"
                value={formik.values.passwordConf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordConf &&
                  Boolean(formik.errors.passwordConf)
                }
                helperText={
                  formik.touched.passwordConf && formik.errors.passwordConf
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <Button
                // type="reset"
                onClick={formik.handleReset}
                variant="contained"
                size="medium"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                loading={addUserMutation.isPending}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default AddUser;
