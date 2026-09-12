import { useState } from "react";
import {
  User,
  Palette,
  Shield,
  ChevronRight,
} from "lucide-react";

import ProfilePage from "./ProfilePage";
import AppearancePage from "./AppearancePage";
import PrivacySecurityPage from "./PrivacySecurityPage";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    {
      id: "profile",
      title: "Profile",
      description: "Manage your personal information",
      icon: User,
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize your interface",
      icon: Palette,
    },
    {
      id: "security",
      title: "Privacy & Security",
      description: "Manage your account and personal data",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and personalize your experience.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="bg-white rounded-2xl border border-gray-200 p-3 h-fit">

            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-left
                    transition-all
                    mb-1
                    ${
                      isActive
                        ? "bg-yellow-50 text-yellow-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >

                  {/* Icon */}
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-yellow-600"
                        : "text-gray-400"
                    }
                  />

                  {/* Text */}
                  <div className="flex-1 min-w-0">

                    <p
                      className={`text-sm font-semibold ${
                        isActive
                          ? "text-yellow-700"
                          : "text-gray-700"
                      }`}
                    >
                      {section.title}
                    </p>

                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {section.description}
                    </p>

                  </div>

                  {/* Arrow */}
                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="text-yellow-600"
                    />
                  )}

                </button>
              );
            })}

          </aside>

          {/* Settings Content */}
          <main className="bg-white rounded-2xl border border-gray-200 w">

            {activeSection === "profile" && (
              <ProfilePage />
            )}

            {activeSection === "appearance" && (
              <AppearancePage />
            )}

            {activeSection === "security" && (
              <PrivacySecurityPage />
            )}

          </main>

        </div>
      </div>

    </div>
  );
};

export default SettingsPage;