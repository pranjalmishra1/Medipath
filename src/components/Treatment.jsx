import { useState } from "react";
import { motion } from "framer-motion";

function Treatment({ darkMode }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [currentCondition, setCurrentCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestBody = {
      name,
      age,
      gender,
      symptoms,
      medicalHistory,
      currentCondition,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const responseData = await response.json();
      setFetchedData(responseData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const greeting = () => {
    if (!name || !gender) return '';
    const salutation = gender === 'Male' ? 'sir' : 'ma’am';
    return `Hello ${name.trim()} ${salutation}`;
  };

  return (
    <div className={`min-h-screen pb-20 px-4 md:px-8 pt-20 tracking-tight ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gradient-to-br from-blue-50 to-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight text-blue-700 dark:text-white">
            🧠 Symptom Analysis
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Symptom, History, Condition */}
            {[
              {
                label: "Describe your symptoms:",
                value: symptoms,
                setter: setSymptoms,
                placeholder: "E.g. Headache, nausea, joint pain...",
              },
              {
                label: "Medical History:",
                value: medicalHistory,
                setter: setMedicalHistory,
                placeholder: "E.g. allergies, past surgeries...",
              },
              {
                label: "Current Medical Conditions:",
                value: currentCondition,
                setter: setCurrentCondition,
                placeholder: "E.g. diabetes, asthma, hypertension...",
              },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block font-semibold mb-2 text-lg">{field.label}</label>
                <textarea
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  rows="4"
                  required
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white'
                }`}
            >
              {isLoading
                ? "Loading your treatment plan, please wait..."
                : "🔍 Get Treatment Plan"}
            </button>
          </form>
        </motion.div>

        {/* Result Section */}
        {fetchedData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 p-8 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-center mb-4 text-indigo-700 dark:text-indigo-300">
              {greeting()}
            </h3>
            <h4 className="text-xl font-semibold mb-4 text-center">📝 Treatment Plan</h4>
            <p className="whitespace-pre-line text-lg leading-relaxed">
              {fetchedData.generatedText.replace(/\*/g, '')}
            </p>
            <p className="text-sm text-center mt-10 text-gray-500 dark:text-gray-400">
              This treatment plan is auto-generated based on your input.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Treatment;
