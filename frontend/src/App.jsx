import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import TaskSubmissionPage from './pages/TaskPage';
import VerdictPage from './pages/VerdictPage';
import ProfilePage from './pages/ProfilePage';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import TestcaseGen from './pages/TestcaseGen';
import SubmissionsPage from './pages/Submissions';
import PastVerdictPage from './pages/PastVerdict';
import ForgotPassword from './pages/ForgotPassword1';
import SetNewPassword from './pages/SetNewPassword';
import AdminPanel from './pages/AdminPanel';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';


function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/task/:taskId" element={<TaskSubmissionPage/>}/>
        <Route path="/verdict" element={<VerdictPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/createTask" element={<CreateTask/>}/>
        <Route path="/editTask/:taskId" element={<UpdateTask/>}/>
        <Route path="/testcases/:taskId" element={<TestcaseGen/>}/>
        <Route path="/mysubmissions" element={<SubmissionsPage/>} />
        <Route path="/pastSubmissions/:submissionId" element={<PastVerdictPage/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:userId/:token" element={<SetNewPassword/>}/>
        <Route path="/admin" element={<AdminPanel/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
