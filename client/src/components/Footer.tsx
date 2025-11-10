"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#1aac83] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <svg
              className="h-6 w-6 mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <h3 className="text-xl font-bold text-white">FrostyImage</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            FrostyImage is a SaaS platform providing advanced image processing
            tools. Secure, fast, and user-friendly for creators and businesses
            worldwide.
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-[#daf0ea] transition-colors"
              aria-label="Twitter"
            >
              <i className="pi pi-twitter text-lg" />
            </a>
            <a
              href="#"
              className="text-white hover:text-[#daf0ea] transition-colors"
              aria-label="Facebook"
            >
              <i className="pi pi-facebook text-lg" />
            </a>
            <a
              href="#"
              className="text-white hover:text-[#daf0ea] transition-colors"
              aria-label="Instagram"
            >
              <i className="pi pi-instagram text-lg" />
            </a>
            <a
              href="#"
              className="text-white hover:text-[#daf0ea] transition-colors"
              aria-label="LinkedIn"
            >
              <i className="pi pi-linkedin text-lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                // href="https://www.iubenda.com/privacy-policy/14894198"
                href="/privacy-policy"
                className="hover:text-[#daf0ea] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <a
                href="https://www.iubenda.com/privacy-policy/14894198/cookie-policy"
                className="hover:text-[#daf0ea] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookie Policy
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                href="/terms-and-conditions"
                className="hover:text-[#daf0ea] transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <i className="pi pi-envelope text-white" />
              <a
                href="mailto:support@frostyimage.com"
                className="hover:text-[#daf0ea] transition-colors"
              >
                support@frostyimage.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="pi pi-map-marker text-white" />
              <span>Serbia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#daf0ea] mt-8 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm text-white mb-4 md:mb-0">
            © {currentYear} FrostyImage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
