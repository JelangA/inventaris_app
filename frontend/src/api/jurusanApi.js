import axios from "axios";
import {baseUrl, jurusanUri} from "../util/Endpoint.js";

export async function getDataJurusan() {
    try {
        const response = await axios.get(`${baseUrl}${jurusanUri}`);
        const data = response.data;

        // Mengubah objek menjadi array
        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

        console.log('Fetched and transformed data:', dataArray); // Tambahkan logging
        return dataArray;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export async function addDataJurusan(data) {
    try {
        const response = await axios.patch(`${baseUrl}${jurusanUri}`, data);
        console.log('Add data response:', response); // Tambahkan logging
        return response;
    } catch (error) {
        console.error('Error adding data:', error);
        return null;
    }

}

export async function deleteDataJurusan(id) {
    try {
        const response = await axios.delete(`${baseUrl}${jurusanUri}/${id}.json`);
        console.log('Delete data response:', response); // Tambahkan logging
        return response;
    } catch (error) {
        console.error('Error deleting data:', error);
        return null;
    }
}

export async function updateDataJurusan(id, data) {
    try {
        const response = await axios.put(`${baseUrl}${jurusanUri}/${id}.json`, data);
        console.log('Update data response:', response); // Tambahkan logging
        return response;
    } catch (error) {
        console.error('Error updating data:', error);
        return null;
    }
}

