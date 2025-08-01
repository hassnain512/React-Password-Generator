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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl text-purple-600 shadow-black font-bold mb-6 text-center">
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
          <div className="flex items-center justify-between mb-4">
            <input
              type="range"
              max={20}
              min={8}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer bg-purple-600"
            />
            <label htmlFor="Length" className=" text-white ">
              Length:{length}
            </label>

            <input
              type="checkbox"
              id="numberAllowed"
              value={numberAllowed}
              className="cursor-pointer bg-purple-600 text-purple-600"
              onChange={(e) => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberAllowed" className="text-white">
              Numbers
            </label>

            <input
              type="checkbox"
              id="symbolAllowed"
              value={symbolAllowed}
              className="cursor-pointer bg-purple-600 text-purple-600"
              onChange={(e) => setSymbolAllowed((prev) => !prev)}
            />
            <label htmlFor="numberAllowed" className="text-white">
              Symbols
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
