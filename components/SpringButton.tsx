
import React from 'react';
import { motion } from 'framer-motion';

interface SpringButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'attention';
}

const SpringButton: React.FC<SpringButtonProps> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-500',
    secondary: 'bg-blue-800 text-white font-bold hover:bg-blue-700',
    whatsapp: 'bg-green-600 text-white font-bold hover:bg-green-700',
    attention: 'bg-[#ffc107] text-blue-950 font-black uppercase tracking-wide shadow-[0_0_15px_rgba(255,193,7,0.4)]',
  };

  // Special animation for the "Attention" button
  const attentionAnimate = variant === 'attention' ? {
    rotate: [-3, 3, -3],
    y: [0, -8, 0],
    boxShadow: [
      '0 0 10px rgba(255, 193, 7, 0.4)',
      '0 0 25px rgba(255, 193, 7, 0.7)',
      '0 0 10px rgba(255, 193, 7, 0.4)'
    ]
  } : {};

  const attentionTransition = variant === 'attention' ? {
    rotate: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
    y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
    boxShadow: { repeat: Infinity, duration: 2, ease: "linear" }
  } : {};

  return (
    <motion.button
      animate={attentionAnimate}
      transition={attentionTransition}
      whileHover={{ 
        scale: 1.1, 
        rotate: 0, 
        y: 0,
        boxShadow: '0 0 30px rgba(255, 193, 7, 0.9)',
        transition: { type: 'spring', stiffness: 400, damping: 10 } 
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-full transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default SpringButton;
