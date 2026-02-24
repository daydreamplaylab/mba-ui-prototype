export const coaches = [
  {
    id: 1,
    name: "Sarah L.",
    verified: true,
    bio: "Former McKinsey consultant, HBS '20. Specializes in career switchers.",
    fullBio: `With over five years of experience at McKinsey & Company, I specialize in helping professionals pivot into top-tier consulting roles. My approach is data-driven, focusing on crafting a compelling narrative that aligns your past experiences with your future ambitions.\n\nHaving navigated the HBS application process myself, I understand the nuances of what makes an application stand out. I'm excited to help you on your journey to business school.`,
    detailedServices: "Recommendations, Essays, Secondary Review, Application Strategy, Resume, Interviews, Editing, Ding Analysis, Waitlist Strategy, School Selection",
    services: ["Strategy & Career", "Essay & Resume Review"],
    school: "Harvard Business School",
    industry: "Consulting",
    price: 150,
    languages: ["English", "Mandarin"],
    photo: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "John D.",
    verified: true,
    photo: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Stanford GSB '19, ex-Google PM. Passionate about tech and entrepreneurship.",
    services: ["Strategy & Career", "School Selection"],
    school: "Stanford Graduate School of Business",
    industry: "Tech",
    price: 200,
    languages: ["English"],
    fullBio: `As a former Product Manager at Google and a Stanford GSB graduate, I live and breathe technology and innovation. I work with aspiring entrepreneurs and tech leaders to build their unique stories and prepare them for the rigorous demands of a top MBA program.\n\nMy coaching philosophy is centered on authenticity and impact. Together, we'll identify your core strengths and craft an application that showcases your potential to change the world.`,
    detailedServices: "Application Strategy, Resume, Interviews, Networking Strategy, School Selection",
  },
  {
    id: 3,
    name: "Maria G.",
    verified: true,
    photo: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Wharton '21, specializing in finance and investment banking.",
    services: ["Essay & Resume Review", "Interview Prep"],
    school: "The Wharton School",
    industry: "Finance",
    price: 180,
    languages: ["English", "Spanish"],
    fullBio: `I'm a Wharton alum with a deep background in investment banking and private equity. I help candidates break into the competitive world of finance by focusing on technical interview preparation and perfecting their application essays.\n\nBreaking into finance requires a specific narrative and a high level of polish. I provide targeted feedback and mock interviews to ensure you are fully prepared to impress admissions committees and recruiters.`,
    detailedServices: "Resume, Interviews, Editing, Ding Analysis, Financial Aid & Scholarships",
  },
];

export const conversations = [
  {
    id: 1,
    coachId: 1,
    unread: true,
    messages: [
      { type: 'intake', sender: 'user', data: { topic: 'Interview Prep', requirements: 'I have an HBS interview next month and would like to do a mock interview.', availability: 'Weekday evenings EST' } },
      { type: 'message', sender: 'coach', text: 'Thanks for reaching out! I\'d love to help with your HBS interview prep.', timestamp: '3h ago' },
      { type: 'message', sender: 'user', text: 'Great! What times work for you?', timestamp: '2h ago' },
      { type: 'message', sender: 'coach', text: 'How about Wednesday at 3pm EST?', timestamp: '2h ago' },
    ],
  },
  {
    id: 2,
    coachId: 2,
    unread: true,
    status: 'Payment Requested',
    messages: [
      { type: 'intake', sender: 'user', data: { topic: 'Essay & Resume Review', requirements: 'Need help with my Booth essay, it feels a bit generic.', availability: 'Anytime this weekend' } },
      { type: 'message', sender: 'coach', text: 'I\'d be happy to review your Booth essay. Let\'s schedule a 60-minute session.', timestamp: 'Yesterday' },
      { type: 'message', sender: 'user', text: 'Sounds good!', timestamp: 'Yesterday' },
      { type: 'payment_request', sender: 'coach', data: { title: 'Booth Essay Review', category: 'Essay & Resume Review', topics: 'Essay brainstorming, structure, and content refinement', length: 60, price: 200 }, timestamp: 'Yesterday' },
      { type: 'message', sender: 'coach', text: 'I\'ve sent you a payment request for our session.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 3,
    coachId: 3,
    unread: false,
    status: 'Session Completed',
    messages: [
      { type: 'intake', sender: 'user', data: { topic: 'Strategy & Career', requirements: 'Career switch from engineering to consulting, need to build a strategy.', availability: 'Saturday morning' } },
      { type: 'message', sender: 'coach', text: 'Great background! Let\'s map out your strategy.', timestamp: 'Jan 16' },
      { type: 'payment_request', sender: 'coach', paid: true, data: { title: 'Career Strategy Session', category: 'Strategy & Career', topics: 'Career narrative, target firms, networking strategy', length: 60, price: 180, paidDate: 'Jan 16' }, timestamp: 'Jan 16' },
      { type: 'session_confirmed', sender: 'system', data: { date: 'Jan 18', time: '10:00 AM EST' }, timestamp: 'Jan 16' },
      { type: 'message', sender: 'user', text: 'Looking forward to it!', timestamp: 'Jan 17' },
      { type: 'message', sender: 'coach', text: 'Great session today! I\'ll upload my notes shortly.', timestamp: 'Jan 18' },
      { type: 'session_completed', sender: 'coach', data: {
          notes: {
              date: 'Jan 18, 2025',
              summary: 'Discussed career goals and mapped out a 3-month strategy for networking and applications.',
              feedback: 'Excellent analytical background. Needs to translate engineering accomplishments into business impact.',
              nextSteps: 'Draft a new version of the resume focusing on impact metrics. Begin outreach to 5 contacts at target firms.',
          }
      }, timestamp: 'Jan 18' },
      { type: 'message', sender: 'user', text: 'Thanks so much, this was really helpful!', timestamp: 'Jan 18' },
    ],
  },
];

export const coachHistory = [
    {
        id: 1,
        coachId: 3,
        serviceArea: 'Strategy & Career',
        date: 'Jan 18, 2025',
        status: 'Completed',
        conversationId: 3,
        notes: {
            date: 'Jan 18, 2025',
            summary: 'Discussed career goals and mapped out a 3-month strategy for networking and applications.',
            feedback: 'Excellent analytical background. Needs to translate engineering accomplishments into business impact.',
            nextSteps: 'Draft a new version of the resume focusing on impact metrics. Begin outreach to 5 contacts at target firms.',
        }
    },
    {
        id: 2,
        coachId: 1,
        serviceArea: 'Interview Prep',
        date: 'Dec 3, 2024',
        status: 'Funds Released',
        conversationId: 4, // Example
        notes: null,
    }
];
