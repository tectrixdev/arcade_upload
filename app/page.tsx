"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";
import Link from "next/link";

const rubikMono = Rubik_Mono_One({
  weight: "400",
  variable: "--font-rubik-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <AnimatePresence>
      <main>
        <motion.div
          key="topbar"
          id="topbar"
          className="flex flex-col w-full items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        >
          <Image
            src="/logo.png"
            alt="logo"
            height={1024}
            width={1024}
            className="overflow-hidden object-contain size-32"
            quality={100}
          />
          <p className={`text-2xl text-white ${rubikMono.className}`}>
            Arcade uploader
          </p>
          <Link
            href="https://tectrix.dev/"
            className={`text-sm ${rubikMono.className} text-blue-500 hover:underline`}
          >
            By Joran Hennion
          </Link>
        </motion.div>
      </main>
    </AnimatePresence>
  );
}
