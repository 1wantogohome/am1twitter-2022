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
        <div className="profile">
            <h6>닉네임을 변경해보세요!</h6>
            <form className="changeNickname" onSubmit={onSubmit}>
                <input className="placehold" type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
                <input className="fill" type="submit" value="변경하기" />
            </form>
            <button className="stroke" onClick={onLogOutClick}>로그아웃</button>
        </div>
    )
}