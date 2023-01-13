import { dbService } from "myBase";
import React, { useEffect, useState, useRef } from "react";
import Iamtwit from "components/Iamtwit";
import TwitFactory from "components/TwitFactory";

const Home = ({userObj}) => {
    const [imtwits, setImtwits] = useState([]);

    // const getimtwits = async () => {
    //     const dbimtwits = await dbService.collection("imtwits").get();
    //     dbimtwits.forEach((document) => {
    //         const twitObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setImtwits((prev) => [twitObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        dbService.collection("imtwits").onSnapshot((snapshot) => {
            const twitArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setImtwits(twitArray);
        });
    }, []);

    return (
        <div>
            <TwitFactory userObj={userObj} />
            <div>
                {imtwits.map((imtwit) => (
                    <Iamtwit
                        key={imtwit.id}
                        imtwitObj={imtwit}
                        isOwner={imtwit.creatorID === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;