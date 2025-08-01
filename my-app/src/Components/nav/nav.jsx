import React, { useState, useEffect, useRef } from 'react';
import './nav.css';
import { Link } from 'react-scroll';

const Nav = () => {
    let [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [show, setShow] = useState(true);
    const prevScrollY = useRef(0);

    const links = document.querySelectorAll(".navLink")
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            if (isDropdownOpen) {
                toggleDropdown()
            }
        })
    })

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
            isDropdownOpen = true;
            if (window.innerWidth >= 1000) {
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
            if (!isDropdownOpen) {
                dropdown.style.transform = `translate3d(0, 0, 0)`
                navbar.style.opacity = 0.3;
                setIsDropdownOpen(true)
            }
            else {
                dropdown.style.transform = `translate3d(0, -300px, 0)`
                navbar.style.opacity = 1.0;
                setIsDropdownOpen(false)
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
                    <Link to="news-section" spy={true} offset={0} smooth={true} duration={500} className="navLink">News</Link>
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
                        News
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav