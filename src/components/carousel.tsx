import React, { useState, useEffect, useCallback } from 'react';
import CarouselItem from './carouselItem';

type Slide = {
  titulo: string;
  descripcion: string;
  imageUrl: string;
  projectUrl: string;
  tecnologias: string[];
};

type CarouselProps = {
  slides: Slide[];
};

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mejorado manejo del touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].screenX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full max-w-screen-lg lg:max-w-screen-xl mx-auto overflow-hidden rounded-lg box-border p-2"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id='proyectos'
    >
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex flex-col items-center gap-4 mb-8 py-5">
          <div className="hover:scale-110 transition duration-300">
            <svg
              className="w-16 h-16 text-emerald-500 animate-pulse hover:animate-none transition-colors duration-300"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white">PROYECTOS</h1>
            <div className="h-1 w-32 bg-emerald-500 transition-colors duration-300 mt-2 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="transition-transform duration-500 ease-in-out">
        <CarouselItem
          title={slides[currentIndex].titulo}
          description={slides[currentIndex].descripcion}
          imageUrl={slides[currentIndex].imageUrl}
          projectUrl={slides[currentIndex].projectUrl}
          techs={slides[currentIndex].tecnologias}
        />
      </div>

      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute top-[60%] left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all duration-300 items-center justify-center w-12 h-12"
        style={{ zIndex: 10 }}
        aria-label="Previous slide"
      >
        <span className="text-3xl font-bold">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute top-[60%] right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all duration-300 items-center justify-center w-12 h-12"
        style={{ zIndex: 10 }}
        aria-label="Next slide"
      >
        <span className="text-3xl font-bold">›</span>
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'} focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

