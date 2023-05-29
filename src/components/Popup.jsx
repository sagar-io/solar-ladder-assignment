import { useEffect, useRef } from "react";

export const Popup = ({ popupText, setShowPopup }) => {
  const popupRef = useRef();

  useEffect(() => {
    // popupRef.current.style.transform = 'translateY(0%)'
    const timeout = 
    setTimeout(() => {
      // popupRef.current.style.transform = 'translateY(-150%)'
      setShowPopup(false);
    }, 2000);
    return () => timeout;
  }, []);

  return (
    <div className="popup" ref={popupRef}> 
      <p>{popupText}</p>
    </div>
  );
};
