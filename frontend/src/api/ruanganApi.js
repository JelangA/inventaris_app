import axiosClient from "./axiosClient.js";

export async function getDataRuangan() {
    try {
        const res = await axiosClient.get('/ruangan');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataRuangan(data) {
    try {
        const res = await axiosClient.post('/ruangan', data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataRuangan(id, data) {
    try {
        const res = await axiosClient.put(`/ruangan/${id}`, data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function getDataRuanganById(id) {
    try {
        const res = await axiosClient.get(`/ruangan/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}

export async function deleteDataRuangan(id) {
    try {
        const res = await axiosClient.delete(`/ruangan/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}