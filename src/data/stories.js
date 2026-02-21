export const categories = [
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Showcase your ability to lead, inspire, and drive results through others.',
    unlocked: true,
  },
  {
    id: 'impact',
    name: 'Impact/Achievement',
    description: 'Highlight your key accomplishments and the measurable impact you\'ve made.',
    unlocked: false,
  },
  {
    id: 'failure',
    name: 'Failure/Learning',
    description: 'Demonstrate your resilience and ability to learn from setbacks.',
    unlocked: false,
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    description: 'Illustrate your collaborative skills and ability to work with diverse teams.',
    unlocked: false,
  },
  {
    id: 'why-mba',
    name: 'Why MBA',
    description: 'Explain your motivations for pursuing an MBA and career goals.',
    unlocked: false,
  },
  {
    id: 'career-vision',
    name: 'Career Vision',
    description: 'Articulate your long-term career aspirations and how an MBA fits in.',
    unlocked: false,
  },
];

export const questions = {
  leadership: [
    {
      id: 'leadership-1',
      prompt: 'Tell me about a time you led a team through a significant challenge.',
      subQuestions: [
        'What was the specific context and your role?',
        'What obstacles did the team face?',
        'How did you motivate and guide your team?',
        'What was the outcome?',
      ],
      tips: [
        'Focus on your specific actions and decisions, not just the team\'s collective effort.',
        'Quantify the impact when possible.',
        'Show vulnerability - acknowledge what you learned from the experience.',
      ],
      mistakes: [
        'Taking credit for the team\'s work.',
        'Being too vague about your leadership role.',
        'Focusing only on the success without discussing challenges.',
      ],
    },
    {
      id: 'leadership-2',
      prompt: 'Describe a time when you had to lead without formal authority.',
      subQuestions: [
        'What situation required leadership from you?',
        'How did you gain credibility with your peers?',
        'What challenges did you face without formal authority?',
        'How did you influence others to follow your direction?',
      ],
      tips: [
        'Highlight your ability to influence without relying on positional power.',
        'Show how you built trust and credibility.',
        'Discuss specific influence strategies you used.',
      ],
      mistakes: [
        'Describing situations where you actually had formal authority.',
        'Focusing on the outcome without explaining your approach.',
      ],
    },
    {
      id: 'leadership-3',
      prompt: 'Tell me about a time you had to make a difficult decision as a leader.',
      subQuestions: [
        'What was the decision you faced?',
        'What were the trade-offs involved?',
        'How did you gather input from stakeholders?',
        'What was the result and what did you learn?',
      ],
      tips: [
        'Show your decision-making process, not just the decision.',
        'Demonstrate you considered multiple perspectives.',
        'Be honest about the difficulties and uncertainties.',
      ],
      mistakes: [
        'Making the decision seem obvious or easy.',
        'Not acknowledging the complexity of the choice.',
      ],
    },
  ],
  impact: [
    {
      id: 'impact-1',
      prompt: 'Describe your most significant professional achievement.',
      subQuestions: [
        'What was the situation before your achievement?',
        'What specific actions did you take?',
        'What measurable results did you deliver?',
        'How did this achievement impact the organization?',
      ],
      tips: [
        'Use specific numbers and metrics.',
        'Focus on your unique contribution.',
        'Show the before and after comparison.',
      ],
      mistakes: [
        'Attributing team achievements solely to yourself.',
        'Being vague about results.',
      ],
    },
    {
      id: 'impact-2',
      prompt: 'Tell me about a time you drove innovation in your organization.',
      subQuestions: [
        'What problem or opportunity did you identify?',
        'What was your innovative solution?',
        'How did you implement it?',
        'What was the impact of your innovation?',
      ],
      tips: [
        'Show creativity in your approach.',
        'Demonstrate feasibility and practical implementation.',
        'Quantify the benefits.',
      ],
      mistakes: [
        'Describing ideas you didn\'t actually implement.',
        'Overestimating your individual contribution.',
      ],
    },
    {
      id: 'impact-3',
      prompt: 'Describe a time you had to influence stakeholders to adopt your ideas.',
      subQuestions: [
        'What was your idea and why was it important?',
        'Who were the stakeholders you needed to influence?',
        'What approach did you take to build buy-in?',
        'What was the outcome?',
      ],
      tips: [
        'Show your communication and persuasion skills.',
        'Demonstrate you understood stakeholder concerns.',
        'Highlight your ability to adapt your message.',
      ],
      mistakes: [
        'Being pushy or dismissive of others\' concerns.',
        'Not showing the process of building consensus.',
      ],
    },
  ],
  failure: [
    {
      id: 'failure-1',
      prompt: 'Tell me about a time you failed at something important.',
      subQuestions: [
        'What was the situation?',
        'What was your approach and what went wrong?',
        'How did you respond to the failure?',
        'What did you learn and how did you apply it?',
      ],
      tips: [
        'Be honest and authentic about the failure.',
        'Show accountability - own your mistakes.',
        'Focus heavily on what you learned.',
      ],
      mistakes: [
        'Making excuses or blaming others.',
        'Downplaying the failure.',
        'Not showing meaningful learning.',
      ],
    },
    {
      id: 'failure-2',
      prompt: 'Describe a time you made a significant mistake at work.',
      subQuestions: [
        'What happened?',
        'What was your immediate reaction?',
        'How did you fix the situation?',
        'What systems did you put in place to prevent recurrence?',
      ],
      tips: [
        'Show maturity in handling the mistake.',
        'Demonstrate problem-solving in the aftermath.',
        'Show proactive steps to prevent future issues.',
      ],
      mistakes: [
        'Hiding the mistake.',
        'Not taking responsibility.',
      ],
    },
    {
      id: 'failure-3',
      prompt: 'Tell me about a time you learned a hard lesson at work.',
      subQuestions: [
        'What was the situation?',
        'What hard lesson did you learn?',
        'How did you come to understand this lesson?',
        'How has it changed your approach since?',
      ],
      tips: [
        'Show self-reflection and growth.',
        'Be specific about the lesson.',
        'Demonstrate behavioral change.',
      ],
      mistakes: [
        'Being too general about the lesson.',
        'Not showing concrete change.',
      ],
    },
  ],
  teamwork: [
    {
      id: 'teamwork-1',
      prompt: 'Tell me about a time you worked effectively in a diverse team.',
      subQuestions: [
        'What was the team composition and the project?',
        'What challenges did diversity create?',
        'How did you contribute to team effectiveness?',
        'What was the outcome?',
      ],
      tips: [
        'Show appreciation for different perspectives.',
        'Highlight your adaptability.',
        'Demonstrate inclusive leadership.',
      ],
      mistakes: [
        'Treating diversity as a checkbox exercise.',
        'Not being specific about diversity dimensions.',
      ],
    },
    {
      id: 'teamwork-2',
      prompt: 'Describe a time you had a conflict with a team member.',
      subQuestions: [
        'What was the conflict about?',
        'How did you approach the situation?',
        'What was your role in resolving it?',
        'What did you learn about working with others?',
      ],
      tips: [
        'Show maturity in handling disagreement.',
        'Demonstrate active listening.',
        'Focus on resolution, not blame.',
      ],
      mistakes: [
        'Blaming the other person entirely.',
        'Avoiding difficult conversations.',
      ],
    },
    {
      id: 'teamwork-3',
      prompt: 'Tell me about a time you supported a struggling teammate.',
      subQuestions: [
        'What was the situation and who was struggling?',
        'How did you notice they needed help?',
        'What specific support did you provide?',
        'What was the outcome?',
      ],
      tips: [
        'Show empathy and emotional intelligence.',
        'Be specific about your actions.',
        'Respect the teammate\'s dignity.',
      ],
      mistakes: [
        'Taking over rather than empowering.',
        'Being condescending or preachy.',
      ],
    },
  ],
  'why-mba': [
    {
      id: 'why-mba-1',
      prompt: 'Why are you pursuing an MBA at this point in your career?',
      subQuestions: [
        'What has led you to this decision?',
        'What skills or knowledge are you hoping to gain?',
        'How does this fit with your career trajectory?',
        'Why is now the right time?',
      ],
      tips: [
        'Be specific about your motivations.',
        'Connect to your past experiences.',
        'Show you\'ve thought carefully about this decision.',
      ],
      mistakes: [
        'Generic answers like "to advance my career".',
        'Not being able to articulate specific goals.',
      ],
    },
    {
      id: 'why-mba-2',
      prompt: 'What specific aspects of an MBA are you most excited about?',
      subQuestions: [
        'Which courses or topics interest you most?',
        'What type of learning environment do you thrive in?',
        'How do you plan to contribute to your classmates?',
        'What networking opportunities are you looking for?',
      ],
      tips: [
        'Show you\'ve researched the program.',
        'Be genuine about your interests.',
        'Demonstrate collaborative mindset.',
      ],
      mistakes: [
        'Only focusing on career outcomes.',
        'Not showing genuine intellectual curiosity.',
      ],
    },
    {
      id: 'why-mba-3',
      prompt: 'How will you add value to your MBA program community?',
      subQuestions: [
        'What unique experiences do you bring?',
        'What perspectives can you share?',
        'How do you like to collaborate and learn from others?',
        'What specific contributions do you plan to make?',
      ],
      tips: [
        'Show self-awareness of your strengths.',
        'Demonstrate collaborative spirit.',
        'Be specific about your unique value.',
      ],
      mistakes: [
        'Being too modest or too arrogant.',
        'Generic answers about being a team player.',
      ],
    },
  ],
  'career-vision': [
    {
      id: 'career-vision-1',
      prompt: 'Where do you see yourself in 5 years after your MBA?',
      subQuestions: [
        'What role and industry are you targeting?',
        'What specific goals do you want to achieve?',
        'How will the MBA help you get there?',
        'What kind of impact do you want to make?',
      ],
      tips: [
        'Be ambitious but realistic.',
        'Show you have a clear vision.',
        'Connect your goals to your past experience.',
      ],
      mistakes: [
        'Being too vague about your goals.',
        'Not explaining how MBA fits in.',
      ],
    },
    {
      id: 'career-vision-2',
      prompt: 'What is your dream career and how does it align with your values?',
      subQuestions: [
        'What kind of work excites you?',
        'What matters most to you in a career?',
        'How do you want to make an impact?',
        'What trade-offs are you willing to make?',
      ],
      tips: [
        'Show self-reflection and values.',
        'Be authentic about your aspirations.',
        'Demonstrate thoughtful decision-making.',
      ],
      mistakes: [
        'Choosing "impressive" answers over genuine ones.',
        'Not thinking deeply about values.',
      ],
    },
    {
      id: 'career-vision-3',
      prompt: 'How has your career vision evolved over time?',
      subQuestions: [
        'What did you want to be when you were younger?',
        'How have your goals changed?',
        'What experiences shaped your current vision?',
        'What do you now understand that you didn\'t before?',
      ],
      tips: [
        'Show growth and self-awareness.',
        'Demonstrate thoughtful reflection.',
        'Connect past to present to future.',
      ],
      mistakes: [
        'Making up a dramatic career change story.',
        'Not showing authentic evolution.',
      ],
    },
  ],
};

