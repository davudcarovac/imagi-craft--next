"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">FrostyImage</h3>
          <p className="text-sm leading-relaxed">
            FrostyImage is a SaaS platform that provides advanced image
            processing tools. Secure, fast, and user-friendly for creators and
            businesses worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.iubenda.com/privacy-policy/14894198"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.iubenda.com/privacy-policy/14894198/cookie-policy"
                className="iubenda-white iubenda-noiframe iubenda-embed"
                title="Cookie Policy"
              >
                Cookie Policy
              </a>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:support@frostyimage.com"
                className="hover:text-white transition-colors"
              >
                support@frostyimage.com
              </a>
            </li>
            <li>Novi Pazar, Serbia</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-8 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FrostyImage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
