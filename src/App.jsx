import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpendForm from "./components/SpendForm";

function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <SpendForm />
    </div>
  );
}

export default App;