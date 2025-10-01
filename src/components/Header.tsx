import headerImage from "@/assets/piazza-header.jpg";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({ title = "Calendario Lametino", subtitle }: HeaderProps) => {
  return (
    <header className="relative h-48 md:h-64 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/90 drop-shadow-md max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};
