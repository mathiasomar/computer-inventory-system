import axios from "axios"

export const fetchUsers = async () => {
    return await axios.get("/api/users").then(res => res.data)
}

export const fetchUser = async (id) => {
    return await axios.get(`/api/users/${id}`).then(res => res.data)
}

export const fetchUserByRole = async (role) => {
    return await axios.get(`/api/users/role/${role}`).then(res => res.data)
}

export const addUser = async (values) => {
    return await axios.post("/api/users/add", values).then(res => res.data)
}

export const loginUser = async (values) => {
    return await axios.post("/api/users/login", values).then(res => res.data)
}

export const updateUser = async (values) => {
    return await axios.patch(`/api/users/update/${values.id}`, values).then(res => res.data)
}

export const deleteUser = async (id) => {
    return await axios.delete(`/api/users/delete/${id}`).then(res => res.data)
}