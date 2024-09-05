import axiosClient from "./axiosClient.js";

export async function getDataPenempatanLemari() {
    try {
        const res = await axiosClient.get('/penempatanLemari');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataPenempatanLemari(data) {
    try {
        const res = await axiosClient.post('/penempatanLemari', data);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function editDataPenempatanLemari(id, data) {
    try {
        const res = await axiosClient.put(`/penempatanLemari/${id}`, data);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function getDataPenempatanLemariById(id) {
    try {
        const res = await axiosClient.get(`/penempatanLemari/${id}`);
        return res.data.data;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function deleteDataPenempatanLemari(id) {
    try {
        const res = await axiosClient.delete(`/penempatanLemari/${id}`);
        return res;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}