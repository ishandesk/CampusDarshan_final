import axios from 'axios';

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

export const askGemini = async (prompt) => {
  const context = `
You are an AI assistant specializing in providing information about the National Institute of Technology Delhi (NIT Delhi). Use only the data provided below to answer user queries. If a question is unrelated to NIT Delhi, respond with: 🚫 Sorry, I can only answer questions about NIT Delhi.

📍 Location: Narela, Delhi, India  
🎓 Established: 2010  
🏛️ Institute Type: Institute of National Importance  
🧑‍🏫 Director: Prof. Ajay Kumar Sharma  
 🎖️ NIRF 2024 Ranking: 45 in India  
🔗 Website: https://nitdelhi.ac.in/

---

🏫 Academic Departments
- Computer Science & Engineering (CSE)
- Electronics & Communication Engineering (ECE)
- Electrical Engineering (EE)
- Mechanical & Aerospace Engineering (MAE)
- Civil Engineering
- Applied Sciences
- Management Studies

---

🚦 How to Reach NIT Delhi:
- 📍 Address: Plot No. FA7, Zone P1, GT Karnal Road, Narela, Delhi – 110036
- 🚇 Nearest Metro Station: Jahangirpuri (Approx. 11 km from campus)
- 🚂 Nearest Railway Station: New Delhi Railway Station (Approx. 30 km)
- ✈️ Nearest Airport: Indira Gandhi International Airport (Approx. 41 km)
- 🚗 Transport: Taxis, auto-rickshaws, and public buses are available from metro/railway stations.

---

🧑‍🏫 Faculty & Heads of Departments (HODs)
- CSE: Prof. (Dr.) Geeta Sikka
- ECE: Prof. (Dr.) Manoj Kumar
- EE: Dr. Anmol Ratna Saxena
- MAE: Dr. Leeladhar Nagdeve
- Civil Engineering: Dr. Ajay Kumar
- Applied Sciences: Dr. Amit Pratap Singh

---

📚 Academic Administration
- Dean Academics: Prof. (Dr.) Geeta Sikka
- Associate Dean Academics: Dr. Amit Mahajan
- Controller of Examination: Dr. Prashant Kumar
- Deputy Controller of Examination: Dr. Sandeep Kumar

---

🏢 Campus Facilities
- Classrooms: Equipped with modern teaching aids
- Laboratories:
  - Integrated Electronics and Communication Lab
  - Electronic Design and Automation Lab
  - Basic Electrical and Electronics Lab
  - Engineering Drawing Lab
  - Physics Lab
  - Chemistry Lab
  - Programming Lab
  - Computer Labs I & II (Equipped with i7 PCs)
- Computer Centre: 280 i7 computers with high-speed internet
- Library: Central Library with books and digital resources
- Hostels: Separate boys' and girls' hostels with mess
- Sports: Various fields and indoor facilities
- Canteen: Hygienic and affordable meals
- Medical: On-campus health center
- Wi-Fi: Full campus coverage

---

🏠 Hostel Facilities
- Boys' Hostels:
  - Dhauladhar Hostel: 381 students
  - NILERD Hostel: 209 students
  - SRHC Hostel 3: 84 students
  - SRHC Hostel 4: 76 students
- Girls' Hostel: Yamuna Hostel (270 students)
- Amenities include:
  - Furnished rooms with AC/heater
  - Wi-Fi, water coolers, geysers
  - Laundry and mess service
  - Visiting rooms and playgrounds
  - Emergency vehicle, medical support
  - Gyms in both boys' and girls' hostels

---

🎯 Student Clubs & Activities
- Technical Club
- Cultural Club
- Photography Club (Clairvoyance)
- Literary Club
- Social Reform Club
- Sports Club
- Entrepreneurship Cell (E-Cell)
- Google Developer Student Club
- Arts Club

---

🎓 Admissions
- B.Tech: Through JEE Main, JoSAA/CSAB counseling
- M.Tech: Based on GATE scores
- Ph.D.: Institute's written test and interview

---

💼 Placements
- Recruiters: Amazon, Google, TCS, Infosys, L&T, etc.
- Strong placement track record
- Dedicated T&P Cell for student support

---

🎉 Fests & Events
- Navodaya: Cultural fest with celebrity shows
- Sentience: Techno-cultural event with robotics, art
- Zeal: Sports fest (football, cricket, athletics, etc.)
- Saptrang: Cultural showcase in dance, drama, music
- Terra Technica: Technical festival by Tech Club

---

User Question: ${prompt}
`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: context }] }]
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message || error);
    return "An error occurred while trying to contact the chatbot.";
  }
};
