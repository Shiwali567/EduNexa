import { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./components/AdminPanel";
import AppHeader from "./components/AppHeader";
import CourseSidebar from "./components/CourseSidebar";
import CourseViewer from "./components/CourseViewer";
import DiscoverSection from "./components/DiscoverSection";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
const API = import.meta.env.VITE_API_URL;
import "./App.css";

const SEED_COURSES = [
  {
    id: 1,
    title: "Frontend Foundations",
    instructor: "Angela Y.",
    description: "Learn HTML, CSS, and JavaScript from scratch.",
    videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
  },
  {
    id: 2,
    title: "React for Beginners",
    instructor: "Max S.",
    description: "Build modern user interfaces with React.",
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
  },
  {
    id: 3,
    title: "Node.js and Express",
    instructor: "Mosh H.",
    description: "Create backend APIs with Node.js and Express.",
    videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  },
  {
    id: 4,
    title: "Python Programming",
    instructor: "Jose P.",
    description: "Master Python fundamentals with practical projects.",
    videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
  },
  {
    id: 5,
    title: "Data Structures and Algorithms",
    instructor: "Neet C.",
    description: "Improve coding interview and problem-solving skills.",
    videoUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
  },
  {
    id: 6,
    title: "SQL and Databases",
    instructor: "Colt S.",
    description: "Understand relational databases and SQL queries.",
    videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
  },
  {
    id: 7,
    title: "UI/UX Design Essentials",
    instructor: "Sarah D.",
    description: "Design user-friendly and beautiful digital products.",
    videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
  },
  {
    id: 8,
    title: "AWS Cloud Fundamentals",
    instructor: "Stephane M.",
    description: "Get started with core AWS cloud services.",
    videoUrl: "https://www.youtube.com/watch?v=3hLmDS179YE",
  },
  {
    id: 9,
    title: "Machine Learning Intro",
    instructor: "Andrew N.",
    description: "Understand core machine learning concepts and models.",
    videoUrl: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
  },
  {
    id: 10,
    title: "Git and GitHub Mastery",
    instructor: "The Odin Team",
    description: "Track code changes and collaborate effectively.",
    videoUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
  },
];

const STORAGE_KEY = "edunexa-lite-courses";
const REMOVED_TITLES = new Set(["Project Management", "Finance Analytics"]);

const normalizeCourses = (list) => {
  const cleaned = list.filter((course) => !REMOVED_TITLES.has(course.title));

  return cleaned.map((course, index) => ({
    ...course,
    title:
      course.id === 1 && course.title === "Web Development Basics"
        ? "Frontend Foundations"
        : course.title,
    videoUrl:
      course.id === 1 &&
      course.videoUrl === "https://www.youtube.com/watch?v=G3e-cpL7ofc"
        ? "https://www.youtube.com/watch?v=pQN-pnXPaVg"
        : course.videoUrl || SEED_COURSES[index % SEED_COURSES.length].videoUrl,
  }));
};

const getInitialCourses = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return SEED_COURSES;

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0
      ? normalizeCourses(parsed)
      : SEED_COURSES;
  } catch {
    return SEED_COURSES;
  }
};

