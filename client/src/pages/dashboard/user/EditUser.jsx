import { Box, Button, MenuItem, TextField } from "@mui/material";
import PageHeader from "../../../components/global/PageHeader";
import { AiOutlineOrderedList } from "react-icons/ai";
import Message from "../../../components/global/Message";
import * as yup from "yup";
import { useFormik } from "formik";
import useUser from "../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../../services/api/user";

const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const validationSchema = yup.object({
  username: yup.string().required("Username is required!"),
  name: yup.string().required("Name is required!"),
  designation: yup.string().required("Designation is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Phone number is required!"),
});

const EditUser = () => {
  const { id } = useParams();

  const { updateUserMutation } = useUser();

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    staleTime: 1000,
  });

  const formik = useFormik({
    initialValues: {
      username: userQuery.isLoading ? "" : userQuery.data.username,
      name: userQuery.isLoading ? "" : userQuery.data.name,
      email: userQuery.isLoading ? "" : userQuery.data.email,
      phone: userQuery.isLoading ? "" : userQuery.data.phone,
      role: userQuery.isLoading ? "" : userQuery.data.role,
      designation: userQuery.isLoading ? "" : userQuery.data.designation,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateUserMutation.mutate({ id, ...values });
    },
  });
  return (
    <Box>
      <PageHeader
        pageTitle="Edit User"
        showBtn
        btnIcon={<AiOutlineOrderedList />}
        href="/dashboard/users"
        btnText="User List"
      />

      <Box mt="20px">
        {updateUserMutation.error && (
          <Message msg={updateUserMutation.error.response.data.message} />
        )}

        <form onSubmit={formik.handleSubmit}>
          <input type="hidden" name="role" value={formik.values.role} />
          <div className="grid grid-cols-3 gap-6 mb-6">
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
                loading={updateUserMutation.isPending}
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

export default EditUser;
