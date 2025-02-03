// src/components/CarouselItem.tsx
import React from 'react';

type CarouselItemProps = {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  techs: string[];
};

const CarouselItem: React.FC<CarouselItemProps> = ({ title, description, imageUrl, projectUrl, techs }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl h-full px-4 md:px-16 py-6 md:py-10 border border-emerald-500/60 shadow-inner shadow-white/20 rounded-lg mx-auto">
      {/* Sección de texto */}
      <div className="flex flex-col justify-center w-full md:w-1/2 md:pr-4 space-y-4 md:space-y-6">
        <h2 className="text-2xl font-bold text-emerald-400 order-1 md:order-none">{title}</h2>
        <p className="text-white order-2 md:order-none">{description}</p>
        
        {/* Tech stack section */}
        <div className="flex flex-wrap gap-2 order-3 md:order-none">
          <span className="text-emerald-400 font-semibold">Tecnologías:</span>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-sm bg-emerald-400/20 text-emerald-400 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Imagen de preview del proyecto - Reordenada para móvil */}
        <div className="w-full md:w-[600px] h-[250px] md:h-[400px] lg:h-[500px] relative overflow-hidden order-3 md:hidden mb-4">
          <img 
            src={imageUrl} 
            alt={`Preview de ${title}`} 
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Contenedor alrededor del botón */}
        <div className="flex justify-start order-4 md:order-none">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-black bg-emerald-400 rounded hover:bg-emerald-600 transition-colors"
          >
            Ver Proyecto
          </a>
        </div>
      </div>
  
      {/* Imagen de preview del proyecto - Versión desktop */}
      <div className="hidden md:block w-full md:w-[600px] h-[250px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`Preview de ${title}`} 
          className="w-full h-full object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );  
};

export default CarouselItem;