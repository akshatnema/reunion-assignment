import { Dropdown } from 'flowbite-react';

export default function DropdownComponent({ selectedValue, setSelectedValue, options = [] }) {
    return (
        <div>
            <Dropdown label="Dropdown button">
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    )
}
