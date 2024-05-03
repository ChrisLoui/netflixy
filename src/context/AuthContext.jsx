import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {auth, db} from "../services/firebase"
import {doc, setDoc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user, setUser] = useState({});

    useEffect(()=> {
        const unsubsribe =onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });

        return()=>{
            unsubsribe();
        }
    }, [])

    function signUP(email, password){
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            favshows: [],
        });
    }

    function logIn(email, password){
       return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    return (
        <AuthContext.Provider value={{user, signUP, logIn, logOut}}>
            {children}
       </AuthContext.Provider>
    )
    
}

export function UserAuth() {
    return useContext(AuthContext);
}