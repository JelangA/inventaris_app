import axiosClient from "./axiosClient.js";

export async function addDataPengadaan(data) {
    try {
        const res = await axiosClient.post('/pengadaan', data).catch((err) => console.error("Error adding data:", err));
        return res;
    } catch (error) {
        return null;
    }
}