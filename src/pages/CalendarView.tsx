import { useState } from "react";
import { getAllMonths } from "@/services/calendarService";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { IntroSection } from "@/components/IntroSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DayCard } from "@/components/DayCard";
import type { DayData } from "@/data/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

const CalendarView = () => {
  const [selectedDay, setSelectedDay] = useState<{
    day: DayData;
    monthDialect: string;
  } | null>(null);

  const months = getAllMonths();

  const handleDayClick = (day: DayData, monthDialect: string) => {
    setSelectedDay({ day, monthDialect });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Image - Fixed */}
      <div className="sticky top-0 z-50">
        <Header 
          title="Calendariu Lametino"
          subtitle="Aforismi e celebrazioni del 2026"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Intro Section */}
        <IntroSection />

        {/* Month Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-primary text-center">
            Sfoglia i Mesi
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {months.map((month, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 shadow-soft hover:shadow-hover transition-smooth h-full">
                    <div className="space-y-4">
                      {/* Month Header */}
                      <div className="text-center border-b border-border pb-3">
                        <h3 className="text-2xl font-serif font-bold text-primary">
                          {month.dialect}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {month.name}
                        </p>
                      </div>

                      {/* Days Grid or Empty State */}
                      {month.days.length > 0 ? (
                        <div className="grid grid-cols-7 gap-1">
                          {month.days.map((day) => (
                            <button
                              key={day.day}
                              onClick={() => handleDayClick(day, month.dialect)}
                              className="aspect-square flex items-center justify-center text-sm font-medium rounded hover:bg-primary/10 transition-smooth border border-border"
                            >
                              {day.day}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-sm text-muted-foreground">
                            In arrivo...
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative left-0 translate-y-0" />
              <CarouselNext className="relative right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Drawer for Selected Day */}
        <Drawer open={selectedDay !== null} onOpenChange={(open) => !open && setSelectedDay(null)}>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader className="border-b border-border pb-6 pt-6">
              <div className="flex items-center justify-center relative">
                {/* Date Header - centered */}
                <div className="flex items-center gap-6">
                  {/* Number */}
                  <h2 className="text-7xl md:text-8xl font-serif font-bold text-primary leading-none">
                    {selectedDay?.day.day}
                  </h2>
                  {/* Text container */}
                  <div className="flex flex-col pt-8 gap-2">
                    <DrawerTitle className="text-3xl md:text-4xl font-semibold text-foreground leading-none">
                      {selectedDay?.monthDialect}
                    </DrawerTitle>
                    <p className="text-lg md:text-xl text-muted-foreground leading-none">
                      {selectedDay?.day.weekday_dialect}
                    </p>
                  </div>
                </div>
                {/* Close button - absolute positioned */}
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="absolute right-0">
                    <X className="h-5 w-5" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 py-6">
              {selectedDay && (
                <DayCard
                  day={selectedDay.day}
                  monthDialect={selectedDay.monthDialect}
                  hideHeader={true}
                />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </main>

      <BottomNav />
    </div>
  );
};

export default CalendarView;
