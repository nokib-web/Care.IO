import Banner from "@/components/home/Banner";
import About from "@/components/home/About";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Banner />
      <About />
      <ServicesOverview />
      <Testimonials />
    </div>
  );
}
