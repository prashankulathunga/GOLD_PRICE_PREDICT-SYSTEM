import React, { useState } from "react";
import {
  CheckBadgeIcon,
  SquaresPlusIcon,
  CircleStackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, Outlet } from "react-router-dom";

// SidebarItem Component
const SidebarItem = ({ href, label, Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <div className="relative group">
      <Link
        to={href}
        className={`group flex items-center p-3 mb-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
          isActive
            ? "bg-yellow-100 text-gray-800 shadow-lg"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-md"
        }`}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>{label}</span>
      </Link>
    </div>
  );
};

// Navigation Items
const navigationItems = [
  { href: "/dashboard", label: "Dashboard", Icon: SquaresPlusIcon },
  { href: "/pawn-item", label: "Pawn Item", Icon: CircleStackIcon },
  { href: "/interest", label: "Interest Rate", Icon: UserGroupIcon },
];

// SidebarLayout Component
const SidebarLayout = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Collapsible Sidebar */}
      <div
        className={`fixed flex flex-col justify-start ${
          isCollapsed ? "w-16" : "w-64"
        } h-screen bg-white border-gray-100 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 m-2 text-gray-600 rounded-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 hover:bg-yellow-50 focus:outline-none"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ArrowRightIcon className="w-5 h-5 text-gray-200" />
          ) : (
            <div className="flex items-center gap-2 shadow-xl drop-shadow-lg">
              <ArrowLeftIcon className="w-5 h-5 text-gray-200" />
              <span className="text-xs font-medium text-gray-200">
                Empowering Financial Decisions
              </span>
            </div>
          )}
        </button>

        {/* Header Section */}
        {!isCollapsed && (
          <div className="p-4 pt-4 text-center">
            <h1 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-black to-gray-700">
              PAWNING ANALYTICS
            </h1>
          </div>
        )}

        {/* Account Section */}
        <div className="flex flex-col items-center justify-center px-2 py-6 border-b">
          <span
            className={`inline-flex items-center justify-center ${
              isCollapsed ? "w-10 h-10" : "w-20 h-20"
            } shadow rounded-full bg-gray-500/60 text-white font-semibold leading-none text-xl`}
            aria-label="User Profile"
          >
            {user?.initials || "U"}
          </span>
          {!isCollapsed && (
            <>
              <p className="flex items-center gap-1 mt-2 font-semibold text-gray-800 text-md">
                {user?.name || "User"}{" "}
                <CheckBadgeIcon className="w-4 h-4 text-blue-400" />
              </p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {navigationItems.map((item, index) => (
            <SidebarItem
              key={index}
              href={item.href}
              label={!isCollapsed ? item.label : ""}
              Icon={item.Icon}
            />
          ))}
        </nav>

        {/* Footer Section */}
        {!isCollapsed && (
          <div className="p-4 mt-auto border-t">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Pawning Analytics
            </p>
            <p className="text-xs text-gray-400">All rights reserved.</p>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 ${
          isCollapsed ? "ml-16" : "ml-64"
        } bg-gradient-to-r from-yellow-50/10 via-gray-200 to-gray-50 transition-all duration-300`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
