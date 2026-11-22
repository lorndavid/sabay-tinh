import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["minimalist", "powerful", "beautiful", "precision", "effortless"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToDesk = () => {
    const el = document.getElementById("interactive-desk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("products-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 py-20 lg:py-28 items-center justify-center flex-col text-center">
          
          {/* Top Pill Button */}
          <div>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={scrollToDesk}
              className="gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-200 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Next-Gen Workspace Hardware</span>
              <MoveRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Animated Headline */}
          <div className="flex gap-4 flex-col max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tighter text-center font-black text-black leading-tight">
              <span>Workspace built to be</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-16 sm:h-20 md:h-24">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-black text-black underline decoration-neutral-300 underline-offset-8"
                    initial={{ opacity: 0, y: -80 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -80 : 80,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed mt-2">
              Curated hardware essentials designed for peak focus and productivity. Explore the 4 signature essentials in real-time 3D.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3 pt-2">
            <Button 
              size="lg" 
              className="gap-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold"
              onClick={scrollToDesk}
            >
              <span>Explore 3D Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            
            <Button 
              size="lg" 
              className="gap-2 rounded-xl text-xs font-bold" 
              variant="outline"
              onClick={scrollToCatalog}
            >
              <span>View Products</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
