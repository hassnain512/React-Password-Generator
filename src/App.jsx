import { useState, useEffect, useRef, useCallback } from "react";
function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);

  const passwordRef = useRef(null);
  const generatePassword = () => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      characters += "0123456789";
    }
    if (symbolAllowed) {
      characters += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
  };
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)[
      passwordRef.current.select()
    ];
  }, [password]);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-purple-700">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Password Generator
          </h1>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Your password will appear here
            </label>
            <input
              type="text"
              id="password"
              value={password}
              ref={passwordRef}
              className="w-full p-2 border text-white border-gray-300 rounded-md focus:outline-none      focus:ring-2 focus:ring-blue-500"
              placeholder="Your password will appear here"
              readOnly
            />
            <button
              className="mt-2 w-full bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-evenly mb-4 gap-4">
            <input
              type="range"
              max={20}
              min={8}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className=" h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <label htmlFor="Length" className="text-white font-medium">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center justify-evenly mb-4 gap-8">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="numberAllowed"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="numberAllowed" className="text-white font-medium">
                Numbers
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="symbolAllowed"
                checked={symbolAllowed}
                onChange={() => setSymbolAllowed((prev) => !prev)}
                className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="symbolAllowed" className="text-white font-medium">
                Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
