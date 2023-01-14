import React, { useState } from "react";
import { authService } from "myBase";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <>
            <form className="login" onSubmit={onSubmit}>
                <input className="placehold" name ="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input className="placehold" name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input className="fill" type="submit" value={newAccount ? "Create Account" : "Sign in"} />
                {error}
            </form>
            <span className="stroke" onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;