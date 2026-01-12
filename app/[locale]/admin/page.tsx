import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

// TODO: Add authentication check
// For now, this is a placeholder that will redirect if not authenticated

export default function AdminPage() {
  // In production, check authentication here
  // if (!isAuthenticated) redirect('/login');
  
  return <AdminDashboard />;
}
