import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "myBase";
import React from "react";

const Auth = () => {
    
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div className="auth">
            <AuthForm />
            <div>
                <div className="social">
                    <button className="fill" onClick={onSocialClick} name="google">Continue with Google</button>
                    <button className="fill" onClick={onSocialClick} name="github">Continue with Github</button>
                </div>
            </div>
        </div>
    )
};
export default Auth;