import { useState } from "react";
import { introData } from "@/data/intro";
import { Card } from "@/components/ui/card";
import { RichText } from "@/components/RichText";
import { BookOpen, Minimize2 } from "lucide-react";

export const IntroSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative w-full flex justify-center items-start">
      {/* Hint text when collapsed - positioned absolutely above */}

      <div
        className={`
          cursor-pointer select-none
          transition-all duration-[900ms] ease-out
          ${isCollapsed ? 'w-16' : 'w-full'}
        `}
        onClick={toggleCollapse}
      >
        <Card
          className={`
            shadow-soft bg-gradient-to-br from-card to-muted/30
            transition-all duration-[900ms] ease-out
            overflow-hidden mx-auto
            ${isCollapsed
              ? 'p-0 rounded-full w-16 h-16 hover:scale-110 hover:shadow-hover'
              : 'p-6 md:p-8 rounded-2xl hover:shadow-hover w-full'
            }
          `}
          style={{
            transformOrigin: 'center center',
          }}
        >
        {/* Collapsed State - Circular Button */}
        {isCollapsed && (
          <div className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <BookOpen className="w-8 h-8 text-primary animate-in spin-in-180 duration-700" />
          </div>
        )}

        {/* Expanded State - Full Content */}
        {!isCollapsed && (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <div className="flex items-start text-justify gap-4">
              <div className="space-y-3 flex-1">
                {/* Title with collapse icon */}
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl text-center md:text-2xl font-serif font-bold text-primary flex-1">
                    {introData.title}
                  </h2>
                  <Minimize2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors flex-shrink-0" />
                </div>

                {/* Rich Text Content */}
                <div className="text-foreground leading-relaxed">
                  <RichText content={introData.content} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      </div>
    </div>
  );
};
