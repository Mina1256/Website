import React, { useState, useEffect, useRef } from 'react';
import './nav.css';
import { Link } from 'react-scroll';

const Nav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isDropdownOpenRef = useRef(isDropdownOpen);
    const [show, setShow] = useState(true);
    const prevScrollY = useRef(0);

    useEffect(() => {
        isDropdownOpenRef.current = isDropdownOpen;
    }, [isDropdownOpen]);

    useEffect(() => {
        const handleNavLinkClick = () => {
            if (isDropdownOpenRef.current) {
                toggleDropdown();
            }
        };

        const links = document.querySelectorAll(".dropdown .navLink");
        links.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', handleNavLinkClick);
            });
        };
    }, [isDropdownOpen]);

    const controlNavbar = ()=>{
        const dropdown = document.querySelector(".dropdown");
        if (dropdown) {
            const rect = dropdown.getBoundingClientRect();
            if (rect.y == -300) {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY < prevScrollY.current) {
                    setShow(true);
                }
                else if (currentScrollY > 100) {
                    setShow(false);
                }

                prevScrollY.current = currentScrollY;
            }
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1000) {
                isDropdownOpen = true;
                toggleDropdown();
            }
        })

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])

    const toggleDropdown = () => {
        const dropdown = document.querySelector(".dropdown");
        const navbar = document.querySelector(".navbar")

        if (dropdown) {
            if (!isDropdownOpenRef.current) {
                dropdown.style.transform = `translate3d(0, 0, 0)`
                navbar.style.opacity = 0.3;
                // setIsDropdownOpen(true);
                isDropdownOpenRef.current = true;
            }
            else {
                dropdown.style.transform = `translate3d(0, -300px, 0)`
                navbar.style.opacity = 1.0;
                // setIsDropdownOpen(false);
                isDropdownOpenRef.current = false;
            }
        }
    };

    return (
        <div>
            <nav className={`navbar ${show ? '' : 'hidden'}`}>
                <h2 className="name"> Mina Mikhail</h2>
                <div className="navbarMenu">
                    <Link to="about-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">Home</Link>
                    <Link to="experience-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">Experiences</Link>
                    <Link to="projects-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">Projects</Link>
                    <Link to="news-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">Achievements</Link>
                </div>

                <div className="burger" onClick={toggleDropdown}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>

            <div className="dropdown">
                <div className="dropdownMenu">
                    <Link to="about-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">
                        Home
                    </Link>
                    <Link to="experience-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">
                        Experiences
                    </Link>
                    <Link to="projects-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">
                        Projects
                    </Link>
                    <Link to="news-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">
                        Achievements
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav