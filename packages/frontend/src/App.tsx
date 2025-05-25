import { useEffect, useState } from "react";
import { getCounter, incrementCounter } from "./service/counter.service";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const { counter } = await getCounter();

        setCount(counter);
      } catch (error) {
        console.error("Error fetching counter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

  const handleIncrementCounter = async () => {
    try {
      const { counter } = await incrementCounter();

      setCount(counter);
    } catch (error) {
      console.error("Error incrementing counter:", error);
    }
  };

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
        <div className="gradient-text">DevOps</div>

        {!loading && (
          <button type="button" onClick={handleIncrementCounter}>
            Contador: {count}
          </button>
        )}
      </div>
    </>
  );
}

export default App;
