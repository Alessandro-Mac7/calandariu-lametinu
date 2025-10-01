import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { useDayData } from "@/hooks/useDayData";
import { DayCard } from "@/components/DayCard";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

const Today = () => {
  const { currentDate, goToNextDay, goToPreviousDay, goToToday } =
    useCalendarNavigation();
  const currentDayData = useDayData(currentDate);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Image - Fixed */}
      <div className="sticky top-0 z-50">
        <Header 
          title="Chi juarnu è ohji?"
          subtitle="Ieri, oggi e dumani in dialetto lametino"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-6 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousDay}
            className="shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            onClick={goToToday}
            className="flex-1 max-w-xs"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Oggi
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextDay}
            className="shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Day Content with Header */}
        {currentDayData ? (
          <div className="space-y-6">
            {/* Date Header - same style as CalendarView Drawer */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-center gap-6">
                {/* Number */}
                <h2 className="text-7xl md:text-8xl font-serif font-bold text-primary leading-none">
                  {currentDayData.day.day}
                </h2>
                {/* Text container */}
                <div className="flex flex-col pt-8 gap-2">
                  <h3 className="text-3xl md:text-4xl font-semibold text-foreground leading-none">
                    {currentDayData.monthDialect}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-none">
                    {currentDayData.day.weekday_dialect}
                  </p>
                </div>
              </div>
              {/* Italian Date */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  {currentDate.toLocaleDateString('it-IT', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Day Card without header */}
            <DayCard
              day={currentDayData.day}
              monthDialect={currentDayData.monthDialect}
              hideHeader={true}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nessun contenuto disponibile per questo giorno.
            </p>
            <Button
              variant="link"
              onClick={goToToday}
              className="mt-4"
            >
              Torna a oggi
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Today;
