import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { Plus, Edit2, Trash2, Mail, LayoutDashboard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', image: '', githubLink: '', liveLink: '', featured: false
  });

  // Messages State
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || (!user.isAdmin)) {
      navigate('/login');
    } else {
      fetchProjects();
      fetchMessages();
    }
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('/contact');
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(item => item.trim())
    };

    try {
      if (isEditing) {
        await axios.put(`/projects/${editId}`, projectData);
      } else {
        await axios.post('/projects', projectData);
      }
      setFormData({ title: '', description: '', techStack: '', image: '', githubLink: '', liveLink: '', featured: false });
      setIsEditing(false);
      setEditId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      techStack: project.techStack.join(', ')
    });
    setIsEditing(true);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete message?')) {
      try {
        await axios.delete(`/contact/${id}`);
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || (!user.isAdmin)) return null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md border-r border-gray-200 dark:border-gray-700 hidden md:block z-10 sticky top-16 h-[calc(100vh-4rem)]">
        <div className="h-full flex flex-col p-4">
          <div className="space-y-2 flex-grow">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'projects' ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Manage Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'messages' ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <Mail size={20} />
              <span>Messages</span>
              {messages.length > 0 && (
                <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs py-0.5 px-2 rounded-full font-bold">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 ml-0 md:ml-0">
        <div className="md:hidden flex space-x-2 mb-6 overflow-x-auto pb-2">
           <button
             onClick={() => setActiveTab('projects')}
             className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
           >
             Manage Projects
           </button>
           <button
             onClick={() => setActiveTab('messages')}
             className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium ${activeTab === 'messages' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
           >
             Messages
           </button>
        </div>

        {activeTab === 'projects' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Manage Projects</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                {isEditing ? 'Edit Project' : 'Add New Project'}
                {isEditing && (
                  <button onClick={() => { setIsEditing(false); setFormData({title: '', description: '', techStack: '', image: '', githubLink: '', liveLink: '', featured: false}); setEditId(null); }} className="ml-auto text-sm text-blue-600">Cancel Edit</button>
                )}
              </h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="auth-form-input p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                  <input type="text" name="image" value={formData.image} onChange={handleChange} className="auth-form-input p-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="auth-form-input p-3 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack (comma separated)</label>
                  <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} required placeholder="React, Node.js, MongoDB" className="auth-form-input p-3" />
                </div>
                <div className="flex gap-4">
                   <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                      <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} className="auth-form-input p-3" />
                   </div>
                   <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live URL</label>
                      <input type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} className="auth-form-input p-3" />
                   </div>
                </div>
                <div className="md:col-span-2 flex items-center justify-between mt-4">
                  <label className="flex items-center text-gray-700 dark:text-gray-300">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="mr-2 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-gray-100 border-gray-300" />
                    Featured Project
                  </label>
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    {isEditing ? 'Update Project' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tech Stack</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.map(project => (
                      <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{project.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.techStack.slice(0, 3).join(', ')}{project.techStack.length > 3 ? '...' : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.featured ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEdit(project)} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4">Edit</button>
                          <button onClick={() => handleDelete(project._id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Messages</h1>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-blue-600 dark:text-blue-400 text-sm">{msg.email}</a>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">{msg.message}</p>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => handleDeleteMessage(msg._id)} className="text-red-500 hover:text-red-700 transition text-sm flex items-center gap-1">
                        <Trash2 size={16} /> Delete Message
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