export const tipsAndMistakes = {
  leadership: {
    tips: [
      'Focus on your specific actions and decisions.',
      'Quantify the impact when possible.',
      'Show vulnerability and what you learned.',
    ],
    mistakes: [
      'Taking credit for the team\'s work.',
      'Being too vague about your role.',
      'Only focusing on success.',
    ],
  },
  impact: {
    tips: [
      'Use specific numbers and metrics.',
      'Focus on your unique contribution.',
      'Show before and after comparison.',
    ],
    mistakes: [
      'Attributing team achievements solely to yourself.',
      'Being vague about results.',
    ],
  },
  failure: {
    tips: [
      'Be honest and authentic.',
      'Show accountability.',
      'Focus on what you learned.',
    ],
    mistakes: [
      'Making excuses.',
      'Downplaying the failure.',
      'Not showing meaningful learning.',
    ],
  },
  teamwork: {
    tips: [
      'Show appreciation for different perspectives.',
      'Highlight your adaptability.',
      'Demonstrate inclusive behavior.',
    ],
    mistakes: [
      'Treating diversity as a checkbox.',
      'Not being specific.',
    ],
  },
  'why-mba': {
    tips: [
      'Be specific about your motivations.',
      'Connect to your past experiences.',
      'Show you\'ve researched the program.',
    ],
    mistakes: [
      'Generic answers about advancement.',
      'Not articulating specific goals.',
    ],
  },
  'career-vision': {
    tips: [
      'Be ambitious but realistic.',
      'Show you have a clear vision.',
      'Connect goals to your experience.',
    ],
    mistakes: [
      'Being too vague.',
      'Not explaining how MBA fits in.',
    ],
  },
};

