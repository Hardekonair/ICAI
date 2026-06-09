import React from 'react'
import { NavLink } from 'react-router';
import { LayoutDashboard, PlayCircle, HelpCircle, BarChart3,Settings, Sidebar} from "lucide-react";


const SideBar = () => {
    const navItems = [
        { name: "Dashboard", path: "/homepage", icon: LayoutDashboard },
        { name: "Practice", path: "/practice", icon: PlayCircle },
        { name: "Questions", path: "/questions", icon: HelpCircle },
        { name: "Analytics", path: "/analytics", icon: BarChart3 },
        { name: "Settings", path: "/settings", icon: Settings },
    ];
  return (
    <div>
      <aside className="w-[250px] bg-white border-r p-4 hidden md:flex flex-col overflow-y-auto h-full sticky top-[72px] max-h-[calc(99vh-4rem)]">

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto text-sm text-gray-400">
            © 2026 Interview AI
          </div>
        </aside>
    </div>
  )
}

export default SideBar
