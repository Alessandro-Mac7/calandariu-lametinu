import { introData } from "@/data/intro";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export const IntroSection = () => {
  return (
    <Card className="p-6 md:p-8 shadow-soft bg-gradient-to-br from-card to-muted/30">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">
            {introData.title}
          </h2>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {introData.content}
          </p>
          <p className="text-sm text-muted-foreground italic pt-2">
            — Benedetto Croce
          </p>
        </div>
      </div>
    </Card>
  );
};
