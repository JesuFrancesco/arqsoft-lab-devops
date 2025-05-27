import { useEffect, useState } from "react";
import { getCounter, incrementCounter } from "../service/counter.service";

export default function CounterButton() {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <button type="button" onClick={handleIncrementCounter}>
      Contador: {count}
    </button>
  );
}
