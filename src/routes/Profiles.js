import { authService } from "myBase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    
    // const getMyTwits = async() => {
    //     const imtwits = await dbService
    //         .collection("imtwits")
    //         .where("creatorID", "==", userObj.uid)
    //         .orderBy("creatAt")
    //         .get();
    // }

    // useEffect(() => {
    //     getMyTwits();
    // }, []);
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="change" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}