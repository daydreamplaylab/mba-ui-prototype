export const strategyData = {
  dashboard: {
    partA: {
      title: "Initial Assessment",
      description: "Quick assessment to get you started.",
      time: "~5 minutes",
      status: "not_started"
    },
    parts: [
      {
        id: 'part-b',
        title: "Strengths & Weaknesses",
        description: "Discover what makes you competitive and what to work on.",
        time: "~10 min",
        status: "not_started"
      },
      {
        id: 'part-c',
        title: "Career Vision",
        description: "Clarify your short-term and long-term career goals.",
        time: "~10 min",
        status: "not_started"
      },
      {
        id: 'part-d',
        title: "Why MBA",
        description: "Articulate why an MBA is the right path for you.",
        time: "~10 min",
        status: "not_started"
      }
    ]
  },

  partA: {
    welcome: "Welcome! Let's get to know you. This quick assessment takes about 5 minutes and will help us personalize your journey.",
    questions: [
      {
        id: 'a1',
        question: "What is your current role and company?",
        helperPrompts: ["What industry are you in?", "How long have you been in this role?"],
        mockAnswer: "Senior Consultant at McKinsey & Company, 3 years in current role",
        acknowledgment: null
      },
      {
        id: 'a2',
        question: "How many years of total work experience do you have?",
        helperPrompts: ["Include internships only if significant (6+ months)"],
        mockAnswer: "5 years",
        acknowledgment: "Great, 5 years in consulting is solid experience."
      },
      {
        id: 'a3',
        question: "What is your undergraduate degree and school?",
        helperPrompts: ["Major, university name", "graduation year"],
        mockAnswer: "BS Computer Science, UC Berkeley, 2020",
        acknowledgment: "Strong technical background from a top program."
      },
      {
        id: 'a4',
        question: "What is your GPA?",
        helperPrompts: ["If your school uses a different scale, note that"],
        mockAnswer: "3.6 / 4.0",
        acknowledgment: "Good GPA, shows academic capability."
      },
      {
        id: 'a5',
        question: "Have you taken the GMAT or GRE? What was your score?",
        helperPrompts: ["If you haven't taken it yet, that's fine — just let us know"],
        mockAnswer: "GMAT 720 (Q49, V40)",
        acknowledgment: "Excellent score, well above the median for top programs."
      },
      {
        id: 'a6',
        question: "What are your target schools?",
        helperPrompts: ["List your top choices, even if you're not sure yet"],
        mockAnswer: "Harvard, Stanford, Wharton, Kellogg",
        acknowledgment: "Strong list of top-tier targets."
      },
      {
        id: 'a7',
        question: "What career path are you considering after your MBA?",
        helperPrompts: ["Industry, function", "or specific role you're targeting"],
        mockAnswer: "Product Management at a major tech company, long-term goal to lead product at a startup",
        acknowledgment: "Clear consulting to tech PM transition is well-trodden path."
      },
      {
        id: 'a8',
        question: "Why are you considering an MBA?",
        helperPrompts: ["What do you hope to gain that you can't get otherwise?"],
        mockAnswer: "Career transition from consulting to tech, build a stronger network, develop product skills",
        acknowledgment: "Solid motivations for pursuing an MBA."
      }
    ],
    results: {
      profileSummary: {
        currentRole: "Senior Consultant, McKinsey & Company",
        experience: "5 years",
        education: "BS Computer Science, UC Berkeley (3.6 GPA)",
        testScore: "GMAT 720",
        targetSchools: "Harvard, Stanford, Wharton, Kellogg",
        postMbaGoal: "Product Management in Tech"
      },
      guidance: [
        "Based on your profile, you have a competitive background for your target schools. Your consulting experience and strong GMAT score are assets.",
        "To strengthen your application, focus on building a clear narrative around your career transition from consulting to tech. Your 'why MBA' and 'why now' story will be critical.",
        "We recommend working through the Story Building exercises to uncover experiences that demonstrate product thinking and leadership beyond your consulting role."
      ],
      nextSteps: [
        { text: "Start with School Selection to research your target schools in depth", url: "/schools" },
        { text: "Build Your Stories to prepare material for essays and interviews", url: "/stories" },
        { text: "Explore Strengths & Weaknesses for a deeper self-assessment", url: "/strategy/part-b" }
      ]
    }
  },

  partB: {
    intro: "Let's go deeper on what makes you stand out and what you need to work on. ~10 minutes.",
    questions: [
      {
        id: 'b1',
        question: "What do you consider your biggest professional achievement?",
        helperPrompts: ["Think about impact", "scale", "and recognition"],
        mockAnswer: "Led a cross-functional team to deliver a $5M cost reduction project for a Fortune 500 client, completed 2 months ahead of schedule",
        acknowledgment: null
      },
      {
        id: 'b2',
        question: "What skills or qualities do your colleagues praise you for?",
        helperPrompts: ["Think about feedback from managers", "peers", "reports"],
        mockAnswer: "Analytical rigor, ability to simplify complex problems, and strong client communication",
        acknowledgment: "These are exactly the skills top programs look for."
      },
      {
        id: 'b3',
        question: "What areas of your profile do you think are weakest for MBA admissions?",
        helperPrompts: ["Be honest — GPA", "test scores", "work experience gaps", "lack of community involvement?"],
        mockAnswer: "Limited extracurricular involvement outside of work, and no direct management experience — only project-based leadership",
        acknowledgment: "Self-awareness is important. These are addressable weaknesses."
      },
      {
        id: 'b4',
        question: "What experiences outside of work might strengthen your application?",
        helperPrompts: ["Volunteering", "hobbies", "community leadership", "personal projects"],
        mockAnswer: "Board member of a local coding bootcamp for underrepresented students, recreational marathon runner",
        acknowledgment: "Great, you do have meaningful activities outside work."
      },
      {
        id: 'b5',
        question: "Is there anything in your background you're worried about or want to address?",
        helperPrompts: ["Gaps in resume", "career switches", "academic concerns"],
        mockAnswer: "Switched companies twice in 5 years — worried it might look like job-hopping",
        acknowledgment: "This is a common concern that can be addressed with good storytelling."
      }
    ],
    results: {
      strengths: [
        {
          title: "Strong quantitative profile (GMAT 720, CS degree)",
          tip: "Emphasize this in applications to schools that value analytical rigor. Reference specific quantitative achievements in essays."
        },
        {
          title: "Prestigious employer with clear progression",
          tip: "McKinsey carries weight — highlight specific projects rather than just the brand name. Show what YOU did, not what McKinsey does."
        },
        {
          title: "Clear career transition narrative",
          tip: "Consulting → Tech PM is a well-understood path. Use specific examples of product thinking from your consulting work."
        },
        {
          title: "Community involvement (coding bootcamp board)",
          tip: "This is unique and shows genuine passion. Feature it prominently — many applicants lack meaningful extracurriculars."
        }
      ],
      weaknesses: [
        {
          title: "Limited direct management experience",
          tip: "Frame project leadership as management experience. Emphasize team size, stakeholder management, and mentoring."
        },
        {
          title: "Short tenures at companies",
          tip: "Address this proactively — frame each move as intentional progression. Show what you gained at each stop."
        },
        {
          title: "Limited extracurricular depth",
          tip: "Your bootcamp involvement is good but singular. If possible, add one more activity before applications. Quality over quantity."
        }
      ]
    }
  },

  partC: {
    intro: "Let's clarify your short-term and long-term career goals. This will help you write compelling essays. ~10 minutes.",
    questions: [
      {
        id: 'c1',
        question: "What role do you want immediately after your MBA?",
        helperPrompts: ["Be specific — industry", "function", "company type"],
        mockAnswer: "Product Manager at a growth-stage tech company, ideally in the AI/ML space",
        acknowledgment: null
      },
      {
        id: 'c2',
        question: "Where do you see yourself in 10 years?",
        helperPrompts: ["Think big but be realistic", "What impact do you want to make?"],
        mockAnswer: "VP of Product at a major tech company, or CPO at a startup I helped scale",
        acknowledgment: "Ambitious and clear long-term vision."
      },
      {
        id: 'c3',
        question: "What skills or experiences are you missing to reach your goals?",
        helperPrompts: ["What gap does the MBA fill?"],
        mockAnswer: "Hands-on product development experience, deeper understanding of engineering trade-offs, and a network in the tech/startup ecosystem",
        acknowledgment: "These are exactly what top MBA programs provide."
      },
      {
        id: 'c4',
        question: "Why can't you reach these goals without an MBA?",
        helperPrompts: ["Be specific about what the MBA provides that your current path doesn't"],
        mockAnswer: "My consulting background gives me strategy skills but not product execution skills. I need immersive product courses, recruiting access to PM roles, and a peer network of tech leaders",
        acknowledgment: "Strong articulation of the 'why MBA' gap."
      },
      {
        id: 'c5',
        question: "What would you do if you don't get into an MBA program?",
        helperPrompts: ["This helps test how committed you are to this path"],
        mockAnswer: "I'd try to transition into a PM role through my network and reapply the following year. The MBA is strongly preferred but not my only path.",
        acknowledgment: "Good to have a backup, shows pragmatism."
      }
    ],
    results: {
      summary: [
        "Short-term: Product Manager at a growth-stage tech company in AI/ML space",
        "Long-term: VP of Product at major tech company or CPO at a startup",
        "Skills gap the MBA fills: Product execution skills, engineering trade-offs knowledge, tech/startup network",
        "Why MBA: Consulting provides strategy but not product skills. Need immersive courses, PM recruiting access, and peer network of tech leaders."
      ]
    }
  },

  partD: {
    intro: "Let's articulate why an MBA is the right path for you. ~10 minutes.",
    questions: [
      {
        id: 'd1',
        question: "Why do you want an MBA?",
        helperPrompts: ["Beyond career goals — what does the experience itself mean to you?"],
        mockAnswer: "I want to be surrounded by ambitious, diverse peers and learn from world-class faculty. I also want the structured time to reflect on my career direction.",
        acknowledgment: null
      },
      {
        id: 'd2',
        question: "Why now, not earlier or later?",
        helperPrompts: ["What makes this the right timing in your career?"],
        mockAnswer: "I have enough experience to contribute meaningfully to class discussions, but I'm early enough that the MBA can redirect my trajectory. Waiting longer would make the transition harder.",
        acknowledgment: "Good timing rationale."
      },
      {
        id: 'd3',
        question: "What alternatives to an MBA have you considered?",
        helperPrompts: ["Other master's degrees", "bootcamps", "self-study", "job switching directly"],
        mockAnswer: "I considered online PM certifications and direct applications to PM roles, but the MBA offers a more holistic transformation — network, recruiting pipeline, and leadership development.",
        acknowledgment: "Shows you've thought this through carefully."
      },
      {
        id: 'd4',
        question: "How will an MBA specifically help your career goals?",
        helperPrompts: ["Connect your MBA plans to the goals from Career Vision"],
        mockAnswer: "The MBA gives me access to tech recruiting, product management coursework, and a community of founders and operators I can't access from consulting.",
        acknowledgment: "Clear connection between MBA and career goals."
      },
      {
        id: 'd5',
        question: "What will you contribute to your MBA class?",
        helperPrompts: ["Think about unique perspectives", "skills", "experiences you bring"],
        mockAnswer: "A rigorous analytical framework from consulting, passion for making tech education accessible, and cross-cultural perspective from working across 4 countries.",
        acknowledgment: "Strong contribution narrative."
      }
    ],
    results: {
      summary: [
        "Core motivation: Surrounded by ambitious peers, learn from faculty, structured time to reflect",
        "Why now: Enough experience to contribute, early enough to redirect trajectory",
        "Why MBA vs alternatives: Holistic transformation, network, recruiting pipeline, leadership development",
        "What they'll contribute: Analytical framework, passion for tech education, cross-cultural perspective"
      ]
    }
  }
};
