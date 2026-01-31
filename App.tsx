import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle as WhatsApp,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Headphones,
  ExternalLink,
} from "lucide-react";
import SpringButton from "./components/SpringButton";
import ChatAssistant from "./components/ChatAssistant";
import { SLIDES, FEATURES, GAMES, STEPS } from "./constants";

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="min-h-screen flex flex-col font-['Hind_Siliguri'] bg-gray-50 overflow-x-hidden">
      {/* 1. STICKY HEADER */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[rgb(20,55,238)] h-16 shadow-2xl"
            : "bg-gradient-to-r from-[rgb(20,55,238)] to-[#0a192f] h-20"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          {/* Logo Left */}
          <div className="flex items-center gap-2">
            <img
              src="https://www.nagad88f.com/static/svg/Vertical_Logo_White.svg"
              alt="NAGAD88 Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-2 text-white text-sm">
                <Phone size={14} className="text-white" />
                <span>01936056185</span>
              </div>
              <div className="text-[rgb(255,177,61)] font-bold text-xs uppercase tracking-widest">
                ২৪/৭ কাস্টমার কেয়ার
              </div>
            </div>
            <SpringButton
              variant="primary"
              className="py-2 px-6 text-sm bg-[rgb(255,177,61)] hover:bg-[rgb(255,177,61)/90]"
              onClick={() => window.open("https://www.nagad88f.com/", "_blank")}
            >
              ভিজিট করুন
            </SpringButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 bg-[rgb(20,55,238)] z-50 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <img
                  src="https://www.nagad88f.com/static/svg/Vertical_Logo_White.svg"
                  alt="NAGAD88 Logo"
                  className="h-12 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white"
                >
                  <X size={32} />
                </button>
              </div>
             
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <header
        id="home"
        className="relative h-screen w-full text-white overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Background Image */}
            <img
              src={SLIDES[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Gradient Overlay – Top + Bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgb(255,149,26) 0%, transparent 30%, transparent 70%, rgb(255,149,26) 100%)",
              }}
            />

            {/* Buttons – side by side */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-row items-center gap-6">
              {/* Go To Website */}
              <SpringButton
                variant="attention"
                className="flex items-center gap-2 text-lg px-6 py-1 bg-[rgb(255,149,26)] hover:bg-[rgb(255,149,26)/90]"
                onClick={() =>
                  window.open("https://www.nagad88f.com/", "_blank")
                }
              >
                Go To My Website <ExternalLink size={18} />
              </SpringButton>

              {/* WhatsApp */}
              <SpringButton
  variant="whatsapp"
  className="
    flex items-center gap-3 text-lg px-6 py-2
    bg-gradient-to-b from-[#2a4cff] to-[#1230c1]
    hover:from-[#3b5bff] hover:to-[#1230c1]
    text-white
    rounded-full
    shadow-lg hover:shadow-2xl
    transition-all duration-300
  "
  onClick={() =>
    window.open(
      'https://wa.me/8801936056185?text=Hello%20I%20need%20support',
      '_blank'
    )
  }
>
  <WhatsApp size={18} className="text-white" />
  হোয়াটসঅ্যাপ সাপোর্ট
</SpringButton>

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
            Play Safe, Play Nagad88😍: 💵 টাকা উত্তোলনের গ্যারান্টি ⚡️ মুহূর্তেই
            টাকা উত্তোলনের সুযোগ
          </motion.div>
        </div>
      </header>
      {/*  */}
      <section className="py-12 px-4 bg-[#0a192f]">
        {/* Top Text */}
        <h2 className="text-white text-3xl md:text-2xl font-bold text-start mb-6">
          রেফারেল প্রোগ্রাম
        </h2>

        {/* Image */}
        <div className="w-full max-w-7xl mx-auto mb-6">
          <img
            src="https://www.nagad88f.com/static/image/referral/bd/Desktop_Before_Login.jpg"
            alt="Referral Program"
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Date */}
        <p className="text-white bg-blue-600 inline-block px-4 py-1 rounded mb-6">
          30/01/2026 তারিখের কিছু রেফারেল কমিশন
        </p>

        {/* Referral List Animation Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {/* Repeat 10 items (loop) */}
            {[
              { name: "****jhossain", amount: "3870.93" },
              { name: "****01", amount: "3716.80" },
              { name: "****y145", amount: "3517.67" },
              { name: "****211", amount: "3514.80" },
              { name: "****bmia1", amount: "3480.00" },
              { name: "****jhossain", amount: "3870.93" },
              { name: "****01", amount: "3716.80" },
              { name: "****y145", amount: "3517.67" },
              { name: "****211", amount: "3514.80" },
              { name: "****bmia1", amount: "3480.00" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-[#112240] p-4 rounded-lg min-w-[160px]"
              >
                <img
                  src="https://www.nagad88f.com/static/image/referral/Icons.png"
                  alt={item.name}
                  className="w-18 h-16 rounded-full mb-2"
                />
                <p className="text-white font-bold">{item.name}</p>
                <p className="text-blue-400 font-semibold">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tailwind Custom Animation */}
        <style>
          {`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-scroll {
        display: flex;
        gap: 1.5rem;
        animation: scroll 20s linear infinite;
      }
    `}
        </style>
      </section>

      {/* 3. WHY NAGAD88 (Trust Building) */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-orange-400/20 via-transparent to-orange-400/20">
        {/* Background Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] -ml-64 -mb-64" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-2xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text text-[#eab308]">
              কেন Nagad88 বেছে নেবেন?
            </h2>
            <div className="h-1.5 w-28 bg-yellow-400 mx-auto rounded-full shadow-lg" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <motion.div
              whileHover={{
                y: -15,
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
              className="p-10 bg-gradient-to-b from-[#1834EB] to-[#0F1A90] border border-white/10 rounded-3xl text-center backdrop-blur-md transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 animate-pulse">
                <Zap className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                দ্রুত লেনদেন
              </h3>
              <p className="text-blue-200/80">
                মাত্র ৫ মিনিটে আপনার উইথড্রয়াল প্রসেস সম্পন্ন করা হয়।
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              whileHover={{
                y: -15,
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
              className="p-10 bg-gradient-to-b from-[#1834EB] to-[#0F1A90] border border-white/10 rounded-3xl text-center backdrop-blur-md transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 animate-pulse">
                <ShieldCheck className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                নিরাপদ প্ল্যাটফর্ম
              </h3>
              <p className="text-blue-200/80">
                আধুনিক এনক্রিপশন প্রযুক্তির মাধ্যমে আপনার তথ্য ১০০% সুরক্ষিত।
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              whileHover={{
                y: -15,
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
              className="p-10 bg-gradient-to-b from-[#1834EB] to-[#0F1A90] border border-white/10 rounded-3xl text-center backdrop-blur-md transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 animate-pulse">
                <Headphones className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                ২৪/৭ সাপোর্ট
              </h3>
              <p className="text-blue-200/80">
                যেকোনো সমস্যায় আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. GAMES SECTION (Visual Focus) */}

      {/* 5. HOW IT WORKS (Timeline) */}
      <section
        id="how"
        className="py-24 relative bg-gradient-to-b from-[#0a192f] via-[#0f1a33] to-[#0a192f] overflow-hidden"
      >
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[200px] translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <h2 className="text-4xl md:text-2xl font-extrabold text-center text-transparent bg-clip-text text-[#eab308] mb-20">
            কিভাবে খেলা শুরু করবেন?
          </h2>

          <div className="relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-14 left-10 right-10 h-1 bg-blue-700/20 rounded-full z-0" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className="relative z-10 text-center flex flex-col items-center group"
                >
                  {/* Step Circle */}
                  <div className="w-24 h-24 bg-gradient-to-b from-blue-700 to-blue-900 border-4 border-blue-400 rounded-full flex items-center justify-center text-3xl font-black text-white mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-500">
                    {step.id}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-500">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-gray-300 max-w-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="relative py-12 md:py-16 bg-black">
  <div className="container mx-auto px-4">
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-5
        gap-8
        items-center
        text-center
      "
    >
      {/* Item 1 */}
      <div className="flex flex-col items-center">
        <p className="text-white font-bold mb-3 text-sm md:text-base">
          মূল্য পরিশোধ পদ্ধতি
        </p>
        <img
          src="https://www.nagad88f.com/static/svg/Bank_Icon.svg"
          alt="Payment Methods"
          className="h-7 md:h-8 w-auto"
        />
      </div>

      {/* Item 2 */}
      <div className="flex flex-col items-center">
        <p className="text-white font-bold mb-3 text-sm md:text-base">
          আমাদের অনুসরণ করুন
        </p>

        <div className="flex gap-3 md:gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 md:w-10 md:h-10 bg-white/10 text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-300 hover:text-black transition-all"
          >
            <Facebook size={18} />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 md:w-10 md:h-10 bg-white/10 text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-300 hover:text-black transition-all"
          >
            <Instagram size={18} />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 md:w-10 md:h-10 bg-white/10 text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-300 hover:text-black transition-all"
          >
            <Twitter size={18} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 md:w-10 md:h-10 bg-white/10 text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-300 hover:text-black transition-all"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col items-center">
        <p className="text-white font-bold mb-3 text-sm md:text-base">
          সার্টিফিকেশন
        </p>
        <img
          src="https://www.nagad88f.com/static/image/footer/gaming_Casino_Analyzer.svg"
          alt="Certification"
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Item 4 */}
      <div className="flex flex-col items-center">
        <p className="text-white font-bold mb-3 text-sm md:text-base">
          কমিউনিটি ওয়েবসাইট
        </p>
        <img
          src="https://www.nagad88f.com/static/image/footer/safe2.png"
          alt="Community"
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Item 5 */}
      <div className="flex flex-col items-center">
        <p className="text-white font-bold mb-3 text-sm md:text-base">
          গেমিং লাইসেন্স
        </p>
        <img
          src="https://www.nagad88f.com/static/image/footer/gaming_license.webp"
          alt="Gaming License"
          className="h-7 md:h-8 w-auto"
        />
      </div>
    </div>
  </div>
</section>


      {/* 7. FOOTER */}
      <footer
        id="contact"
        className="bg-[#0a192f] text-white pt-24 pb-12 border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Logo & About */}
            <div className="md:col-span-2 flex  flex-col items-start gap-4">
              <img
                src="https://www.nagad88f.com/static/svg/Vertical_Logo_White.svg"
                alt="NAGAD88 Logo"
                className="h-16 w-auto mb-4 items-start"
              />
              <p className="text-blue-200/60 max-w-md text-lg leading-relaxed mb-6">
                বাংলাদেশের ১ নম্বর অনলাইন গেমিং এবং স্পোর্টস বেটিং প্ল্যাটফর্ম।
                আমরা প্রদান করি ১০০% নিরাপদ এবং নির্ভরযোগ্য সেবা।
              </p>
              <div className="flex gap-4">
                {["fb", "tw", "inst", "yt"].map((s) => (
                  <div
                    key={s}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition-all cursor-pointer"
                  >
                    <span className="uppercase font-bold text-[10px]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-[rgb(20,55,238)] mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-4">
                লিংকসমূহ
              </h4>
              <ul className="space-y-4 text-blue-200/60">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    প্রাইভেসি পলিসি
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    টার্মস অ্যান্ড কন্ডিশন
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    এফএকিউ (FAQ)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ডায়নামিক অফার
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-[rgb(20,55,238)] mb-8 uppercase tracking-widest border-l-4 border-yellow-400 pl-4">
                যোগাযোগ
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-blue-200/60 group">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-950 transition-all shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase mb-1">
                      ফোন & হোয়াটসঅ্যাপ
                    </div>
                    <div className="font-bold text-white">01936056185</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-blue-200/50 text-sm">
            <p className="opacity-70">© ২০২৬ Nagad88 | সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex flex-wrap justify-center gap-6 opacity-60">
              <span className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded">
                18+ RESPONSIBLE GAMING
              </span>
              <span className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded">
                SSL SECURED
              </span>
              <span className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded">
                CURAÇAO GAMING
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant Bubble */}
      <ChatAssistant />
    </div>
  );
};

export default App;
