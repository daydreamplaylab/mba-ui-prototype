import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import PromotionBar from './components/common/PromotionBar';
import Navbar from './components/common/Navbar';
import UserToggle from './components/common/UserToggle';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import WelcomeSplash from './pages/WelcomeSplash';
import SchoolList from './components/schools/SchoolList';
import SchoolDetail from './components/schools/SchoolDetail';
import MySchools from './components/schools/MySchools';
import Pricing from './pages/Pricing';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import StoriesDashboard from './components/stories/StoriesDashboard';
import BrainstormPage from './components/stories/BrainstormPage';
import CompletionSummary from './components/stories/CompletionSummary';
import SummaryPage from './components/stories/SummaryPage';
import ApplicationMaterialsDashboard from './components/application/ApplicationMaterialsDashboard';
import ApplicationSectionPage from './components/application/ApplicationSectionPage';
import InterviewPrepPage from './components/interview/InterviewPrepPage';
import ApplicationPlanPage from './components/plan/ApplicationPlanPage';
import StrategyDashboard from './components/strategy/StrategyDashboard';
import PartAWelcome from './components/strategy/PartAWelcome';
import PartAResults from './components/strategy/PartAResults';
import PartBIntro from './components/strategy/PartBIntro';
import PartBResults from './components/strategy/PartBResults';
import PartCIntro from './components/strategy/PartCIntro';
import PartCResults from './components/strategy/PartCResults';
import PartDIntro from './components/strategy/PartDIntro';
import PartDResults from './components/strategy/PartDResults';
import QAFlow from './components/strategy/QAFlow';
import ChatQAFlow from './components/strategy/ChatQAFlow';
import { strategyData } from './data/strategy';
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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/welcome" element={<WelcomeSplash />} />
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <Dashboard />
              <UserToggle />
            </div>
          } />
          <Route path="/schools" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <SchoolList />
              <UserToggle />
            </div>
          } />
          <Route path="/schools/:id" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <SchoolDetail />
              <UserToggle />
            </div>
          } />
          <Route path="/my-schools" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <MySchools />
              <UserToggle />
            </div>
          } />
          <Route path="/pricing" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <Pricing />
              <UserToggle />
            </div>
          } />
          <Route path="/payment" element={
            <PaymentPage />
          } />
          <Route path="/profile" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <ProfilePage />
              <UserToggle />
            </div>
          } />
          <Route path="/stories" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <StoriesDashboard />
              <UserToggle />
            </div>
          } />
          <Route path="/stories/:categoryId" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <BrainstormPage />
              <UserToggle />
            </div>
          } />
          <Route path="/stories/completion" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <CompletionSummary />
              <UserToggle />
            </div>
          } />
          <Route path="/stories/:categoryId/summary" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <SummaryPage />
              <UserToggle />
            </div>
          } />
          <Route path="/application" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <ApplicationMaterialsDashboard />
              <UserToggle />
            </div>
          } />
          <Route path="/application/:sectionId" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <ApplicationSectionPage />
              <UserToggle />
            </div>
          } />
          <Route path="/interview" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <InterviewPrepPage />
              <UserToggle />
            </div>
          } />
          <Route path="/plan" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <ApplicationPlanPage />
              <UserToggle />
            </div>
          } />
          <Route path="/strategy" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <StrategyDashboard />
              <UserToggle />
            </div>
          } />
          <Route path="/strategy/part-a-welcome" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartAWelcome />
              <UserToggle />
            </div>
          } />
          <Route 
            path="/strategy/part-a" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
                <PromotionBar />
                <Navbar />
                <ChatQAFlow 
                  title="Initial Assessment"
                  questions={strategyData.partA.questions}
                  onComplete="/strategy/part-a-results"
                  backUrl="/strategy/part-a-welcome"
                />
                <UserToggle />
              </div>
            } 
          />
          <Route path="/strategy/part-a-results" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartAResults />
              <UserToggle />
            </div>
          } />
          <Route path="/strategy/part-b-intro" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartBIntro />
              <UserToggle />
            </div>
          } />
          <Route 
            path="/strategy/part-b" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
                <PromotionBar />
                <Navbar />
                <QAFlow 
                  title="Strengths & Weaknesses"
                  questions={strategyData.partB.questions}
                  onComplete="/strategy/part-b-results"
                  backUrl="/strategy/part-b-intro"
                />
                <UserToggle />
              </div>
            } 
          />
          <Route path="/strategy/part-b-results" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartBResults />
              <UserToggle />
            </div>
          } />
          <Route path="/strategy/part-c-intro" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartCIntro />
              <UserToggle />
            </div>
          } />
          <Route 
            path="/strategy/part-c" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
                <PromotionBar />
                <Navbar />
                <QAFlow 
                  title="Career Vision"
                  questions={strategyData.partC.questions}
                  onComplete="/strategy/part-c-results"
                  backUrl="/strategy/part-c-intro"
                />
                <UserToggle />
              </div>
            } 
          />
          <Route path="/strategy/part-c-results" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartCResults />
              <UserToggle />
            </div>
          } />
          <Route path="/strategy/part-d-intro" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartDIntro />
              <UserToggle />
            </div>
          } />
          <Route 
            path="/strategy/part-d" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
                <PromotionBar />
                <Navbar />
                <QAFlow 
                  title="Why MBA"
                  questions={strategyData.partD.questions}
                  onComplete="/strategy/part-d-results"
                  backUrl="/strategy/part-d-intro"
                />
                <UserToggle />
              </div>
            } 
          />
          <Route path="/strategy/part-d-results" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <PartDResults />
              <UserToggle />
            </div>
          } />
          <Route path="/coach-marketplace" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <CoachMarketplace />
              <UserToggle />
            </div>
          }>
            <Route path="browse" element={<MarketplaceDashboard />} />
            <Route path="messages" element={<MessageInbox />} />
            <Route path="checkout" element={<PaymentCheckout />} />
            <Route path="history" element={<CoachHistory />} />
          </Route>
          <Route path="/coach/dashboard" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <CoachDashboard />
              <UserToggle />
            </div>
          } />
          <Route path="/coach/conversation/:id" element={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
              <PromotionBar />
              <Navbar />
              <CoachConversation />
              <UserToggle />
            </div>
          } />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
