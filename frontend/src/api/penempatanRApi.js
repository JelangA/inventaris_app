import axiosClient from "./axiosClient.js";

export async function getDataPenempatanRuangan() {
    try {
        const res = await axiosClient.get('/penempatanRuanganemari');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataPenempatanRuangan(data) {
    try {
        const res = await axiosClient.post('/penempatanRuanganemari', data);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function editDataPenempatanRuangan(id, data) {
    try {
        const res = await axiosClient.put(`/penempatanRuanganemari/${id}`, data);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function getDataPenempatanRuanganById(id) {
    try {
        const res = await axiosClient.get(`/penempatanRuanganemari/${id}`);
        return res.data.data;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function deleteDataPenempatanRuangan(id) {
    try {
        const res = await axiosClient.delete(`/penempatanRuanganemari/${id}`);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}