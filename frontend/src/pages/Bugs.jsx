import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import BugList from '../components/BugList';

const Bugs = () => {
  const { user } = useAuth();
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axiosInstance.get('/api/bugs', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBugs(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load bugs.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBugs();
  }, [user]);

  if (loading) return <div className="text-center mt-20">Loading…</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bugs</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <BugList bugs={bugs} />
    </div>
  );
};

export default Bugs;