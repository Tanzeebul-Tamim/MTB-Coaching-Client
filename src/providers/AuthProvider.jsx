import { useState, createContext } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const [supportGlow, setSupportGlow] = useState(false);

    const handleScrollGlow = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        setSupportGlow(true);
        setTimeout(() => setSupportGlow(false), 2000);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, image, contactNo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
            phoneNumber: contactNo,
        });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const emailVerification = (user) => {
        return sendEmailVerification(user);
    };

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        setLoading,
        signIn,
        logOut,
        googleSignIn,
        updateUser,
        booking,
        setBooking,
        emailVerification,
        passwordReset,
        supportGlow,
        handleScrollGlow,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
