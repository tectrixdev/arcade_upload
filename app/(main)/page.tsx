"use client";
import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { insert } from "@/components/inserturl";

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
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (input: string) => {
    const regex = /^https:\/\/arcade\.makecode\.com\/[a-zA-Z0-9-]+$/;
    return regex.test(input);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(validateUrl(value));
  };

  const handleSubmit = async () => {
    if (isValid) {
      insert(url);
      alert("uploaded project, this may take up to 1 minute to process");
    } else {
      alert("input the share project url/link here instead of the editor");
    }
  };
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
        <motion.div
          key="input-button-wrapper"
          id="input-button-wrapper"
          className="w-full flex flex-col md:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <input
            id="input"
            value={url}
            onChange={handleInputChange}
            onFocus={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            className={`h-10 w-5/6 md:w-2/6 px-5 text-center border-2 rounded-lg focus:outline-none ${
              isValid
                ? "border-white text-white"
                : "border-red-500 text-red-500"
            }`}
            placeholder="https://arcade.makecode.com/xxx-xxx-xxx"
          />
          <button
            id="button"
            onClick={handleSubmit}
            className={`rounded-lg px-5 py-2 cursor-pointer ${
              isValid ? "bg-white text-black" : "bg-red-500 text-white"
            }`}
          >
            Add project
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
}
