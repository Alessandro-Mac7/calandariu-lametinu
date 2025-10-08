import headerImage from "@/assets/piazza-header.jpg";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({ title = "Calandariu Lametino", subtitle }: HeaderProps) => {
  return (
    <header className="relative h-48 md:h-64 overflow-hidden pwa-header">
      {/* Responsive Background Image with WebP support */}
      <picture className="absolute inset-0">
        {/* WebP sources for modern browsers - add when converted */}
        {/* <source
          media="(max-width: 640px)"
          srcSet="/assets/piazza-header-mobile.webp"
          type="image/webp"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="/assets/piazza-header-tablet.webp"
          type="image/webp"
        />
        <source
          srcSet="/assets/piazza-header-desktop.webp"
          type="image/webp"
        /> */}

        {/* Fallback to JPG */}
        <img
          src={headerImage}
          alt="Piazza Lametina - Veduta storica"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-20 pwa-header-content">
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
