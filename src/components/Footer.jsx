import React from "react";
import { motion } from "framer-motion";
import footerLogoPng from "../assets/images/be_footer_logo (1).png";
import footerLogoWebp from "../assets/images/be_footer_logo (1).webp";
import paypalSecure from "../assets/images/paypalsecure.png";
import norTon from "../assets/images/northon.png";
import Secure from "../assets/images/secure.png";
import Paypal from "../assets/images/paypal.jpg";
import visa from "../assets/images/visa.jpg";
import master from "../assets/images/mastercard.jpg";
import discovery from "../assets/images/discover.jpg";
import whatsApp from "../assets/images/whats.png";
import FaceBook from "../assets/images/fb.png";
import twitter from "../assets/images/twit.png";
import linkdin from "../assets/images/linkdn.png";
import insta from "../assets/images/instag.png";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <footer className="bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo Section */}
            <div className="md:col-span-3">
              <a href="/" className="block">
                <picture>
                  <source srcSet={footerLogoWebp} type="image/webp" />
                  <source srcSet={footerLogoPng} type="image/png" />
                  <img
                    src={footerLogoPng}
                    className="h-24"
                    alt="Brand Experts Logo"
                  />
                </picture>
              </a>
            </div>

            {/* Main Content Grid */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Us Section */}
              <div className="md:col-span-1">
                <h2 className="text-sm font-semibold mb-4">About us</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Brand Experts is an online sign printing company featuring an
                  intuitive design tool and high-grade signs that can help you
                  accomplish all your visual communication needs. Our platform
                  enables you to personalize your sign design online. Get a sign
                  made on trendy mediums such as canvas prints, car decals,
                  vinyl lettering and acrylic displays.
                </p>
              </div>

              {/* Quick Links Section */}
              <div className="md:col-span-1">
                <h2 className="text-sm font-semibold mb-4">Quick links</h2>
                <ul className="text-xs space-y-2">
                  <li>
                    <a href="/" className="text-gray-300 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products"
                      className="text-gray-300 hover:text-white"
                    >
                      All products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/templates"
                      className="text-gray-300 hover:text-white"
                    >
                      Templates
                    </a>
                  </li>
                  <li>
                    <a
                      href="/offers"
                      className="text-gray-300 hover:text-white"
                    >
                      Corporate Offers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/design"
                      className="text-gray-300 hover:text-white"
                    >
                      Design tool
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="text-gray-300 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Payment & Trust Section */}
              <div className="md:col-span-1">
                <div className="mb-6">
                  <h2 className="text-sm font-semibold mb-4">We accept</h2>
                  <div className="grid grid-cols-4 gap-2">
                    <img src={master} alt="Mastercard" className="h-6" />
                    <img src={visa} alt="Visa" className="h-6" />
                    <img src={discovery} alt="Discover" className="h-6" />
                    <img src={Paypal} alt="Apple Pay" className="h-6" />
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-semibold mb-4">Trust matters</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <img
                      src={Secure}
                      alt="Secure Badge"
                      className="h-10 w-24"
                    />
                    <img
                      src={paypalSecure}
                      alt="PayPal"
                      className="h-10 w-24"
                    />
                    <img src={norTon} alt="Norton" className="h-10 w-24" />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="md:col-span-1">
                <h2 className="text-sm font-semibold mb-4">Contact</h2>
                <div className="text-xs space-y-2">
                  <p className="text-gray-300">Brand Experts Advertising LLC</p>
                  <p className="text-gray-300">Sharjah Industrial Area 17,</p>
                  <p className="text-gray-300">S102 Ring Road, Sharjah</p>
                  <p className="text-gray-300">United Arab Emirates</p>
                  <p className="flex items-center">
                    <span className="mr-2">📞</span>
                    +971-06-531-4088
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span>
                    hello@brandexperts.ae
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-gray-400">
                Copyright © Brand Experts All rights reserved
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src={whatsApp} alt="WhatsApp" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src={insta} alt="Instagram" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src={FaceBook} alt="Facebook" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src={twitter} alt="Twitter" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src={linkdin} alt="LinkedIn" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
