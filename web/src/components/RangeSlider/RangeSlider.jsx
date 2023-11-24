import { useState, useEffect, useRef } from "react";
import noUiSlider from 'nouislider';
import '../../static/nouislider.css';

export default function RangeSlider({min, max, currentValue={}, setCurrentValue}) {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Initialize the slider when the component mounts
    const slider = sliderRef.current;

    noUiSlider.create(slider, {
      start: [currentValue.start, currentValue.end], // Initial values
      connect: true,
      range: {
        min: min,
        max: max,
      },
      // tooltips: [true, true],
      step: 1000,
    });

    // Update parent component when slider values change
    slider.noUiSlider.on('update', (values) => {
      const [start, end] = values.map(parseFloat);
      setCurrentValue({ start, end });
    });

    // Clean up the slider when the component unmounts
    return () => {
      slider.noUiSlider.destroy();
    };
  }, [min, max, setCurrentValue]);

  return( <div className="w-full absolute top-14 left-0 p-4 z-10 md:w-64 bg-gray-300"> 
    <div className="m-2" ref={sliderRef} /> 
    <div className="m-2 flex justify-between">
        <div>0</div>
        <div>30000</div>
    </div>
    </div>);
}
