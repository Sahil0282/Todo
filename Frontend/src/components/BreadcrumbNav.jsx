import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
const location=useLocation();
const pathnames=location.pathname.split("/").filter((x)=>x);
 return (
  <nav>
    <ul className="flex gap-2">
        <li>
          <Link to="/" className="text-gray-500 hover:underline">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={path} className="text-gray-500 hover:underline">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
  </nav>
 );

};

export default BreadcrumbNav;
