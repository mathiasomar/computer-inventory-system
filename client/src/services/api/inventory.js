import axios from "axios"

export const fetchInventories = async () => {
    return await axios.get("/api/inventories").then(res => res.data)
}

export const fetchInventory = async (id) => {
    return await axios.get(`/api/inventories/${id}`).then(res => res.data)
}

export const addInventory = async (values) => {
    return await axios.post("/api/inventories/add", values).then(res => res.data)
}

export const updateInventory = async (values) => {
    return await axios.patch(`/api/inventories/update/${values.id}`, values).then(res => res.data)
}

export const deleteInventory = async (id) => {
    return await axios.delete(`/api/inventories/delete/${id}`).then(res => res.data)
}