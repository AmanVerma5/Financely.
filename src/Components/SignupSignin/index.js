import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import { auth,db,provider } from "../../fierbase";
import './style.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignupSignin=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [loginForm,setLoginForm]=useState(false);
    const navigate=useNavigate();

    function signUpWithEmail(){
        setLoading(true);
        if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
            if (password === confirmPassword) {
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user);
                  toast.success("User Created!");
                  setLoading(false);
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  createDoc(user);
                  navigate("/dashboard");
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  toast.error(errorMessage);
                  setLoading(false);
                });
            }else{
                toast.error("Password do not match!")
                setLoading(false);
            }
        }else{
            toast.error("All fields are mandatory!")
            setLoading(false);
        }
    }


    async function createDoc(user){

        if(!user) return;

        const userRef=doc(db,"users",user.uid);
        const userData=await getDoc(userRef);

        if(!userData.exists()){
            try{
                await setDoc(doc(db, "users", user.uid), {
                    name:user.displayName?user.displayName:name,
                    email:user.email,
                    photoURL:user.photoURL?user.photoURL:"",
                    createdAt:new Date()
                });
            }catch(e){
                toast.error(e.message);
            }
        }
    }

    function loginUsingEmail(){
        setLoading(true);
        if(email!=="" && password!==""){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                    const user = userCredential.user;
                    toast.success("Login Successful!");
                    console.log(user);
                    setLoading(false);
                    navigate("/dashboard");
                 // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false);
                });
        }else{
            toast.error("All fields are mandatory!")
            setLoading(false);
        }
    }

    function googleAuth(){
        setLoading(true);


        try{
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                  GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                toast.success("User Authenticated");
                createDoc(user);
                setLoading(false);
                navigate('/dashboard');
              })
              .catch((error) => { 
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
              });
        }catch(e){
            toast.error(e.message);
        }
    }

    return(
        <>
           {
            loginForm?
            <div className="signup-wrapper">
                <h2 className="title">Log In on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
                <form>
                    <Input label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} type={"email"}/>
                    <Input label={"Password"} state={password} setState={setPassword} placeholder={"Example123"} type={"password"}/>
                    <Button text={loading?"Loading...":"Log In with Email and Password"} onClick={loginUsingEmail} disabled={loading}/>
                    <div className="or">or</div>
                    <Button text={loading?"Loading...":"Log In with Google"} blue={"true"} onClick={googleAuth}/>
                    <p className="p-login" onClick={()=>setLoginForm(false)}>Or Don't Have An Account? Click Here.</p>
                </form>
            </div>
            :
            <div className="signup-wrapper">
                <h2 className="title">Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
                <form>
                    <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} type={"text"}/>
                    <Input label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} type={"email"}/>
                    <Input label={"Password"} state={password} setState={setPassword} placeholder={"Example123"} type={"password"}/>
                    <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example123"} type={"password"}/>
                    <Button text={loading?"Loading...":"Sign Up with Email and Password"} onClick={signUpWithEmail} disabled={loading}/>
                    <div className="or">or</div>
                    <Button text={loading?"Loading...":"Sign Up with Google"} blue={"true"} onClick={googleAuth}/>
                    <p className="p-login" onClick={()=>setLoginForm(true)}>Or Have An Account Already? Click Here.</p>
                </form>
            </div>
           }
        </>
    )
}



export default SignupSignin;