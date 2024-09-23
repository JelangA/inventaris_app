import axiosClient from "./axiosClient.js";

export async function getDataSumber() {
    try {
        const res = await axiosClient.get('/sumber');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataSumber(data) {
    try {
        const res = await axiosClient.post('/sumber', data).catch((err) => console.error("Error adding data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataSumber(id, data) {
    try {
        const res = await axiosClient.put(`/sumber/${id}`, data).catch((err) => console.error("Error editing data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function getDataSumberById(id) {
    try {
        const res = await axiosClient.get(`/sumber/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}

export async function deleteDataSumber(id) {
    try {
        const res = await axiosClient.delete(`/sumber/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}