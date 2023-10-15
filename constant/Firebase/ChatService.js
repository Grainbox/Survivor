import { collection, getDocs, updateDoc, increment, query, where, doc, arrayUnion, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeIdFromString = (str, id) => {
    // Split the string by '/'
    const ids = str.split('/');

    // Filter out the id
    const filteredIds = ids.filter(item => item !== id.toString());

    // Join the ids back into a string
    return filteredIds.join('/');
}

const createGroup = async (collectionPath, id, namegroup) => {
    try {
        if (!collectionPath || !id || !namegroup) throw new Error('All parameters are required');

        // Sort the id to ensure order doesn't matter
        id = id.split('/').sort().join('/');

        // Check if group already exists
        const q = query(collection(db, collectionPath), where("id", "==", id));
        const querySnapshot = await getDocs(q);

        //get the document id of the querySnapshot
        const docRef2 = querySnapshot.docs[0];
        // If group doesn't exist, create it
        if (querySnapshot.empty) {
            const docRef = await addDoc(collection(db, collectionPath), {
                id,
                namegroup,
                messages: [],
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id; // Return newly created group's Firestore ID (this is different from the custom `id` you've set)
        } else {
            console.log("Group already exists with ID: ", id);
            return docRef2.id; // Return newly created group's Firestore ID (this is different from the custom `id` you've set)
        }

    } catch (error) {
        console.error('Error in createGroup:', error);
        return null;
    }
};

const removeOfGroup = async (collectionPath, documentId, id) => {
    try {
        console.log("collectionPath", id);
        if (!collectionPath || !documentId) throw new Error('Both collectionPath and documentId are required');

        // Fetch the group from the database
        const groupDoc = await getDoc(doc(db, collectionPath, documentId));

        if (!groupDoc.exists) {
            throw new Error('Group not found');
        }

        const groupData = groupDoc.data();
        console.log("groupData", groupData);
        // Remove the id from the group's ider string
        const updatedIder = removeIdFromString(groupData.id, id);

        // Update the group's ider string in the database
        await updateDoc(doc(db, collectionPath, documentId), {
            id: updatedIder
        });

    } catch (error) {
        console.error('Error in removeOfGroup:', error);
    }
};

const getGroups = async (path, id) => {
    try {
        if (!path) throw new Error('Path is required');
        const messages = [];
        const querySnapshot = await getDocs(collection(db, path));
        querySnapshot.forEach((doc) => {
            const group = doc.data();
            console.log("group", group.id);
            //split the string by '/'
            const ids = group.id.split('/');
            //if my id is in the array, add the group to the array
            ids.forEach((item) => {
                if (item === id.toString()) {
                    group.documentId = doc.id;
                    messages.push(group);
                }
            });
        });

        console.log("messages", messages);
        return messages; // Return the array of messages with document IDs
    } catch (error) {
        console.error('Error in getGroups:', error);
        return [];
    }
};

const getMessageFromGroup = async (path, id) => {
    try {
        if (!path) throw new Error('Path is required');
        const messages = [];
        const querySnapshot = await getDocs(collection(db, path));
        querySnapshot.forEach((doc) => {
            const group = doc.data();
            group.messages.forEach((message) => {
                message.documentId = doc.id;
                console.log("documentId", message.documentId);
                console.log("id", id);
                if (message.documentId === id) {
                    messages.push(message);
                }
            });
        });
        return messages; // Return the array of messages with document IDs
    } catch (error) {
        console.error('Error in getGroups:', error);
        return [];
    }
};

const addMessageToGroup = async (path, id, message) => {
    try {
        if (!path) throw new Error('Path is required');
        if (!message) throw new Error('Message is required');
        const groupRef = doc(db, path, id);
        await updateDoc(groupRef, {
            messages: arrayUnion(message),
        });
    } catch (error) {
        console.error('Error in addMessageToGroup:', error);
    }
};

const deleteMessageFromGroup = async (collectionPath, groupId, messageId) => {
    try {
        console.log("messageId", messageId);

        const groupRef = doc(db, collectionPath, groupId);
        const groupDoc = await getDoc(groupRef);

        if (groupDoc.exists()) {
            const messages = groupDoc.data().messages;
            const filteredMessages = messages.filter(msg => msg._id !== messageId);

            await updateDoc(groupRef, { messages: filteredMessages });
        }
    } catch (error) {
        console.error('Error deleting message:', error);
    }
};

const fetchEmployeesFromDatabase = async () => {
    const employeesCollection = collection(db, 'Employees');
    const employeeSnapshot = await getDocs(employeesCollection);

    const employeeData = employeeSnapshot.docs.map(doc => doc.data());
    return employeeData;
};


export { getGroups, getMessageFromGroup, addMessageToGroup, removeOfGroup, deleteMessageFromGroup, createGroup, fetchEmployeesFromDatabase };
