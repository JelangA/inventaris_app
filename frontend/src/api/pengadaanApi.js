import axiosClient from "./axiosClient.js";

export async function addDataPengadaan(data) {
    try {
        const res = await axiosClient.post('/pengadaan', data);
        return res;
    } catch (error) {
        return null;
    }
}