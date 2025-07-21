import { motion } from 'framer-motion';
import { CgMail } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import pranjalImage from '../Images/imgPranjal.jpg';
import sidhantImage from '../Images/imgSidhant.jpeg';

function Team({ darkMode }) {
  const teamMembers = [
    {
      name: "Sidhant Gairola",
      role: "Full Stack Developer",
      email: "ssid7074@gmail.com",
      linkedin: "https://linkedin.com/in/sidhant-gairola",
      image: sidhantImage
    },
    {
      name: "Pranjal Mishra",
      role: "Full Stack Developer",
      email: "pranjalmishra402@gmail.com",
      linkedin: "https://www.linkedin.com/in/pranjal-mishra-06b1501a4/",
      image: pranjalImage
    }
  ];

  return (
    <div className={`py-16 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-3xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition duration-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-lg text-blue-600 font-medium">{member.role}</p>
                <div className="space-y-1">
                  <a href={`mailto:${member.email}`} className="flex items-center text-blue-500 hover:text-blue-800 transition">
                    <CgMail className="mr-2" /> {member.email}
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-800 transition">
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
