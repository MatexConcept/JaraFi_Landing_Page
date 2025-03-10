import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-[#F2EDE4] w-full fixed top-0 left-0 z-50 border-b-[1px] border-[#0F0140]">
      <Link to="/">
        <img src="/JaraFi-blue.png" className="w-[88px]" alt="JaraFi Logo" />
      </Link>

      <div className="hidden md:flex">
        <button className="p-[10px] border border-primary rounded-[10px] bg-[#0F0140] text-[#E7E6E7] text-[16px]">
          Join Our Waitlist
        </button>
      </div>

      <button
        className="md:hidden text-[#0F0140] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RiCloseFill size={28} /> : <RiMenu2Fill size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#F2EDE4] flex flex-col items-center space-y-4 p-6 shadow-lg md:hidden h-screen"
          >
            <button className="p-[10px] border border-primary rounded-lg bg-[#0F0140] text-[#E7E6E7] text-[16px]">
              Join Our Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
