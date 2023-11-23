import { useState, useRef, useEffect } from 'react';

export default function DropdownComponent({ selectedValue, label, setSelectedValue, options = [] }) {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectDropDown = (option) => {
        setSelectedValue(option);
        setIsOpen(false);
    }

    // useEffect has been used to close the dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex justify-between md:justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-700 border border-transparent enabled:hover:bg-blue-800 focus:ring-blue-300 rounded-lg"
            >
                {selectedValue ? selectedValue : label}
                <svg className="w-2.5 h-2.5 ms-3 my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path></svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-full origin-top-right bg-white rounded-md shadow-lg min-w-48 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option, index) => (<div key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSelectDropDown(option)}>{option}</div>))}
                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSelectDropDown('')}>Select All</div>
                    </div>
                </div>
            )}
        </div>
    )
}
