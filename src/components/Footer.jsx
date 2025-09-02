import React from "react";
import { Mail, Phone, Github, Linkedin, Music } from "lucide-react";

function Footer() {
  return (
    <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg z-50">
      <div className="flex justify-center items-center gap-6 text-white">

      
        <a href="mailto:info@vibeify.com" className="hover:text-blue-400 hover:rotate-5 transition-all duration-200">
          <Mail size={20} />
        </a>
        <a href="tel:+9199999999" className="hover:text-blue-400 hover:rotate-5 transition-all duration-200">
          <Phone size={20} />
        </a>

  
        <a href="https://github.com/KrishndeepGoniyal" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:rotate-5 transition-all duration-200">
          <Github size={20}/>
        </a>
        <a href="https://linkedin.com/in/krishndeep-goniyal-564a23303" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:rotate-5 transition-all duration-200">
          <Linkedin size={20} />
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:rotate-5 transition-all duration-200">
          <Music size={20} />
        </a>

      </div>
    </footer>
  );
}

export default Footer;
