"use client";
import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const rubikMono = Rubik_Mono_One({
  weight: "400",
  variable: "--font-rubik-mono",
  subsets: ["latin"],
});

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.5,
    },
  },
};

export default function Home() {
  return (
    <motion.main
      className="flex flex-col items-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        staggerChildren: 0.3,
      }}
    >
      <AnimatePresence>
        <motion.div
          key="topbar"
          id="topbar"
          variants={itemVariants}
        >
          <Image
            src="/logo.png"
            alt="logo"
            height={1024}
            width={1024}
            className="overflow-hidden object-contain size-32"
            quality={100}
          />
        </motion.div>
        <motion.p
          key="title"
          className={`text-2xl text-white ${rubikMono.className}`}
          variants={itemVariants}
        >
          Arcade uploader
        </motion.p>
        <motion.div
          key="link"
          variants={itemVariants}
        >
          <Link
            href="https://tectrix.dev/"
            className={`text-sm ${rubikMono.className} text-blue-500 hover:underline`}
          >
            By Joran Hennion
          </Link>
        </motion.div>
        <motion.div
          key="divider"
          id="divider"
          className="bg-white w-6/12 h-1 my-5 rounded-full"
          variants={itemVariants}
        />
      </AnimatePresence>
    </motion.main>
  );
}
