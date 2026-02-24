import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import PromotionBar from './components/common/PromotionBar';
import Navbar from './components/common/Navbar';
import UserToggle from './components/common/UserToggle';
import Dashboard from './pages/Dashboard';
import SchoolList from './components/schools/SchoolList';
import SchoolDetail from './components/schools/SchoolDetail';
import MySchools from './components/schools/MySchools';
import Pricing from './pages/Pricing';
import StoriesDashboard from './components/stories/StoriesDashboard';
import BrainstormPage from './components/stories/BrainstormPage';
import CompletionSummary from './components/stories/CompletionSummary';
import SummaryPage from './components/stories/SummaryPage';
import ApplicationMaterialsDashboard from './components/application/ApplicationMaterialsDashboard';
import ApplicationSectionPage from './components/application/ApplicationSectionPage';
import InterviewPrepPage from './components/interview/InterviewPrepPage';
import ApplicationPlanPage from './components/plan/ApplicationPlanPage';
import CoachMarketplace from './pages/CoachMarketplace';
import MarketplaceDashboard from './pages/coach/MarketplaceDashboard';
import MessageInbox from './pages/coach/MessageInbox';
import PaymentCheckout from './pages/coach/PaymentCheckout';
import CoachHistory from './pages/coach/CoachHistory';
import CoachDashboard from './pages/coach/CoachDashboard';
import CoachConversation from './components/coach/CoachConversation';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
          <PromotionBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schools" element={<SchoolList />} />
            <Route path="/schools/:id" element={<SchoolDetail />} />
            <Route path="/my-schools" element={<MySchools />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/stories" element={<StoriesDashboard />} />
            <Route path="/stories/:categoryId" element={<BrainstormPage />} />
            <Route path="/stories/completion" element={<CompletionSummary />} />
            <Route path="/stories/:categoryId/summary" element={<SummaryPage />} />
            <Route path="/application" element={<ApplicationMaterialsDashboard />} />
            <Route path="/application/:sectionId" element={<ApplicationSectionPage />} />
            <Route path="/interview" element={<InterviewPrepPage />} />
            <Route path="/plan" element={<ApplicationPlanPage />} />
            <Route path="/coach-marketplace" element={<CoachMarketplace />}>
              <Route path="browse" element={<MarketplaceDashboard />} />
              <Route path="messages" element={<MessageInbox />} />
              <Route path="checkout" element={<PaymentCheckout />} />
              <Route path="history" element={<CoachHistory />} />
            </Route>
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            <Route path="/coach/conversation/:id" element={<CoachConversation />} />
          </Routes>
          <UserToggle />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
