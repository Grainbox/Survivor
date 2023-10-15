import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { darkTheme, lightTheme } from "./theme";

const fetchStyles = async (theme, page) => {
    const parentCollectionRef = doc(db, 'Style', 'white', 'Pages', page);
    const docSnapshot = await getDoc(parentCollectionRef);

    if (docSnapshot.exists()) {
        const styles = docSnapshot.data();
        console.log("styles : ", styles);
        return styles;
    }

    return null;
};

const getStylesPromise = (page) => fetchStyles(lightTheme, page); // Pass the appropriate theme here

export default getStylesPromise;
