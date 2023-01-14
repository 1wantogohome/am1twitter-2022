import { dbService, storageService } from "myBase";
import React, { useState } from "react";

const Iamtwit = ({imtwitObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTwit, setNewTwit] = useState(imtwitObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this twit?");
        if (ok) {
            await dbService.doc(`imtwits/${imtwitObj.id}`).delete();
            await storageService.refFromURL(imtwitObj.attachmentUrl).delete();
        } else {

        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`imtwits/${imtwitObj.id}`).update({
            text:newTwit,
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewTwit(value);
    };

    return (
        <div>
            {
                editing ? (
                    <div className="content">
                        <form onSubmit={onSubmit}>
                            <input type="text" onChange={onChange} placeholder="Edit your twit" value={newTwit} required />
                            <button className="s_fill" onClick={toggleEditing}>취소하기</button>
                            <input className="s_fill" type="submit" value="수정완료" />
                        </form>
                    </div>
                ) : (
                    <div className="content">
                        {imtwitObj.attachmentUrl && (<img src={imtwitObj.attachmentUrl} width="350px" />)}
                        <h4>{imtwitObj.text}</h4>
                        {isOwner && (
                        <div className="contentBtns">
                            <button className="s_fill" onClick={onDeleteClick}>삭제하기</button>
                            <button className="s_fill" onClick={toggleEditing}>수정하기</button>
                        </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default Iamtwit