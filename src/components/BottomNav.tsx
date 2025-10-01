import { Home, Calendar, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

export const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Oggi" },
    { to: "/calendar", icon: Calendar, label: "Calendario" },
    { to: "/dictionary", icon: BookOpen, label: "Dizionario" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="max-w-md mx-auto flex items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex flex-1 min-w-0 flex-col items-center justify-center gap-1 py-2 transition-smooth ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
