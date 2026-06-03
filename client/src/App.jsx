import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import AddJob from "./pages/AddJob";
import 'quill/dist/quill.snow.css';
import { ToastContainer } from "react-toastify";
import { SignIn, SignUp } from '@clerk/clerk-react';

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
   <Route path="/login/*" element={
  <div className="flex justify-center items-center min-h-screen">
    <SignIn routing="path" path="/login" fallbackRedirectUrl="/" />
  </div>
} />
<Route path="/signup/*" element={
  <div className="flex justify-center items-center min-h-screen">
    <SignUp routing="path" path="/signup" />
  </div>
} />
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  );
};

export default App;