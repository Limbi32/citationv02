import { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;       // Texte à afficher dans le tooltip
  children: ReactNode; // Élément qui déclenche l'apparition du tooltip
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>

      {isHovered && (
        <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-white bg-black rounded-md text-sm z-10">
          {text}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-b-black"></div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
