import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./Pages/AboutUs";
import HomePage from "./Pages/HomePage";
import SignUpForm from "./Pages/SignUpForm";
import LoginPage from "./Pages/LoginPage";
import CoursePage from "./Pages/Courses/CoursesPage";
import Contactpage from "./Pages/ContactPage";
import DeniedPage from "./Pages/DeniedPage";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Courses/CreateCourse";
import ProfilePage from "./Pages/Users/ProfilePage";
import EditProfile from "./Pages/Users/EditProfile";

function App() {
  // routing here
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/denied" element={<DeniedPage />} />
      <Route path="/contact" element={<Contactpage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/edit" element={<EditProfile />} />

      </Route>
    </Routes>
  );
}

export default App;