export const mockStories = [
  {
    id: 1,
    categoryId: 'leadership',
    title: 'Leading Team Through Product Launch',
    dateAdded: '2024-01-15',
    userDraft: 'When I was working at TechCorp, we needed to launch a new product in 3 months. The team was small and everyone was stressed. I took charge and reorganized our workflow...',
    star: {
      situation: 'As the product manager at TechCorp, I faced a critical product launch with only 3 months left. The team of 5 engineers was overwhelmed and the original timeline was unrealistic.',
      task: 'We needed to deliver a fully functional product to meet a contractual deadline with a major client, which represented 30% of our annual revenue.',
      action: 'I restructured the team into smaller agile squads, implemented daily standups, and negotiated scope with the client. I also worked nights and weekends alongside the team to show commitment.',
      result: 'We launched on time with 95% of features. The client renewed their contract for 3 more years, generating $2M in revenue. The team morale improved significantly.',
    },
  },
  {
    id: 2,
    categoryId: 'leadership',
    title: 'Leading Without Authority',
    dateAdded: '2024-01-18',
    userDraft: 'In my previous role, I was a senior individual contributor but needed to lead a cross-functional initiative...',
    star: {
      situation: 'I was a senior engineer asked to lead a digital transformation project, but without formal authority over the team members from marketing, sales, and IT.',
      task: 'Unify 4 departments with conflicting priorities to implement a new CRM system within 6 months.',
      action: 'I built relationships with each department head, organized weekly alignment meetings, and created a shared vision document. I focused on earning trust through expertise and demonstrating value.',
      result: 'The CRM launched successfully, improving sales cycle time by 25%. Two department heads later cited my leadership as key to their career growth.',
    },
  },
  {
    id: 3,
    categoryId: 'impact',
    title: 'Cost Reduction Initiative',
    dateAdded: '2024-01-20',
    userDraft: 'Our department was facing budget cuts and I was asked to find ways to reduce costs while maintaining quality...',
    star: {
      situation: 'Finance department announced 20% budget cuts for all departments during Q4, threatening our ability to operate.',
      task: 'Find ways to reduce costs without laying off staff or compromising service quality.',
      action: 'I conducted a comprehensive process audit, identified redundant workflows, and implemented automation for repetitive tasks. I also renegotiated vendor contracts.',
      result: 'Reduced operational costs by 18%, saved 3 jobs, and improved processing time by 30%. The process improvements continued to generate savings.',
    },
  },
  {
    id: 4,
    categoryId: 'failure',
    title: 'Project Failure Lesson',
    dateAdded: '2024-01-22',
    userDraft: 'Early in my career, I was leading my first major project and made several mistakes...',
    star: {
      situation: 'As a junior project manager, I was given responsibility for a client deliverable. Eager to impress, I promised unrealistic timelines without consulting the team.',
      task: 'Deliver a custom software solution within 2 months.',
      action: 'When it became clear we couldn\'t meet the deadline, I panicked and hid the problem from my manager. I asked the team to work overtime without communicating the stakes.',
      result: 'We delivered a flawed product 2 weeks late. The client was disappointed and the team was exhausted. I lost credibility and had to rebuild trust over 6 months.',
      learning: 'I learned the importance of early communication, realistic planning, and transparency. Since then, I always build buffer time into estimates and flag risks immediately.',
    },
  },
  {
    id: 5,
    categoryId: 'teamwork',
    title: 'Resolving Team Conflict',
    dateAdded: '2024-01-25',
    userDraft: 'Two senior members of my team had a major disagreement about the technical approach...',
    star: {
      situation: 'Two senior engineers on my team disagreed so intensely about the technology stack that they stopped collaborating, threatening project delivery.',
      task: 'Resolve the conflict and ensure the project moved forward effectively.',
      action: 'I met with each person separately to understand their perspective. I then organized a structured debate where both could present their case objectively. I facilitated a decision framework based on project requirements.',
      result: 'We chose a hybrid approach that incorporated the best of both ideas. Both engineers felt heard and the final solution was stronger. The project delivered on time.',
    },
  },
  {
    id: 6,
    categoryId: 'impact',
    title: 'Customer Success Innovation',
    dateAdded: '2024-01-28',
    userDraft: 'Our customer satisfaction scores were dropping and leadership asked me to figure out why...',
    star: {
      situation: 'Customer satisfaction had dropped from 85% to 72% over 6 months, with increasing complaints about response time.',
      task: 'Identify root causes and implement solutions to improve customer experience.',
      action: 'I analyzed support tickets, conducted customer interviews, and discovered the issue was lack of self-service options. I designed and led development of a knowledge base and chatbot.',
      result: 'Satisfaction improved to 88% within 3 months. Support ticket volume decreased by 40%, saving $200K annually in support costs.',
    },
  },
];

export const whyMbaSummary = {
  bullets: [
    'Bridge the gap between technical background and general management skills',
    'Develop strategic thinking and business acumen through case-based learning',
    'Build a strong professional network across industries and functions',
    'Gain credibility in business contexts as an engineer',
    'Access career opportunities that require senior leadership skills',
    'Learn from diverse perspectives of classmates and faculty',
  ],
};

export const careerVisionSummary = {
  bullets: [
    'Short-term (1-3 years): Product leadership role in technology sector',
    'Mid-term (3-7 years): Senior director or VP of Product at growth-stage company',
    'Long-term (7-10+ years): C-level Product executive or entrepreneurial venture',
    'Goal: Build products that positively impact millions of users',
    'Focus: Intersection of technology, user experience, and business strategy',
  ],
};
