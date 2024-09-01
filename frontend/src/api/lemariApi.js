import axiosClient from "./axiosClient.js";

export async function getDataLemari() {
    try {
        const res = await axiosClient.get('/lemari');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataLemari(data) {
    try {
        const res = await axiosClient.post('/lemari', data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataLemari(id, data) {
    try {
        const res = await axiosClient.put(`/lemari/${id}`, data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function getDataLemariById(id) {
    try {
        const res = await axiosClient.get(`/lemari/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}

export async function deleteDataLemari(id) {
    try {
        const res = await axiosClient.delete(`/lemari/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}