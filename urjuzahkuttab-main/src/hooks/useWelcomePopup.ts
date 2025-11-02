import { useState, useEffect } from 'react';

const WELCOME_POPUP_KEY = 'islamic-chronicle-welcome-shown';

export const useWelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasBeenShown = localStorage.getItem(WELCOME_POPUP_KEY);
    
    if (!hasBeenShown) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Mark popup as shown in localStorage
    localStorage.setItem(WELCOME_POPUP_KEY, 'true');
  };

  const resetPopup = () => {
    localStorage.removeItem(WELCOME_POPUP_KEY);
    setIsOpen(true);
  };

  return {
    isOpen,
    closePopup,
    resetPopup
  };
};