import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const statusColour = {
  'New': 'bg-gray-200 text-gray-800',
  'Assigned': 'bg-blue-200 text-blue-800',
  'In Progress': 'bg-yellow-200 text-yellow-800',
  'Resolved': 'bg-green-200 text-green-800',
  'Closed': 'bg-gray-300 text-gray-600',
  'Reopened': 'bg-orange-200 text-orange-800',
};

const formatDate = (d) =>
  new Date(d).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const BugDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bug, setBug] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axiosInstance.get(`/api/bugs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBug(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load bug.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBug();
  }, [id, user]);

  if (loading) return <div className="text-center mt-20">Loading…</div>;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => navigate('/bugs')} className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to bug list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate('/bugs')} className="text-sm text-blue-600 mb-4">
        ← Back to list
      </button>

      <div className="bg-white p-6 shadow-md rounded">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{bug.title}</h1>
          <span className={`px-3 py-1 rounded text-sm font-medium ${statusColour[bug.status]}`}>
            {bug.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-6 text-gray-700">
          <p><span className="font-medium">Severity:</span> {bug.severity}</p>
          <p><span className="font-medium">Priority:</span> {bug.priority || 'Not set'}</p>
          <p><span className="font-medium">Reported by:</span> {bug.reporter?.name || 'Unknown'}</p>
          <p><span className="font-medium">Assigned to:</span> {bug.assignee?.name || 'Unassigned'}</p>
          <p><span className="font-medium">Reported:</span> {formatDate(bug.createdAt)}</p>
          <p><span className="font-medium">Last updated:</span> {formatDate(bug.updatedAt)}</p>
        </div>

        <h2 className="font-semibold mb-1">Description</h2>
        <p className="mb-4 text-gray-700 whitespace-pre-line">{bug.description}</p>

        <h2 className="font-semibold mb-1">Steps to Reproduce</h2>
        <p className="mb-4 text-gray-700 whitespace-pre-line">{bug.stepsToReproduce}</p>

        {bug.resolutionNote && (
          <>
            <h2 className="font-semibold mb-1">Resolution Note</h2>
            <p className="mb-4 text-gray-700 whitespace-pre-line">{bug.resolutionNote}</p>
          </>
        )}

        {bug.reopenReason && (
          <>
            <h2 className="font-semibold mb-1">Reopen Reason</h2>
            <p className="mb-4 text-gray-700 whitespace-pre-line">{bug.reopenReason}</p>
          </>
        )}
        
      </div>
    </div>
  );
};

export default BugDetail;