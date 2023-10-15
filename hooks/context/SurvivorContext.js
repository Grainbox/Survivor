import React, { useContext, useEffect, useState  } from 'react';
import { usePodcastActions } from './SurvivorActions';
import { enableScreens } from 'react-native-screens';
import {getAllEmployees, getEmployee, getImage, getMe} from '../../constant/Firebase/podcastService';
import NetInfo from "@react-native-community/netinfo";
import {Text, View} from "react-native";
import { fetchEmployeesFromDatabase } from '../../constant/Firebase/ChatService';

enableScreens();


export const SurvivorContext = React.createContext({});

export const usePodcastState = () => {
    const [connected, setConnected] = useState(false);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [me, setMe] = useState(null);
    const [musicplaying, setMusicIsPlaying] = useState(false);
    const [track, setTrack] = useState(null);
    const [playbackPosition, setplaybackPosition] = useState(0);
    const [trackID, setTrackID] = useState('3135563');

    const state = {
        connected,
        setConnected,
        token,
        setToken,
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        employees,
        setEmployees,
        employeeDetails,
        setEmployeeDetails,
        me,
        setMe,
        musicplaying,
        setMusicIsPlaying,
        track,
        setTrack,
        playbackPosition,
        setplaybackPosition,
        trackID,
        setTrackID
    };

    return state;
}

export const SurvivorProvider = ({ children }) => {
    const state = usePodcastState();
    const {
        connected,
        setConnected,
        token,
        setToken,
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        employees,
        setEmployees,
        employeeDetails,
        setEmployeeDetails,
        me,
        setMe,
        musicplaying,
        setMusicIsPlaying,
        track,
        setTrack,
        playbackPosition,
        setplaybackPosition,
        trackID,
        setTrackID
    } = state; // destructuring from the state
    const actions = usePodcastActions(state);
    const [isWifi, setIsWifi] = useState(null);

    useEffect(() => {


        // Cleanup function

    }, []);

    /*useEffect(() => {
        const fetchEmployeeDetails = async () => {
            let response = await getAllEmployees();

            const employeesWithImages = [];

            for (const employee of response) {
                const detail = await getEmployee(employee.id);
                //const image = await getImage(employee.id);
                employeesWithImages.push({
                    ...detail
                });
            }
            console.log(employeesWithImages);
            setEmployeeDetails(employeesWithImages);
        };

        fetchEmployeeDetails().then(() => console.log('done'));
    }, []);*/

    useEffect(() => {
        let wifi = false;
        const unsubscribe = NetInfo.addEventListener(state => {
            wifi = state.isConnected;
        });
        unsubscribe();
        const fetchMe = async () => {
            const me = await getMe();
            setMe(me);
        }
        const fetchEmployeeDetails = async () => {
            const fetchedEmployees = await fetchEmployeesFromDatabase();

            console.log("HERE : ", fetchedEmployees);

            const employeesWithImages = [];

            for (const employee of fetchedEmployees) {
                const image = await getImage(employee.id);
                employeesWithImages.push({
                    ...employee,
                    image
                });
                console.log("Image id : ", employee.id);
            }
            setEmployeeDetails(employeesWithImages);
        }

        if (connected && wifi) {
            fetchEmployeeDetails().then(() => console.log('fetch employees'));
            fetchMe().then(() => console.log('fetch me'));
        }
    }, []);

    const contextValue = {
        ...state,
        ...actions,
        connected,
        setConnected,
        token,
        setToken,
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        employees,
        setEmployees,
        employeeDetails,
        setEmployeeDetails,
        me,
        setMe,
        musicplaying,
        setMusicIsPlaying,
        track,
        setTrack,
        playbackPosition,
        setplaybackPosition,
        trackID,
        setTrackID
    };

    return (
        <SurvivorContext.Provider value={contextValue}>
            {children}
        </SurvivorContext.Provider>
    );
};


