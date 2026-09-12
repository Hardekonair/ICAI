import {
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AppearancePage = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: "light",
      title: "Light",
      description: "Clean and bright",
      icon: Sun,
    },
    {
      id: "dark",
      title: "Dark",
      description: "Easy on the eyes",
      icon: Moon,
    },
    {
      id: "system",
      title: "System",
      description: "Follow system preference",
      icon: Monitor,
    },
  ];

  return (
    <div>

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          Appearance
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Customize how the platform looks.
        </p>
      </div>

      {/* Content */}
      <div className="p-6">

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Theme
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Choose your preferred appearance.
          </p>
        </div>

        {/* Theme Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          {themes.map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`
                  p-5
                  rounded-xl
                  border-2
                  text-left
                  transition-all
                  ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >

                {/* Icon */}
                <div
                  className={`
                    w-10
                    h-10
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    mb-4
                    ${
                      isSelected
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* Title */}
                <div className="font-semibold text-gray-800">
                  {item.title}
                </div>

                {/* Description */}
                <div className="text-xs text-gray-400 mt-1">
                  {item.description}
                </div>

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default AppearancePage;
