exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { messages } = JSON.parse(event.body);
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

  const getReply = (msg) => {
    if (msg.match(/project|built|work|portfolio|election|resume|cgpa|ngo|software house/)) {
      return "Gohar has built 8+ production-ready projects! 🚀 His flagship project is a Real-Time Election Management System built with React, Node.js, PostgreSQL & WebSockets — featuring secure anonymous voting and JWT authentication. Other projects include a Software House website, NGO platform (Care Society), Smart CGPA Calculator, Resume Builder, and more. He's currently building a University Transport Fee Management Portal and LinkedIn Growth OS. All projects are live — check his portfolio for links!";
    }
    if (msg.match(/skill|tech|stack|language|framework|tools|react|node|javascript/)) {
      return "Gohar is a Full-Stack Developer with a strong tech stack! 💻 Frontend: HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap. Backend: Node.js, Express.js, PHP. Databases: PostgreSQL, MySQL, Supabase. Other: C++, SQL, Git, GitHub, WebSockets, JWT Auth, REST APIs, and AI Tools. He specializes in building clean, production-ready web applications.";
    }
    if (msg.match(/contact|email|phone|hire|reach|connect|available|opportunit/)) {
      return "Gohar is available for opportunities! 🤝 Here's how to reach him:\n📧 Email: masharfgill229@gmail.com\n📞 Phone: +92 307 4851435\n💼 LinkedIn: linkedin.com/in/muhammad-goharzaibgill-it\n🐙 GitHub: github.com/goharzaibgill\n📸 Instagram: @gohar_zaib_gill\n\nHe's open to internships, freelance projects, and full-time opportunities!";
    }
    if (msg.match(/about|who|background|yourself|introduce|gohar/)) {
      return "Gohar Zaib Gill is a passionate Full-Stack Developer and BSIT student at Superior University Faisalabad, Pakistan 🎓. He holds a 3.77/4.00 CGPA and is a proud recipient of the Honhaar Scholarship by the Punjab Government — awarded for academic excellence. He serves as Student Vice Leader of the BSIT Department and is actively involved in the IT Society and Care Society. Gohar believes in building practical, real-world solutions — not just code!";
    }
    if (msg.match(/education|university|degree|study|college|cgpa|scholarship|honhaar/)) {
      return "Gohar is pursuing a BSIT degree at Superior University Faisalabad (2024–2028) 🏫. He maintains an impressive 3.77/4.00 CGPA and is a Honhaar Scholar — a merit-based scholarship by the Punjab Government given to top-performing students. Previously, he completed ICS from Muhammad Hussain Int. College (858/1200) and Matric in Science from Govt High School 33GB (956/1100).";
    }
    if (msg.match(/leader|vice|society|community|volunteer|care/)) {
      return "Gohar is not just a developer — he's a leader! 🌟 He serves as Student Vice Leader of the BSIT Department at Superior University. He's also a member of Care Society (community service & blood donation campaigns), IT Society Volunteer, and has earned multiple certificates including Claude 101, Open House, and Quiz Competitions.";
    }
    if (msg.match(/hello|hi|hey|salam|assalam|greet/)) {
      return "Hello! 👋 Welcome to Gohar Zaib Gill's portfolio! I'm his AI assistant. Gohar is a passionate Full-Stack Developer & BSIT student with 8+ live projects and a 3.77 CGPA. Feel free to ask me anything about his projects, skills, education, or how to get in touch!";
    }
    if (msg.match(/language|speak|urdu|english|punjabi|communication/)) {
      return "Gohar is multilingual! 🌍 He is fluent in:\n\n🇵🇰 Urdu — Native language\n🏴󠁧󠁢󠁥󠁮󠁧󠁿 English — Professional proficiency (reading, writing, speaking)\n🌾 Punjabi — Mother tongue\n\nHe can communicate effectively with clients and teams in both Urdu and English!";
    }
    return "Great question! 😊 I'm Gohar's AI assistant. I can tell you all about his projects, technical skills, educational background, leadership roles, and contact information. What would you like to know?";
  };

  const reply = getReply(lastMessage);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ reply }),
  };
};
