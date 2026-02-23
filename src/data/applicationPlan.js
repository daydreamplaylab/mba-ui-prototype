export const applicationPlanData = {
  welcome: "Your application checklist. Track your progress and stay on top of tasks.",
  
  categories: [
    {
      id: 'gmat-gre',
      name: 'Take GMAT/GRE',
      tasks: [
        { id: 'gmat-1', name: 'Register for GMAT/GRE', link: null },
        { id: 'gmat-2', name: 'Take GMAT/GRE', link: null },
        { id: 'gmat-3', name: 'Send scores to schools', link: null },
      ]
    },
    {
      id: 'research-schools',
      name: 'Research Your Schools',
      tasks: [
        { id: 'research-1', name: 'Finalize school list', link: { text: 'Go to School Selection', url: '/schools' } },
        { id: 'research-2', name: "Research each school's essay prompts", link: null },
        { id: 'research-3', name: 'Note application deadlines', link: null },
      ]
    },
    {
      id: 'build-stories',
      name: 'Build Your Stories',
      tasks: [
        { id: 'stories-1', name: 'Complete career vision', link: { text: 'Go to Strategy', url: '/' } },
        { id: 'stories-2', name: 'Complete "Why MBA" narrative', link: { text: 'Go to Strategy', url: '/' } },
        { id: 'stories-3', name: 'Build story bank', link: { text: 'Go to Build Your Stories', url: '/stories' } },
      ]
    },
    {
      id: 'prepare-materials',
      name: 'Prepare Your Materials',
      tasks: [
        { id: 'materials-1', name: 'Draft resume', link: { text: 'Go to Application Materials', url: '/application' } },
        { id: 'materials-2', name: 'Finalize resume', link: { text: 'Go to Application Materials', url: '/application' } },
        { id: 'materials-3', name: 'Identify recommenders', link: null },
        { id: 'materials-4', name: 'Brief recommenders', link: null },
        { id: 'materials-5', name: 'Draft essays', link: { text: 'Go to Application Materials', url: '/application' } },
        { id: 'materials-6', name: 'Finalize essays', link: { text: 'Go to Application Materials', url: '/application' } },
      ]
    },
    {
      id: 'submit-applications',
      name: 'Submit Applications',
      tasks: [
        { id: 'submit-1', name: 'Complete application forms', link: null },
        { id: 'submit-2', name: 'Review full application', link: null },
        { id: 'submit-3', name: 'Submit applications', link: null },
      ]
    },
    {
      id: 'ace-interviews',
      name: 'Ace Your Interviews',
      tasks: [
        { id: 'interview-1', name: 'Prepare for interviews', link: { text: 'Go to Interview Prep', url: '/interview' } },
        { id: 'interview-2', name: 'Complete interviews', link: null },
      ]
    }
  ]
};
