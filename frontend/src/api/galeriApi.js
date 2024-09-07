import axiosClient from "./axiosClient";

export async function getDataGaleri() {
    try {
        const res = await axiosClient.get('/galeriRuangan');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataGaleri(data) {
    try {
        const res = await axiosClient.post('/galeriRuangan', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch((err) => console.error("Error adding data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataGaleri(id, data) {
    try {
        const res = await axiosClient.put(`/galeriRuangan/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch((err) => console.error("Error editing data:", err));
        return res;
    } catch (error) {
        return null;
    }
}

export async function deleteDataGaleri(id) {
    try {
        const res = await axiosClient.delete(`/galeriRuangan/${id}`).catch((err) => console.error("Error deleting data:", err));
        return res;
    } catch (error) {
        return null;
    }
}