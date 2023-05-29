import { useEffect, useRef } from "react";

export const Toggle = ({ setToggle, preSetValue }) => {
  const barRef = useRef();
  useEffect(() => {
    if (preSetValue) {
      setToggle(true);
      barRef.current.classList.add("bar-on");
    }
  }, []);

  return (
    <div className="bar" ref={barRef} onClick={handleToggle}>
      <div className="circle"></div>
    </div>
  );
  function handleToggle() {
    setToggle((prev) => !prev);
    barRef.current.classList.toggle("bar-on");
  }
};
