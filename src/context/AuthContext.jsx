import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState(null); // The actual PIN
    const [isPinSet, setIsPinSet] = useState(false); // If a PIN exists in storage
    const [lastActivity, setLastActivity] = useState(Date.now());

    // Constants
    const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

    // Load state on mount
    useEffect(() => {
        const storedPin = localStorage.getItem('fire_pin');
        const sessionPin = sessionStorage.getItem('fire_pin_session');

        if (storedPin || sessionPin) {
            setIsPinSet(true);
            // If we have a stored PIN, we keep it in state "conceptually", 
            // but user still needs to enter it to unlock if the session is fresh.
            // Actually, if "Remember Me" was used (localStorage), we might want to ask for it again on reload?
            // Usually "Remember Me" for PIN means "I don't need to set it again", but implies locking.
            // Let's say: If PIN is set, user starts LOCKED.
        }
    }, []);

    // Auto-lock timer
    useEffect(() => {
        if (!isAuthenticated) return;

        const checkTimeout = () => {
            if (Date.now() - lastActivity > TIMEOUT_MS) {
                lockApp();
            }
        };

        const interval = setInterval(checkTimeout, 10000); // Check every 10s
        return () => clearInterval(interval);
    }, [isAuthenticated, lastActivity]);

    // Activity listeners
    useEffect(() => {
        const updateActivity = () => setLastActivity(Date.now());
        window.addEventListener('mousemove', updateActivity);
        window.addEventListener('keydown', updateActivity);
        window.addEventListener('click', updateActivity);
        return () => {
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
            window.removeEventListener('click', updateActivity);
        };
    }, []);

    const setAppPin = (newPin, rememberMe = false) => {
        setPin(newPin);
        setIsPinSet(true);
        setIsAuthenticated(true); // Setting it automatically logs you in
        setLastActivity(Date.now());

        if (rememberMe) {
            localStorage.setItem('fire_pin', newPin);
        } else {
            sessionStorage.setItem('fire_pin_session', newPin);
        }
    };

    const verifyPin = (inputPin) => {
        const stored = localStorage.getItem('fire_pin') || sessionStorage.getItem('fire_pin_session');
        // If we are in "setup" mode but state lost (e.g. reload and no storage), we can't verify.
        // implementation detail: 'pin' state might be empty on reload. We verify against Storage.

        if (inputPin === stored) {
            setIsAuthenticated(true);
            setLastActivity(Date.now());
            return true;
        }
        return false;
    };

    const lockApp = () => {
        setIsAuthenticated(false);
    };

    // Helper to check if we just need to set a pin (First time user)
    const requiresSetup = !isPinSet;

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            requiresSetup,
            setAppPin,
            verifyPin,
            lockApp
        }}>
            {children}
        </AuthContext.Provider>
    );
};
