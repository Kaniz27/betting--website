import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Slide {
  image: string;
}

interface HeaderProps {
  SLIDES: Slide[];
}

export const Header: React.FC<HeaderProps> = ({ SLIDES }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <header
      id="home"
      className="relative w-full min-h-screen text-white overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={SLIDES[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="
              absolute inset-0
              w-full h-full

              /* Mobile: full image, no crop */
              object-contain

              /* Desktop: hero look */
              md:object-cover

              rounded-lg
            "
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgb(255,149,26) 0%, transparent 30%, transparent 70%, rgb(255,149,26) 100%)",
            }}
          />

          {/* Buttons */}
          <div
            className="
              absolute bottom-20 sm:bottom-24
              left-1/2 -translate-x-1/2
              flex flex-col sm:flex-row
              items-center
              gap-3 sm:gap-6
              px-4
              w-full sm:w-auto
            "
          >
            {/* Play Now Button */}
            <button
              type="button"
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-2
                text-sm sm:text-lg
                px-5 py-2
                bg-[rgb(255,149,26)]
                rounded-full
                cursor-pointer

                /* Disable animation & hover */
                transition-none
                transform-none
                hover:bg-[rgb(255,149,26)]
                active:bg-[rgb(255,149,26)]
                hover:transform-none
                active:transform-none
                focus:outline-none
                focus:ring-0
              "
              onClick={() =>
                window.open("https://www.nagad88a.com/?af=AG028124", "_blank")
              }
            >
              Play Now <ExternalLink size={16} className="shrink-0" />
            </button>

            {/* WhatsApp Button (optional) */}
            {/*
            <SpringButton
              variant="whatsapp"
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-2
                text-sm sm:text-lg
                px-5 py-2
                bg-gradient-to-b from-[#2a4cff] to-[#1230c1]
                text-white
                rounded-full
                shadow-md
                transition-none
              "
            >
              <WhatsApp size={16} />
              হোয়াটসঅ্যাপ সাপোর্ট
            </SpringButton>
            */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentSlide === i
                ? "w-12 bg-[rgb(255,149,26)]"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom Scrolling Text */}
      <div className="absolute bottom-0 w-full bg-black py-3 overflow-hidden">
        <motion.div
          className="whitespace-nowrap text-white font-medium text-center text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          Play Safe, Play Nagad88😍: 💵 টাকা উত্তোলনের গ্যারান্টি ⚡️ মুহূর্তেই টাকা
          উত্তোলনের সুযোগ
        </motion.div>
      </div>
    </header>
  );
};
