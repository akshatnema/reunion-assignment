import { useState, useRef } from "react";

export default function RangeSlider({min, max, initialValue}) {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef();

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      const newValue = clamp(Math.round(percent * (max - min) + min), min, max);
      setValue(newValue);
    }
  };

  const handleClick = (event) => {
    if (!isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      const newValue = clamp(Math.round(percent * (max - min) + min), min, max);
      setValue(newValue);
    }
  };
  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <input type="range" min={min} max={max} value={value} className="range-primary" readOnly />
      {isDragging && <div className="drag-overlay" />}
    </div>
  )
}
