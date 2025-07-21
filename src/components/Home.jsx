import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgimage1 from '../Images/MediPath1.jpg';
import bgimage2 from '../Images/MediPath2.png';

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(bgimage1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev === bgimage1 ? bgimage2 : bgimage1));
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: '🧠 Symptom Analysis',
      description: 'Input your symptoms and medical history for instant AI analysis',
    },
    {
      title: '🩺 AI Diagnosis',
      description: 'Advanced algorithms assess your condition with precision',
    },
    {
      title: '💊 Treatment Plan',
      description: 'Personalized treatment plans tailored to your profile',
    },
  ];

  return (
    <div className="font-sans tracking-tight">
      {/* Hero Section with Image & Overlay */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        <img
          src={currentImage}
          alt="Hero Background"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />

        {/* Centered Text Content */}
        <div className="relative z-20 flex items-center justify-center h-full px-6 md:px-12 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              Revolutionize Your Health<br />
              with AI Intelligence
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Experience faster, smarter, and personalized medical guidance — powered by AI.
            </p>
            <button
              onClick={() => navigate('/treatment')}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              🚀 Get Started
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <h2 className="text-4xl font-bold text-center mt-20 mb-12 text-blue-800 dark:text-white">
        How It Works?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 mb-20">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mb-20 px-6">
        <p className={`text-xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Empower your health decisions today with MediPath
        </p>
        <button
          onClick={() => navigate('/treatment')}
          className="bg-gradient-to-r from-indigo-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:from-indigo-600 hover:to-blue-800 transition-all duration-300 font-semibold tracking-wide"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
}

export default Home;
