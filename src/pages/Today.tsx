import { useState, useEffect } from "react";
import { calendarData } from "@/data/calendar";
import { DayCard } from "@/components/DayCard";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { DayData } from "@/data/calendar";

const Today = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDayData, setCurrentDayData] = useState<{
    day: DayData;
    monthDialect: string;
  } | null>(null);

  useEffect(() => {
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    
    const monthData = calendarData.months[month];
    const dayData = monthData?.days.find(d => d.day === day);

    if (dayData && monthData) {
      setCurrentDayData({
        day: dayData,
        monthDialect: monthData.dialect
      });
    } else {
      setCurrentDayData(null);
    }
  }, [currentDate]);

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Image - Fixed */}
      <div className="sticky top-0 z-50">
        <Header 
          title="Oggi nel Dialetto"
          subtitle="Il giorno corrente con santo e proverbio"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Current Date Display */}
        <div className="mb-4 text-center">
          <p className="text-sm text-muted-foreground">
            {currentDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

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

        {/* Day Content */}
        {currentDayData ? (
          <DayCard
            day={currentDayData.day}
            monthDialect={currentDayData.monthDialect}
          />
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
