import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Header from "../Components/Header/Header";
import { Divider } from "@mantine/core";
import FindJobs from "./FindJobs";
import FindTalentPage from "./FindTalentPage";
import JobDescPage from "./JobDescPage";
import CompanyPage from "./CompanyPage";
import JobHistoryPage from "./JobHistoryPage";
import TalentProfilePage from "./TalentProfilePage";
import ApplyJobPage from "./ApplyJobPage";
import PostedJobsPage from "./PostedJobsPage";
import SignupPage from "./SignupPage";
import PostJobPage from "./PostJobPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import ProtectedRoute from "../Components/services/ProtectedRoute";
import PublicRoute from "../Components/services/PublicRoute";

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/jobs/:id" element={<JobDescPage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route
            path="/job-history"
            element={
              <ProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage />
              </ProtectedRoute>
            }
          />  
          <Route
            path="/posted-jobs/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/post-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          {/* //<Route path="/post-job/:id" element={<PostJobPage />} /> */}

          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
