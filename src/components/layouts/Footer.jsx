import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
                <aside>
                    <Logo></Logo>
                    <p>
                        Care.IO Ltd.
                        <br />
                        Providing reliable Services since 2024
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Baby Care</a>
                    <a className="link link-hover">Elderly Care</a>
                    <a className="link link-hover">Patient Care</a>
                    <a className="link link-hover">Special Needs</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-content/10">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Care.IO Ltd</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;