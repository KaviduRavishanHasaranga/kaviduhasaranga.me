import React from "react";
import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";
import Parallax from "./Parallax";

export default function About() {
  return (
    <section className="py-20 px-8 section-gradient" id="about">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-8">
            About <span className="gradient-text">Me</span>
          </h2>
        </ScrollAnimation>
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <ScrollAnimation delay={0.2} className="flex justify-center mx-auto md:col-span-1">
            <Parallax speed={0.2}>
              <div className="w-64 h-64 rounded-full bg-linear-to-br from-pink-500 to-purple-600 p-1 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 cursor-pointer">
                <Image 
                  src="/profile1.jpg" 
                  alt="Profile" 
                  width={256}
                  height={256}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </Parallax>
          </ScrollAnimation>
          <div className="space-y-6 md:col-span-2">
            <ScrollAnimation delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
                I&apos;m an Software Engineering undergraduate at NSBM Green University with a deep passion for blockchain technology and
                decentralized systems. Since 2020, I&apos;ve been actively immersed in
                the cryptocurrency ecosystem—researching, building, and educating
                others.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.4}>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
                I specialize in building modern, scalable web applications using
                cutting-edge technologies like React, Next.js, Node.js, and more.
                With a keen eye for detail and a passion for clean code, I strive
                to create exceptional digital experiences.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.5}>
              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 ">
                <div className="glass-card p-4 hover:bg-white/10 hover:scale-101 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-default">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 gap-2.5 flex items-center">
                    <span className="">🎓</span>BSc in Software Engineering
                  </p>
                </div>
                <div className="glass-card p-4 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">📍 Sri Lanka</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
