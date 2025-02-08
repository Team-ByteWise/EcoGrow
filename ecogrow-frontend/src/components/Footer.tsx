import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f0fdf4] text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-700">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-700">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-700">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-700">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-700">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-700">
                <Facebook />
              </a>
              <a href="#" className="hover:text-green-700">
                <Twitter />
              </a>
              <a href="#" className="hover:text-green-700">
                <Instagram />
              </a>
              <a href="#" className="hover:text-green-700">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-end items-center gap-x-4">
            <img src="logo.png" alt="" className="h-[100px]" />
            <p className="text-4xl font-bold">EcoGrow</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 EcoGrow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
