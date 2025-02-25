import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-sm text-gray-400">
          This task management platform is designed for efficiency, helping users stay organized and complete tasks with ease.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-sm text-gray-400">Email: sahildhawane28@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +91 8380837674</p>
          <p className="text-sm text-gray-400">Location: Pune, India</p>
          <p className="text-sm text-gray-400">
            <a href="https://github.com/Sahil0282" className="hover:text-white">GitHub</a> | 
            <a href="https://www.linkedin.com/in/sahil-dhawane-4391b3332/" className="hover:text-white"> LinkedIn</a> | 
            <a href="https://www.instagram.com/sahil_dhawane/" className="hover:text-white"> Instagram</a>
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Sahil Dhawane. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
