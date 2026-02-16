import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { Features } from "@/components/Features";
import { Chapters } from "@/components/Chapters";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="grain relative">
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Chapters />
      </main>
      <Footer />
    </div>
  );
}
