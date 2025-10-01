import { Card } from "@/components/ui/card";
import { DayData } from "@/data/calendar";

interface DayCardProps {
  day: DayData;
  monthDialect: string;
}

export const DayCard = ({ day, monthDialect }: DayCardProps) => {
  return (
    <div className="animate-fade-in">
      <Card className="p-6 shadow-soft hover:shadow-hover transition-smooth">
        <div className="space-y-4">
          {/* Date Header */}
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-5xl font-serif font-bold text-primary">
                {day.day}
              </h2>
              <div className="flex-1">
                <p className="text-xl font-semibold text-foreground">
                  {monthDialect}
                </p>
                <p className="text-base text-muted-foreground">
                  {day.weekday_dialect}
                </p>
              </div>
            </div>
          </div>

          {/* Saint */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Celebrazione del giorno
            </h3>
            <p className="text-base font-medium text-secondary">
              {day.celebration}
            </p>
          </div>

          {/* Aphorism */}
          <div className="pt-2">
            <h3 className="text-lg font-serif font-semibold text-primary mb-2">
              {day.aphorism.title}
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {day.aphorism.content}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
