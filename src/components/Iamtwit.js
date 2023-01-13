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
                    <>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} placeholder="Edit your twit" value={newTwit} required />
                        <button onClick={toggleEditing}>Cancel</button>
                        <input type="submit" value="Update Twit" />
                    </form>
                    </>
                ) : (
                    <>
                        <h4>{imtwitObj.text}</h4>
                        {imtwitObj.attachmentUrl && (<img src={imtwitObj.attachmentUrl} width="80px" height="80px" />)}
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete twit</button>
                            <button onClick={toggleEditing}>Edit twit</button>
                        </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Iamtwit