import axiosClient from "./axiosClient.js";

export async function getProfile() {
    try {
        const res = await axiosClient.get('/profile');
        return res.data.data;
    } catch (error) {
        return [];
    }
}

export async function getDataUser() {
    try {
        const res = await axiosClient.get('/user');
        const data = res.data.data;
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: data[key].id }));
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addDataUser(data) {
    try {
        const res = await axiosClient.post('/user', data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function editDataUser(id, data) {
    try {
        const res = await axiosClient.put(`/user/${id}`, data);
        return res;
    } catch (error) {
        return null;
    }
}

export async function getDataUserById(id) {
    try {
        const res = await axiosClient.get(`/user/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}

export async function deleteDataUser(id) {
    try {
        const res = await axiosClient.delete(`/user/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}