import { dbService, storageService } from "myBase";
import { v4 as uuidv4 } from "uuid";
import React, {useState, useRef} from "react";

const TwitFactory = ({userObj}) => {

    const [imtwit, setImtwit] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        };

        const imtwitObj = {
            text: imtwit,
            createAt: Date.now(),
            creatorID: userObj.uid,
            attachmentUrl,
        };

        await dbService.collection("imtwits").add(imtwitObj);
        setImtwit("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setImtwit(value);
    };

    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = "";
    }

    const fileInput = useRef();

    return (

        <form onSubmit={onSubmit}>
                <input type="text" value={imtwit} onChange={onChange} placeholder="What's going on?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                { attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
                <input type="submit" value="imtwit"/>
            </form>

    )
}

export default TwitFactory