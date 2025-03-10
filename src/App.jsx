import Layout from "./components/Layout.jsx";
import { Header, HeroSection, About, Features, FAQ, Footer } from "./index.js";

function App() {
  return (
    <main className="relative overflow-x-hidden">
      <Layout>
        <HeroSection />
        <About />
        <Features />
        <FAQ />
      </Layout>
    </main>
  );
}

export default App;
