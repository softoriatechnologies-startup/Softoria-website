import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Inbox, 
  PhoneCall, 
  CheckCircle2, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  LogOut, 
  RefreshCw, 
  Clock, 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { authService } from '../../services/authService';
import { enquiryService } from '../../services/enquiryService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { COMPANY_CONFIG } from '../../config/companyConfig';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Auth check state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Data states
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    completed: 0
  });

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Modal states
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Verify authentication on mount before allowing data operations
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    const user = authService.getStoredUser();
    setCurrentUser(user);
    setIsAuthChecked(true);
  }, [navigate]);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [enquiriesRes, statsRes] = await Promise.allSettled([
        enquiryService.getAdminEnquiries({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          service: serviceFilter !== 'all' ? serviceFilter : undefined,
          search: searchTerm || undefined
        }),
        enquiryService.getAdminStats()
      ]);

      if (enquiriesRes.status === 'fulfilled') {
        setEnquiries(enquiriesRes.value.enquiries || []);
      } else {
        console.warn('Enquiries load fallback:', enquiriesRes.reason);
      }

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.stats || { total: 0, new: 0, contacted: 0, inProgress: 0, completed: 0 });
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Unable to retrieve dashboard data. Please verify that the local backend server is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, serviceFilter, searchTerm]);

  // Debounced data loader: triggers once auth is confirmed, and re-triggers when search/filters change
  useEffect(() => {
    if (!isAuthChecked) return;

    const delayDebounce = setTimeout(() => {
      loadDashboardData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [isAuthChecked, loadDashboardData]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await enquiryService.updateEnquiryStatus(id, newStatus);
      // Update locally
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      // Reload stats
      const statsRes = await enquiryService.getAdminStats();
      if (statsRes && statsRes.stats) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update enquiry status.');
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    setIsDeleting(true);

    try {
      await enquiryService.deleteEnquiry(enquiryToDelete._id);
      setEnquiries((prev) => prev.filter((item) => item._id !== enquiryToDelete._id));
      setEnquiryToDelete(null);
      if (selectedEnquiry && selectedEnquiry._id === enquiryToDelete._id) {
        setSelectedEnquiry(null);
      }
      // Reload stats
      const statsRes = await enquiryService.getAdminStats();
      if (statsRes && statsRes.stats) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
      alert('Failed to delete enquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge variant="gold" size="sm">New</Badge>;
      case 'contacted':
        return <Badge variant="info" size="sm">Contacted</Badge>;
      case 'in-progress':
        return <Badge variant="dark" size="sm">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      default:
        return <Badge variant="light" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50 text-softoria-black">
      {/* Admin Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="sm">Admin Portal</Badge>
                <span className="text-xs text-softoria-greyLight">
                  {currentUser ? `Signed in as ${currentUser.username || currentUser.email}` : 'Administrator'}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-softoria-black tracking-tight mt-1">
                Customer Enquiries Management
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={loadDashboardData}
                icon={RefreshCw}
                isLoading={isLoading}
              >
                Refresh Data
              </Button>
              <Button
                variant="dark"
                size="sm"
                onClick={handleLogout}
                icon={LogOut}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-softoria-greyLight uppercase tracking-wider">
                Total Enquiries
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-softoria-black mt-1">
                {stats.total || enquiries.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-softoria-black">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: New */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-softoria-gold/40 shadow-gold-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-softoria-gold uppercase tracking-wider">
                New Leads
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-softoria-black mt-1">
                {stats.new || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Contacted */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                In Communication
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-softoria-black mt-1">
                {stats.contacted || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <PhoneCall className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Closed / Won
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-softoria-black mt-1">
                {stats.completed || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by client name, email, phone, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-softoria-black focus:outline-none focus:border-softoria-gold focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-softoria-greyDark focus:outline-none focus:border-softoria-gold"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              {/* Service Filter */}
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-softoria-greyDark focus:outline-none focus:border-softoria-gold"
              >
                <option value="all">All Services</option>
                {COMPANY_CONFIG.services.map((svc) => (
                  <option key={svc.id} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Enquiries Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-16 text-center text-sm text-softoria-greyLight">
              Loading customer enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-softoria-black">No Enquiries Found</h4>
              <p className="text-xs text-softoria-greyLight max-w-sm mx-auto">
                No matching customer enquiries match the selected filter criteria, or the backend database is being initialized.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-softoria-greyLight">
                  <tr>
                    <th className="py-4 px-6">Client / Company</th>
                    <th className="py-4 px-6">Service Requested</th>
                    <th className="py-4 px-6">Contact Channels</th>
                    <th className="py-4 px-6">Source & Date</th>
                    <th className="py-4 px-6">Lifecycle Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Name & Company */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-softoria-black">
                          {enquiry.fullName}
                        </div>
                        {enquiry.companyName && (
                          <div className="text-xs text-softoria-greyLight flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            <span>{enquiry.companyName}</span>
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-6">
                        <span className="font-medium text-xs text-softoria-greyDark bg-gray-100 px-2.5 py-1 rounded-md">
                          {enquiry.service}
                        </span>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-4 px-6">
                        <div className="text-xs text-softoria-black font-mono">
                          {enquiry.email}
                        </div>
                        <div className="text-xs text-softoria-greyLight font-mono mt-0.5">
                          {enquiry.phone}
                        </div>
                      </td>

                      {/* Source & Date */}
                      <td className="py-4 px-6 text-xs text-softoria-greyLight">
                        <div className="capitalize font-semibold text-softoria-black">
                          {enquiry.source === 'popup' ? '⚡ 5s Popup' : '📝 Contact Page'}
                        </div>
                        <div className="mt-0.5">
                          {new Date(enquiry.createdAt).toLocaleDateString()} at{' '}
                          {new Date(enquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                          className="text-xs font-semibold rounded-lg px-2.5 py-1 border border-gray-200 focus:outline-none focus:border-softoria-gold bg-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-softoria-gold hover:bg-gray-100 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEnquiryToDelete(enquiry)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* View Full Enquiry Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title="Enquiry Specification"
          subtitle={`Received on ${new Date(selectedEnquiry.createdAt).toLocaleString()}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedEnquiry.status)}
                <span className="text-xs text-softoria-greyLight">
                  Source: {selectedEnquiry.source}
                </span>
              </div>
              <div className="text-xs font-mono text-gray-400">
                ID: {selectedEnquiry._id}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Client Name</span>
                <p className="font-semibold text-softoria-black mt-0.5">{selectedEnquiry.fullName}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Company</span>
                <p className="font-semibold text-softoria-black mt-0.5">{selectedEnquiry.companyName || 'Not specified'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Email</span>
                <p className="font-mono text-softoria-black mt-0.5">{selectedEnquiry.email}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Phone</span>
                <p className="font-mono text-softoria-black mt-0.5">{selectedEnquiry.phone}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Service Requested</span>
              <p className="font-semibold text-softoria-black mt-0.5">{selectedEnquiry.service}</p>
            </div>

            {selectedEnquiry.projectBudget && (
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Estimated Budget</span>
                <p className="font-semibold text-softoria-black mt-0.5">{selectedEnquiry.projectBudget}</p>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Project Scope / Message</span>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-softoria-greyDark text-xs leading-relaxed mt-1 whitespace-pre-wrap">
                {selectedEnquiry.projectDescription || 'No project description was provided.'}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Change Status:</span>
              <div className="flex gap-1.5">
                {['new', 'contacted', 'in-progress', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedEnquiry._id, st)}
                    className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-softoria-black text-softoria-gold'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {enquiryToDelete && (
        <Modal
          isOpen={Boolean(enquiryToDelete)}
          onClose={() => setEnquiryToDelete(null)}
          title="Confirm Deletion"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-sm text-softoria-greyDark leading-relaxed">
              Are you sure you want to permanently delete the enquiry from{' '}
              <span className="font-bold text-softoria-black">{enquiryToDelete.fullName}</span>?
              This action cannot be undone.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setEnquiryToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={isDeleting}
                onClick={handleDeleteEnquiry}
              >
                Delete Enquiry
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

