import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { introData } from "@/data/intro";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-card to-muted">
      <div className="max-w-2xl w-full animate-slide-up">
        <div className="text-center space-y-8">
          {/* Decorative element */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl text-center md:text-5xl font-serif font-bold text-primary leading-tight">
            {introData.title}
          </h1>

          {/* Content */}
          <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-xl mx-auto px-4 whitespace-pre-line">
            {introData.content}
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="shadow-soft hover:shadow-hover"
            >
              Inizia a sfogliare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
