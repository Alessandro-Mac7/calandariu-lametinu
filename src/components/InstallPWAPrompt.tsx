import { useState, useEffect } from "react";
import { useInstallPWA } from "@/hooks/useInstallPWA";
import { X, Smartphone, Monitor } from "lucide-react";

type DeviceType = "android" | "ios" | "desktop" | "unknown";

const DISMISS_KEY = "pwa-prompt-dismissed";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const InstallPWAPrompt = () => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPWA();
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");

  useEffect(() => {
    // Don't show if already installed
    if (isInstalled) {
      return;
    }

    // Check if user dismissed recently
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const timeSinceDismiss = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismiss < DISMISS_DURATION) {
        return;
      }
    }

    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    let type: DeviceType = "unknown";

    if (/android/.test(userAgent)) {
      type = "android";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      type = "ios";
    } else if (!/mobile/.test(userAgent)) {
      type = "desktop";
    }

    setDeviceType(type);

    // Show prompt after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      setIsVisible(false);
    }
  };

  if (!isVisible || isInstalled) {
    return null;
  }

  const getInstructions = () => {
    switch (deviceType) {
      case "android":
        return {
          icon: <Smartphone className="w-8 h-8 text-primary" />,
          title: "Installa l'App",
          steps: isInstallable
            ? ["Clicca sul pulsante 'Installa' qui sotto"]
            : [
                "Tocca il menu del browser (⋮)",
                "Seleziona 'Aggiungi a schermata Home'",
                "Conferma l'installazione",
              ],
        };
      case "ios":
        return {
          icon: <Smartphone className="w-8 h-8 text-primary" />,
          title: "Aggiungi alla Home",
          steps: [
            "Tocca il pulsante Condividi",
            "Scorri e seleziona 'Aggiungi a Home'",
            "Tocca 'Aggiungi' in alto a destra",
          ],
        };
      case "desktop":
        return {
          icon: <Monitor className="w-8 h-8 text-primary" />,
          title: "Installa l'App",
          steps: isInstallable
            ? ["Clicca sul pulsante 'Installa' qui sotto"]
            : [
                "Cerca l'icona di installazione nella barra degli indirizzi",
                "Oppure apri il menu del browser e seleziona 'Installa'",
              ],
        };
      default:
        return {
          icon: <Smartphone className="w-8 h-8 text-primary" />,
          title: "Installa l'App",
          steps: ["Cerca l'opzione di installazione nel menu del tuo browser"],
        };
    }
  };

  const instructions = getInstructions();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-300"
        onClick={handleDismiss}
      />

      {/* Modal - Centered */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              {instructions.icon}
              <h3 className="text-lg font-semibold text-foreground">
                {instructions.title}
              </h3>
            </div>
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Installa l'app per un'esperienza migliore e accesso offline!
            </p>

            <ol className="space-y-2 text-sm text-foreground">
              {instructions.steps.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* Install Button (only for Android/Desktop with native prompt) */}
            {isInstallable && (deviceType === "android" || deviceType === "desktop") && (
              <button
                onClick={handleInstall}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Installa Ora
              </button>
            )}

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="w-full text-muted-foreground text-sm py-2 hover:text-foreground transition-colors"
            >
              Non ora
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
