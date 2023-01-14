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
        <form className="doingtwit" onSubmit={onSubmit}>
            <input className="placehold" type="text" value={imtwit} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?" maxLength={120} />
            <input className="fileuploader" id="files" type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
            <label for="files" className="fill">파일추가</label>
            { attachment &&
                <div className="flexing">
                    <img src={attachment} width="200px" />
                    <button className="fill" onClick={onClearAttachment}>파일삭제</button>
                </div>
            }
            <input className="fill" type="submit" value="작성하기"/>
        </form>
    )
}

export default TwitFactory