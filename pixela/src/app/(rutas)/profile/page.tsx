import ProfilePage from '@/features/profile/pages/ProfilePage';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

export default function Profile() {
  return (
    <ProtectedRoute requireAuth={true}>
      <ProfilePage />
    </ProtectedRoute>
  );
} 