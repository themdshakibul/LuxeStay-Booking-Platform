"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { XIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-linear-to-tr from-violet-600 to-indigo-500 p-2 rounded-lg text-white">
              <FaHome size={20} />
            </div>
            <span className="font-bold text-lg text-white tracking-wider">
              LuxeStay
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Connecting renters with exceptional hosts globally. Explore verified
            luxury properties with secure workflows and Stripe billing.
          </p>
          <div className="flex items-center gap-4 text-slate-300 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <FaFacebook size={18} />
            </a>
            {/* New X Rebranded Logo instead of old Twitter bird */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <XIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide uppercase">
            Discover
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link
                href="/properties?propertyType=Apartment"
                className="hover:text-white transition-colors"
              >
                Apartments
              </Link>
            </li>
            <li>
              <Link
                href="/properties?propertyType=Villa"
                className="hover:text-white transition-colors"
              >
                Villas
              </Link>
            </li>
            <li>
              <Link
                href="/properties?propertyType=Penthouse"
                className="hover:text-white transition-colors"
              >
                Penthouses
              </Link>
            </li>
            <li>
              <Link
                href="/properties"
                className="hover:text-white transition-colors"
              >
                All Listings
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact/Newsletter */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide uppercase">
            Contact Info
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm mb-4">
            <li>Email: support@luxestay.com</li>
            <li>Phone: +1 (555) 019-2834</li>
            <li>Location: 742 Evergreen Terrace, Springfield</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 text-center text-xs tracking-wider">
        <p>
          &copy; {new Date().getFullYear()} LuxeStay Inc. All rights reserved.
          Powered by Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
