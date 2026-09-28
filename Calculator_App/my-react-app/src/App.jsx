import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function calculate(firstValue, secondValue, operator) {
  const a = parseFloat(firstValue);
  const b = parseFloat(secondValue);

  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) return null;
      return a / b;
    default:
      return b;
  }
}

function formatResult(value) {
  if (value === null || !isFinite(value)) return "Error";
  return parseFloat(value.toPrecision(10)).toString();
}

function App() {
  const [input, setInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [isError, setIsError] = useState(false);

  // Samurai answer animation states
  const [answerEvent, setAnswerEvent] = useState(false);
  const [resultAnimation, setResultAnimation] = useState(false);

  const triggerAnswerEvent = useCallback(() => {
    setAnswerEvent(false);
    setResultAnimation(false);

    setTimeout(() => {
      setAnswerEvent(true);
      setResultAnimation(true);
    }, 100);

    setTimeout(() => {
      setAnswerEvent(false);
    }, 1800);
  }, []);

  const handleClear = useCallback(() => {
    setInput("0");
    setExpression("");
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(false);
    setIsError(false);
    setAnswerEvent(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (isError) {
      handleClear();
      return;
    }

    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }, [isError, handleClear]);

  const handleNumber = useCallback(
    (digit) => {
      if (isError) {
        setInput(digit);
        setExpression("");
        setPreviousValue(null);
        setOperator(null);
        setIsError(false);
        setOverwrite(false);
        return;
      }

      if (overwrite) {
        setInput(digit);
        setOverwrite(false);
        return;
      }

      setInput((prev) => (prev === "0" ? digit : prev + digit));
    },
    [isError, overwrite]
  );

  const handleDecimal = useCallback(() => {
    if (isError) {
      setInput("0.");
      setIsError(false);
      setOverwrite(false);
      return;
    }

    if (overwrite) {
      setInput("0.");
      setOverwrite(false);
      return;
    }

    setInput((prev) => (prev.includes(".") ? prev : prev + "."));
  }, [isError, overwrite]);

  const handleOperator = useCallback(
    (nextOperator) => {
      if (isError) return;

      if (operator && !overwrite) {
        const result = calculate(previousValue, input, operator);

        if (result === null) {
          setIsError(true);
          setInput("Error");
          setExpression("");
          setPreviousValue(null);
          setOperator(null);
          return;
        }

        const formatted = formatResult(result);

        setPreviousValue(formatted);
        setInput(formatted);
        setExpression(`${formatted} ${nextOperator}`);
      } else {
        setPreviousValue(input);
        setExpression(`${input} ${nextOperator}`);
      }

      setOperator(nextOperator);
      setOverwrite(true);
    },
    [isError, operator, overwrite, previousValue, input]
  );

  const handlePercent = useCallback(() => {
    if (isError) return;

    let percentValue;

    if (operator && previousValue !== null) {
      percentValue = (parseFloat(previousValue) * parseFloat(input)) / 100;
    } else {
      percentValue = parseFloat(input) / 100;
    }

    setInput(formatResult(percentValue));
    setOverwrite(true);
  }, [isError, operator, previousValue, input]);

  const handleEquals = useCallback(() => {
    if (isError || operator === null || previousValue === null) {
      return;
    }

    const result = calculate(previousValue, input, operator);

    if (result === null) {
      setIsError(true);
      setInput("Error");
      setExpression("");
      setPreviousValue(null);
      setOperator(null);
      return;
    }

    const formatted = formatResult(result);

    setExpression(`${previousValue} ${operator} ${input} =`);
    setInput(formatted);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);

    triggerAnswerEvent();
  }, [isError, operator, previousValue, input, triggerAnswerEvent]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        handleNumber(key);
        return;
      }

      if (key === ".") {
        handleDecimal();
        return;
      }

      if (key === "+") {
        handleOperator("+");
        return;
      }

      if (key === "-") {
        handleOperator("−");
        return;
      }

      if (key === "*") {
        handleOperator("×");
        return;
      }

      if (key === "/") {
        event.preventDefault();
        handleOperator("÷");
        return;
      }

      if (key === "Enter" || key === "=") {
        handleEquals();
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        handleClear();
        return;
      }

      if (key === "Backspace") {
        handleDelete();
        return;
      }

      if (key === "%") {
        handlePercent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleNumber,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleDelete,
    handlePercent,
  ]);

  return (
    <div className={`samurai-scene ${answerEvent ? "answer-event" : ""}`}>
      {/* Moon */}
      <div className="moon"></div>

      {/* Clouds */}
      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>

      {/* Stars */}
      <div className="stars"></div>

      {/* Japanese Wave Pattern */}
      <div className="wave-pattern"></div>

      {/* Golden sparks effect on calculate */}
      {answerEvent && (
        <div className="sparks">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>
      )}

      {/* Sword slash animation */}
      {answerEvent && <div className="sword-slash"></div>}

      <div className="calculator">
        <div className="calculator-title">SAMURAI CALCULATOR</div>

        <div className="calculator__screen">
          <div className="calculator__expression">
            {expression || "\u00A0"}
          </div>

          <div
            className={`calculator__result ${
              isError ? "calculator__result--error" : ""
            } ${resultAnimation ? "result-animation" : ""}`}
          >
            {input}
          </div>
        </div>

        <div className="calculator__grid">
          <button className="btn btn--utility" onClick={handleClear}>
            C
          </button>
          <button className="btn btn--utility" onClick={handleDelete}>
            ⌫
          </button>
          <button className="btn btn--utility" onClick={handlePercent}>
            %
          </button>
          <button
            className="btn btn--operator"
            onClick={() => handleOperator("÷")}
          >
            ÷
          </button>

          <button className="btn btn--number" onClick={() => handleNumber("7")}>
            7
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("8")}>
            8
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("9")}>
            9
          </button>
          <button
            className="btn btn--operator"
            onClick={() => handleOperator("×")}
          >
            ×
          </button>

          <button className="btn btn--number" onClick={() => handleNumber("4")}>
            4
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("5")}>
            5
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("6")}>
            6
          </button>
          <button
            className="btn btn--operator"
            onClick={() => handleOperator("−")}
          >
            −
          </button>

          <button className="btn btn--number" onClick={() => handleNumber("1")}>
            1
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("2")}>
            2
          </button>
          <button className="btn btn--number" onClick={() => handleNumber("3")}>
            3
          </button>
          <button
            className="btn btn--operator"
            onClick={() => handleOperator("+")}
          >
            +
          </button>

          <button
            className="btn btn--number btn--zero"
            onClick={() => handleNumber("0")}
          >
            0
          </button>
          <button className="btn btn--number" onClick={handleDecimal}>
            .
          </button>
          <button className="btn btn--equals" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;