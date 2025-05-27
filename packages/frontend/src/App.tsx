import "./App.css";
import CounterButton from "./components/CounterButton";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Hero />

        <CounterButton />
      </div>
    </>
  );
}

export default App;
