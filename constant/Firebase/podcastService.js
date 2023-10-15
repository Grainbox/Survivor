import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as base64js from 'base64-js';
import { X_GROUP_AUTH } from "@env";

const apiEndpoint = "https://masurao.mathislebonniec.fr/api/employees/login";  // Replace this with the actual API endpoint URL

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Value exists
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
    return null;
};

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        // Error removing data
    }
};

async function getUserApi(email, password) {
    try {
        const response = await axios({
            method: 'post',  // Assuming it's a POST request; adjust as needed
            url: apiEndpoint,
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': X_GROUP_AUTH
            },
            data: {
                email: email,
                password: password
            }
        });
        console.log("Response Data:", response.data.access_token);
        await storeData('user_token', response.data.access_token);

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function getMe() {
    try {
        const response = await axios({
            method: 'get',  // Assuming it's a POST request; adjust as needed
            url: 'https://masurao.fr/api/employees/me',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': X_GROUP_AUTH,
                'Authorization': 'Bearer ' + await retrieveData('user_token')
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data [getMe]:', error);
        return Promise.reject(error);
    }
}

async function getImage(id) {
    try {
        const response = await axios({
            method: 'get',  // Assuming it's a POST request; adjust as needed
            url: 'https://masurao.mathislebonniec.fr/api/employees/'+ id.toString() +'/image',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': X_GROUP_AUTH,
                'Authorization': 'Bearer ' + await retrieveData('user_token')
            },
            responseType: 'arraybuffer'
        });
        const uint8Array = new Uint8Array(response.data);
        const base64Data = base64js.fromByteArray(uint8Array);
        return base64Data;
    } catch (error) {
        console.error('Error fetching data [getImage]:', error);
        return Promise.reject(error);
    }
}

async function getAllEmployees(id) {
    try {
        console.log(id);
        const response = await axios({
            method: 'get',  // Assuming it's a POST request; adjust as needed
            url: 'https://masurao.fr/api/employees',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': X_GROUP_AUTH,
                'Authorization': 'Bearer ' + await retrieveData('user_token')
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data [getAllEmployees]:', error);
        return Promise.reject(error);
    }
}

async function getEmployee(id) {
    try {
        console.log(id);
        const response = await axios({
            method: 'get',  // Assuming it's a POST request; adjust as needed
            url: 'https://masurao.mathislebonniec.fr/api/employees/'+ id.toString(),
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': X_GROUP_AUTH,
                'Authorization': 'Bearer ' + await retrieveData('user_token')
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return Promise.reject(error);
    }
}

export { getUserApi, getMe, getImage, getAllEmployees, getEmployee, storeData, retrieveData, removeData };
