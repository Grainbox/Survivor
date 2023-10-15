import { db } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const addStylesToDatabase = async (employeeDetails) => {
    const employeesCollection = collection(db, 'Employees');

    for (const employee of employeeDetails) {
        //do not add the image to the database
        delete employee.image;
        await addDoc(employeesCollection, employee);
    }
};

async function convertBinaryToBase64(binaryData) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(new Blob([binaryData]));
    });
}

export default addStylesToDatabase;
