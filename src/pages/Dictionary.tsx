import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { dictionaryData } from "@/data/dictionary";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 20; // Load 20 items at a time

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter entries based on search term
  const filteredEntries = useMemo(() => {
    if (!searchTerm) return dictionaryData;

    const term = searchTerm.toLowerCase();
    return dictionaryData.filter(
      (entry) =>
        entry.word.toLowerCase().includes(term) ||
        entry.translation.toLowerCase().includes(term) ||
        entry.explanation.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Get only the entries to display (progressive loading)
  const displayedEntries = useMemo(() => {
    return filteredEntries.slice(0, displayCount);
  }, [filteredEntries, displayCount]);

  const hasMore = displayedEntries.length < filteredEntries.length;

  // Load more entries
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate slight delay for smooth loading
    setTimeout(() => {
      setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 100);
  }, [isLoading, hasMore]);

  // Reset display count when search term changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchTerm]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Image - Fixed */}
      <div className="sticky top-0 z-50">
        <Header
          title="Dizionario Lametino"
          subtitle="Parole e significati del dialetto lametino"
        />
      </div>

      {/* Search Bar - Sticky below header with solid background */}
      <div className="sticky top-48 md:top-64 z-40 bg-background border-b border-border shadow-soft">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cerca una parola..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card"
              aria-label="Cerca nel dizionario"
            />
          </div>
        </div>
      </div>

      {/* Main Content - with progressive loading */}
      <main className="max-w-2xl mx-auto px-4 py-6 relative z-10">
        {filteredEntries.length > 0 ? (
          <>
            <div className="space-y-4">
              {displayedEntries.map((entry, index) => (
                <Card
                  key={`${entry.word}-${index}`}
                  className="p-5 shadow-soft hover:shadow-hover transition-smooth animate-fade-in"
                >
                  <div className="space-y-2">
                    {/* Word */}
                    <div className="flex items-baseline gap-3 border-b border-border pb-2">
                      <h2 className="text-xl font-serif font-bold text-primary">
                        {entry.word}
                      </h2>
                      <span className="text-sm text-muted-foreground italic">
                        ({entry.translation})
                      </span>
                    </div>

                    {/* Explanation */}
                    {entry.explanation && (
                      <p className="text-foreground leading-relaxed">
                        {entry.explanation}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            {hasMore && (
              <div
                ref={observerTarget}
                className="flex justify-center py-8"
              >
                {isLoading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Caricamento...</p>
                  </div>
                ) : (
                  <div className="h-4" />
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {searchTerm ? (
                  <>Mostrando {displayedEntries.length} di {filteredEntries.length} {filteredEntries.length === 1 ? "risultato" : "risultati"}</>
                ) : (
                  <>Mostrando {displayedEntries.length} di {filteredEntries.length} parole</>
                )}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nessuna parola trovata per "{searchTerm}"
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dictionary;
