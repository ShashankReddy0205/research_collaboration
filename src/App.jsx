import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import {
  LandingPage,
  AboutPage,
  ContactPage,
  RoleSelectionPage,
  LoginPage,
  RegistrationPage,
  ProfilePage,
  NotificationsPage,
  NotFoundPage
} from './pages';

// Admin Dashboards
import {
  AdminDashboard,
  ManageProjects,
  ManageUsers,
  ManageDocuments,
  ProjectProgress
} from './pages/Admin';

// Researcher Dashboards
import {
  ResearcherDashboard,
  MyProjects,
  DocumentUpload,
  Milestones,
  Discussions
} from './pages/Researcher';

function App() {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Routes */}
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<ManageProjects />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/documents" element={<ManageDocuments />} />
          <Route path="/admin/progress" element={<ProjectProgress />} />

          {/* Common Authenticated Routes for Admin */}
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Researcher Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={['researcher']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/researcher" element={<Navigate to="/researcher/dashboard" replace />} />
          <Route path="/researcher/dashboard" element={<ResearcherDashboard />} />
          <Route path="/researcher/projects" element={<MyProjects />} />
          <Route path="/researcher/documents" element={<DocumentUpload />} />
          <Route path="/researcher/milestones" element={<Milestones />} />
          <Route path="/researcher/discussions" element={<Discussions />} />

          {/* Common Authenticated Routes for Researcher */}
          <Route path="/researcher/profile" element={<ProfilePage />} />
          <Route path="/researcher/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Catch-all 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