function App() {
  const [courses, setCourses] = useState(getInitialCourses);
  const [authUser, setAuthUser] = useState(null);
  const [toast, setToast] = useState({ text: "New UI coming soon", id: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminManagePage, setIsAdminManagePage] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(
    () => getInitialCourses()[0]?.id ?? null,
  );
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [loginError, setLoginError] = useState("");
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [registerError, setRegisterError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    instructor: "",
    description: "",
    videoUrl: "",
  });

  const isAdmin = authUser?.role === "admin";
  const isStudent = authUser?.role === "student";

  const nextCourseId = useMemo(() => {
    return courses.length > 0
      ? Math.max(...courses.map((course) => course.id)) + 1
      : 1;
  }, [courses]);
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? courses[0];
  const filteredCourses = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return courses;

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term),
    );
  }, [courses, searchQuery]);

  const persistCourses = (updatedCourses) => {
    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setLoginError("");

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data));

      setAuthUser({
        name: data.name,
        email: data.email,
        role: data.role,
        displayName: data.name,
      });

      showToast(`Welcome ${data.name}`);
    } catch (error) {
      console.log(error);
      setLoginError("Server connection failed");
    }
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    setRegisterError("");

    if (
      !registerForm.name.trim() ||
      !registerForm.email.trim() ||
      !registerForm.password.trim()
    ) {
      setRegisterError("Please fill all required fields");
      return;
    }

    console.log(import.meta.env.VITE_API_URL);

    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          role: registerForm.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.message || "Registration failed");
        return;
      }

      // clear form
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        role: "student",
      });

      // switch to login page
      setShowRegister(false);

      // autofill login email
      setLoginForm({
        email: data.email,
        password: "",
        role: data.role,
      });

      showToast("Registration successful. Please login.");
      // } catch (error) {
      //   console.log(error);
      //   setRegisterError("Server connection failed");
    } catch (error) {
      console.log("FULL REGISTER ERROR =>", error);
      alert(error.message);
      setRegisterError(error.message);
    }
  };
  const handleAddCourse = (event) => {
    event.preventDefault();
    const title = courseForm.title.trim();
    const instructor = courseForm.instructor.trim();
    const description = courseForm.description.trim();
    const videoUrl = courseForm.videoUrl.trim();

    if (!title || !instructor || !description || !videoUrl) return;

    const newCourse = {
      id: nextCourseId,
      title,
      instructor,
      description,
      videoUrl,
    };

    const updatedCourses = [newCourse, ...courses];
    persistCourses(updatedCourses);
    setSelectedCourseId(newCourse.id);
    setCourseForm({ title: "", instructor: "", description: "", videoUrl: "" });
  };

  const handleResetCourses = () => {
    persistCourses(SEED_COURSES);
    setSelectedCourseId(SEED_COURSES[0].id);
  };

  const handleLogout = () => {
    setAuthUser(null);
    setSearchQuery("");
    setIsAdminManagePage(false);

    setLoginError("");
  };

  const handleRemoveCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    persistCourses(updatedCourses);

    if (selectedCourseId === courseId) {
      setSelectedCourseId(updatedCourses[0]?.id ?? null);
    }
    setLoginForm({ email: "", password: "", role: "student" });
  };

  const scrollToDashboard = () => {
    const section = document.getElementById("student-dashboard");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRoleSelect = (roleItem) => {
    const existing = courses.find((course) => course.title === roleItem.name);

    if (existing) {
      setSelectedCourseId(existing.id);
      scrollToDashboard();
      return;
    }

    const newCourse = {
      id: nextCourseId,
      title: roleItem.name,
      instructor: roleItem.instructor,
      description: roleItem.description,
      videoUrl: roleItem.videoUrl,
    };

    const updatedCourses = [newCourse, ...courses];
    persistCourses(updatedCourses);
    setSelectedCourseId(newCourse.id);
    showToast("Opened in student dashboard");
    scrollToDashboard();
  };

  const showToast = (message) => {
    setToast({ text: message, id: Date.now() });
  };

  useEffect(() => {
    if (!toast.text) return undefined;

    const timer = setTimeout(
      () => setToast((current) => ({ ...current, text: "" })),
      3500,
    );
    return () => clearTimeout(timer);
  }, [toast.id, toast.text]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <main className={`app-shell ${!authUser ? "auth-mode" : ""}`}>
          {toast.text && (
            <div className="toast-banner" role="status" aria-live="polite">
              <span>{toast.text}</span>
              <button
                type="button"
                onClick={() =>
                  setToast((current) => ({ ...current, text: "" }))
                }
              >
                x
              </button>
            </div>
          )}
          {authUser && (
            <AppHeader
              authUser={authUser}
              onLogout={handleLogout}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isAdminManagePage={isAdminManagePage}
              onToggleAdminPage={() =>
                setIsAdminManagePage((current) => !current)
              }
            />
          )}

          {!authUser ? (
            <section className="auth-layout">
              {!showRegister ? (
                <>
                  <LoginForm
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    onSubmit={handleLoginSubmit}
                    loginError={loginError}
                    setLoginError={setLoginError}
                  />

                  <p className="register-switch">
                    Don’t have an account?{" "}
                    <button type="button" onClick={() => setShowRegister(true)}>
                      Register Here
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <RegisterForm
                    registerForm={registerForm}
                    setRegisterForm={setRegisterForm}
                    registerError={registerError}
                    onSubmit={handleRegisterSubmit}
                  />

                  <p className="register-switch">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setShowRegister(false)}
                    >
                      Login Here
                    </button>
                  </p>
                </>
              )}
            </section>
          ) : (
            <>
              {isAdminManagePage && isAdmin ? (
                <section className="admin-manage-page card">
                  <h2>Admin Video Management</h2>
                  <p className="helper-text">
                    Add new videos/courses and remove videos from dashboard.
                  </p>
                  <AdminPanel
                    courseForm={courseForm}
                    setCourseForm={setCourseForm}
                    onAddCourse={handleAddCourse}
                    onResetCourses={handleResetCourses}
                    courses={courses}
                    onRemoveCourse={handleRemoveCourse}
                  />
                </section>
              ) : (
                <>
                  <section id="student-dashboard" className="dashboard-shell">
                    <CourseViewer
                      selectedCourse={selectedCourse}
                      role={authUser.role}
                    />
                    <CourseSidebar
                      courses={filteredCourses}
                      selectedCourseId={selectedCourse?.id}
                      onCourseSelect={setSelectedCourseId}
                      role={isStudent ? "Student" : "Admin"}
                    />
                  </section>
                  <DiscoverSection
                    onRoleSelect={handleRoleSelect}
                    searchQuery={searchQuery}
                  />
                </>
              )}
            </>
          )}
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
