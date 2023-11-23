import { Link } from 'react-router-dom';
import { Navbar, Button } from 'flowbite-react';

export default function NavbarComponent() {
    const navMenus = ['Home', 'About', 'Services', 'Pricing', 'Contact']
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="https://flowbite-react.com">
                <img src="/logo.png" className="mr-3 h-6 sm:h-10" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <div className="flex gap-2 md:order-2">
                <Button className='hidden md:block' color='blue' outline>Login</Button>
                <Button className='hidden md:block' color='blue'>Sign Up</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {navMenus.map((menu, index) => (<Navbar.Link className='text-lg' key={index} href="#">{menu}</Navbar.Link>))}
            </Navbar.Collapse>
        </Navbar>
    )
}
