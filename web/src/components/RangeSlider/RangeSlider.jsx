import { useState, useRef } from "react";

export default function RangeSlider({min, max, currentValue, setCurrentValue}) {
  const [value, setValue] = useState(currentValue);
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
      setCurrentValue(newValue)
    }
  };

  const handleClick = (event) => {
    if (!isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      const newValue = clamp(Math.round(percent * (max - min) + min), min, max);
      setValue(newValue);
      setCurrentValue(newValue)
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
      className="w-full absolute top-14 left-0 p-4 z-10 md:w-64 bg-gray-300"
    >
      <input type="range" min={min} max={max} step="1000" value={value} className="w-full range-secondary" />
      {isDragging && <div className="drag-overlay" />}
      <div>
        <div className="flex justify-between">
          <div>Min: {min}</div>
          <div>Max: {max}</div>
        </div>
        <div className="flex justify-between">
          <div>Current value: {value}</div>
        </div>
      </div>
    </div>
  )
}
