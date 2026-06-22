import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const calculateEMI = () => {
    if (!amount || !rate || !years) return alert("Please fill all fields");

    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(years) * 12;

    const emiCalc =
      (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const totalPay = emiCalc * N;
    const totalInt = totalPay - P;

    setEmi(emiCalc.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));

    const newYears = parseFloat(years) + 1;
    const newN = newYears * 12;

    const newEmi =
      (P * R * Math.pow(1 + R, newN)) /
      (Math.pow(1 + R, newN) - 1);

    const diff = emiCalc - newEmi;

    setSuggestion(
      `💡 Increase tenure by 1 year → EMI reduces by ₹${diff.toFixed(2)}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white relative">

      {/* 🌟 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10"></div>

      {/* 🔷 HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600/95 via-purple-600/95 to-blue-600/95 backdrop-blur shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT */}
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md">
            Smart EMI Planner
          </h1>

          {/* RIGHT */}
          <p className="text-sm md:text-base text-white font-semibold text-right drop-shadow-md tracking-wide">
            SHEBAN ANSARI <br className="md:hidden" />
            <span className="hidden md:inline"> | </span>

            <a
              href="mailto:shebaan242@gmail.com"
              className="underline hover:text-indigo-300 transition"
            >
              shebaan242@gmail.com
            </a>
          </p>

        </div>
      </header>

      {/* 🔷 MAIN */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-gray-900/70 border border-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-md">

          <h2 className="text-lg font-semibold mb-5 text-gray-300 text-center">
            Plan your loan smartly 💰
          </h2>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Loan Amount (₹)"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="number"
              placeholder="Interest Rate (%)"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />

            <input
              type="number"
              placeholder="Loan Tenure (Years)"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />

            {/* 🔥 MAIN BUTTON */}
            <button
              onClick={calculateEMI}
              className="w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-indigo-500 to-blue-500 
              hover:from-indigo-600 hover:to-blue-600 
              shadow-lg hover:shadow-indigo-500/30 
              transition-all duration-300 active:scale-[0.97]"
            >
              🚀 Calculate EMI
            </button>
          </div>

          {/* Results */}
          {emi && (
            <div className="mt-6 bg-gray-800/60 border border-gray-700 p-4 rounded-xl space-y-2">
              <p>
                <strong>Monthly EMI:</strong>{" "}
                <span className="text-indigo-400 font-semibold">₹{emi}</span>
              </p>
              <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
              <p><strong>Total Interest:</strong> ₹{totalInterest}</p>

              <div className="bg-green-900/40 border border-green-700 p-2 rounded text-sm text-green-300">
                {suggestion}
              </div>
            </div>
          )}

          {/* 🔥 CTA BUTTON */}
          <div className="mt-6">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              className="block w-full text-center py-2.5 rounded-lg font-semibold
              bg-gradient-to-r from-indigo-600 to-blue-600 text-white
              hover:from-indigo-700 hover:to-blue-700
              shadow-md hover:shadow-xl transition-all duration-300"
            >
              Built for Digital Heroes
            </a>
          </div>

        </div>
      </main>

      {/* 🔷 FOOTER */}
      <footer className="bg-black/40 border-t border-gray-800 text-center py-3 text-sm text-gray-400">
        © {new Date().getFullYear()} Smart EMI Planner • Built with React & Tailwind
      </footer>

    </div>
  );
}