import axios from "axios";
import {baseUrl, ruanganUri} from "../util/Endpoint.js";


export async function getDataRuangan() {
    try {
        const response = await axios.get(`${baseUrl}${ruanganUri}`);
        const data = response.data;

        const dataArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

        console.log('Fetched and transformed data:', dataArray); // Tambahkan logging
        return dataArray;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
export async function addDataRuangan(data) {
    try {
        const response = await axios.patch(`${baseUrl}${ruanganUri}`, data);
        console.log('Add data response:', response); // Tambahkan logging
        return response;
    } catch (error) {
        console.error('Error adding data:', error);
        return null;
    }

}

export async function deleteDataRuangan(id) {
    try {
        const response = await axios.delete(`${baseUrl}${ruanganUri}/${id}.json`);
        console.log('Delete data response:', response); // Tambahkan logging
        return response;
    } catch (error) {
        console.error('Error deleting data:', error);
        return null;
    }
}
