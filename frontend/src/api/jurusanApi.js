import axiosClient from "./axiosClient.js";

export async function getDataJurusan() {
    try {
        const res = await axiosClient.get('/jurusan');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataJurusan(data) {
    try {
        console.log("masuk create");
        const res = await axiosClient.post('/jurusan', data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataJurusan(id, data) {
    try {
        console.log(id);
        const res = await axiosClient.put(`/jurusan/${id}`, data).catch((err) => console.error("Error editing data:", err));
        return res;
    } catch (error) {
        console.error("Error editing data2:", error);
        return null;
    }
}

export async function getDataJurusanById(id) {
    try {
        const res = await axiosClient.get(`/jurusan/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}

export async function deleteDataJurusan(id) {
    try {
        const res = await axiosClient.delete(`/jurusan/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}