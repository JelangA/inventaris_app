import axiosClient from "./axiosClient.js";

export async function getDataBarang() {
    try {
        const res = await axiosClient.get('/barang');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataBarang(data) {
    try {
        const res = await axiosClient.post('/barang', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch((err) => console.error("Error adding data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataBarang(id, data) {
    try {
        const res = await axiosClient.put(`/barang/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch((err) => console.error("Error editing data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function deleteDataBarang(id) {
    try {
        const res = await axiosClient.delete(`/barang/${id}`).catch((err) => console.error("Error deleting data:", err));
        return res;
    } catch (error) {
        return null;
    }
}