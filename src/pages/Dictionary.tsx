import { useState, useMemo } from "react";
import { dictionaryData } from "@/data/dictionary";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Image - Fixed */}
      <div className="sticky top-0 z-50">
        <Header 
          title="Dizionario Lametino"
          subtitle="Parole e significati del dialetto"
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
            />
          </div>
        </div>
      </div>

      {/* Main Content - with proper spacing */}
      <main className="max-w-2xl mx-auto px-4 py-6 relative z-10">
        {filteredEntries.length > 0 ? (
          <div className="space-y-4">
            {filteredEntries.map((entry, index) => (
              <Card
                key={index}
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
                  <p className="text-foreground leading-relaxed">
                    {entry.explanation}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nessuna parola trovata per "{searchTerm}"
            </p>
          </div>
        )}

        {/* Results Count */}
        {searchTerm && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {filteredEntries.length} {filteredEntries.length === 1 ? "risultato" : "risultati"}
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dictionary;
