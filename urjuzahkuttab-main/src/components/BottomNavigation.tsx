import { Home, Calendar, Download, Brain, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Timeline", path: "/timeline" },
  { icon: Download, label: "Download", path: "/download" },
  { icon: Brain, label: "Quiz", path: "/quiz" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t bg-background/95 backdrop-blur-sm shadow-lg border-border/50">
      <nav className="px-4 py-3 safe-area-inset-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground bg-primary shadow-lg"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </Card>
  );
};

export default BottomNavigation;