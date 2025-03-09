import { Header, HeroSection, About, Features, FAQ, Footer } from "./index.js";

function App() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <HeroSection />
      <About />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}

export default App;
