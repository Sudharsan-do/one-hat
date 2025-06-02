"use client";

import React, { useState } from 'react';

// Type definitions
interface ScriptScene {
  text: string;
  duration: number;
}

interface ScriptContent {
  title: string;
  description: string;
  scenes: ScriptScene[];
}

interface VideoData {
  url: string;
  uploadedAt: string;
}

type ScriptStatus = 'pending' | 'success' | 'rejected';

interface AdminScript {
  id: string;
  title: string;
  status: ScriptStatus;
  userId: string;
  userEmail: string;
  createdAt: string;
  scriptContent: ScriptContent;
  video?: VideoData;
  rejectionReason?: string;
  rejectedAt?: string;
}

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
}

interface StatusBadgeProps {
  status: ScriptStatus;
}

interface ScriptModalProps {
  script: AdminScript | null;
  isOpen: boolean;
  onClose: () => void;
  onUpload: (scriptId: string, videoFile: File) => void;
  onReject: (scriptId: string, reason: string) => void;
}

// Sample data
const adminScripts: AdminScript[] = [
  {
    id: 'SCR001',
    title: 'Introduction to React Hooks',
    status: 'pending',
    userId: 'USR12345',
    userEmail: 'john.doe@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    scriptContent: {
      title: 'Introduction to React Hooks',
      description: 'A comprehensive guide to React Hooks',
      scenes: [
        { text: 'Welcome to React Hooks tutorial', duration: 3 },
        { text: 'Let\'s start with useState', duration: 5 }
      ]
    }
  },
  {
    id: 'SCR002',
    title: 'Building Responsive Layouts',
    status: 'success',
    userId: 'USR67890',
    userEmail: 'jane.smith@example.com',
    createdAt: '2024-01-14T14:20:00Z',
    video: {
      url: 'https://example.com/video2.mp4',
      uploadedAt: '2024-01-14T16:45:00Z'
    },
    scriptContent: {
      title: 'Building Responsive Layouts',
      description: 'Learn CSS Grid and Flexbox',
      scenes: [
        { text: 'CSS Grid vs Flexbox comparison', duration: 4 },
        { text: 'Building responsive components', duration: 6 }
      ]
    }
  },
  {
    id: 'SCR003',
    title: 'JavaScript ES6 Features',
    status: 'pending',
    userId: 'USR11111',
    userEmail: 'alex.wilson@example.com',
    createdAt: '2024-01-16T09:15:00Z',
    scriptContent: {
      title: 'JavaScript ES6 Features',
      description: 'Modern JavaScript features overview',
      scenes: [
        { text: 'Arrow functions and template literals', duration: 4 },
        { text: 'Destructuring and spread operator', duration: 5 }
      ]
    }
  },
  {
    id: 'SCR004',
    title: 'Node.js Best Practices',
    status: 'rejected',
    userId: 'USR22222',
    userEmail: 'bob.johnson@example.com',
    createdAt: '2024-01-13T11:30:00Z',
    rejectionReason: 'Content does not meet quality standards',
    rejectedAt: '2024-01-13T15:20:00Z',
    scriptContent: {
      title: 'Node.js Best Practices',
      description: 'Server-side JavaScript best practices',
      scenes: [
        { text: 'Setting up Express server', duration: 3 },
        { text: 'Database connection patterns', duration: 7 }
      ]
    }
  },
  {
    id: 'SCR005',
    title: 'Database Design Fundamentals',
    status: 'pending',
    userId: 'USR33333',
    userEmail: 'carol.davis@example.com',
    createdAt: '2024-01-12T16:45:00Z',
    scriptContent: {
      title: 'Database Design Fundamentals',
      description: 'Relational database design principles',
      scenes: [
        { text: 'Entity relationship modeling', duration: 5 },
        { text: 'Normalization techniques', duration: 6 }
      ]
    }
  }
];

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<ScriptStatus, StatusConfig> = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Completed'
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Rejected'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pending Review'
    }
  };

  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const ScriptModal: React.FC<ScriptModalProps> = ({ script, isOpen, onClose, onUpload, onReject }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  if (!isOpen || !script) return null;

  const handleVideoUpload = async (): Promise<void> => {
    if (!videoFile) return;
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onUpload(script.id, videoFile);
      setIsUploading(false);
      setVideoFile(null);
      onClose();
    }, 2000);
  };

  const handleReject = (): void => {
    if (!rejectionReason.trim()) return;
    onReject(script.id, rejectionReason);
    setRejectionReason('');
    onClose();
  };

  const downloadScript = (): void => {
    const dataStr = JSON.stringify(script.scriptContent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `script-${script.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0] ?? null);
    }
  };

  const handleRejectionReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setRejectionReason(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Script Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Script ID</label>
              <p className="mt-1 text-sm text-gray-900">{script.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1">
                <StatusBadge status={script.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <p className="mt-1 text-sm text-gray-900">{script.userId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User Email</label>
              <p className="mt-1 text-sm text-gray-900">{script.userEmail}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <p className="mt-1 text-sm text-gray-900">{script.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(script.createdAt).toLocaleString()}
            </p>
          </div>

          {script.status === 'rejected' && script.rejectionReason && script.rejectedAt && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <label className="block text-sm font-medium text-red-800">Rejection Reason</label>
              <p className="mt-1 text-sm text-red-700">{script.rejectionReason}</p>
              <p className="mt-1 text-xs text-red-600">
                Rejected on: {new Date(script.rejectedAt).toLocaleString()}
              </p>
            </div>
          )}

          <div className="border-t pt-4">
            <button
              onClick={downloadScript}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Script JSON
            </button>
          </div>

          {script.status === 'pending' && (
            <div className="border-t pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Video File
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  onClick={handleVideoUpload}
                  disabled={!videoFile || isUploading}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Video
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Reject Script
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={handleRejectionReasonChange}
                  placeholder="Enter rejection reason..."
                  rows={3}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <button
                  onClick={handleReject}
                  disabled={!rejectionReason.trim()}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject Script
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const AdminScriptsPage: React.FC = () => {
  const [scripts, setScripts] = useState<AdminScript[]>(adminScripts);
  const [selectedScript, setSelectedScript] = useState<AdminScript | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<'all' | ScriptStatus>('all');

  const pendingCount = scripts.filter(s => s.status === 'pending').length;
  const completedCount = scripts.filter(s => s.status === 'success').length;
  const rejectedCount = scripts.filter(s => s.status === 'rejected').length;

  const filteredScripts = filterStatus === 'all' 
    ? scripts 
    : scripts.filter(s => s.status === filterStatus);

  const handleViewScript = (script: AdminScript): void => {
    setSelectedScript(script);
    setIsModalOpen(true);
  };

  const handleUploadVideo = (scriptId: string, videoFile: File): void => {
    setScripts(prev => prev.map(script => 
      script.id === scriptId 
        ? {
            ...script,
            status: 'success' as const,
            video: {
              url: URL.createObjectURL(videoFile),
              uploadedAt: new Date().toISOString()
            }
          }
        : script
    ));
  };

  const handleRejectScript = (scriptId: string, reason: string): void => {
    setScripts(prev => prev.map(script => 
      script.id === scriptId 
        ? {
            ...script,
            status: 'rejected' as const,
            rejectionReason: reason,
            rejectedAt: new Date().toISOString()
          }
        : script
    ));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterStatus(event.target.value as 'all' | ScriptStatus);
  };

  if (filteredScripts.length === 0 && filterStatus === 'all' && scripts.length === 0) {
    return (
      <div className="flex-1 bg-white p-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Dashboard</h3>
            <p className="text-gray-500">No scripts submitted yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin - Script Management</h1>
          <p className="text-gray-600">Review and manage user-submitted video scripts</p>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
                      <dd className="text-lg font-medium text-gray-900">{pendingCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                      <dd className="text-lg font-medium text-gray-900">{completedCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                      <dd className="text-lg font-medium text-gray-900">{rejectedCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Scripts</option>
              <option value="pending">Pending Review</option>
              <option value="success">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredScripts.map((script) => (
              <li key={script.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <StatusBadge status={script.status} />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {script.title}
                          </p>
                          <p className="ml-2 text-sm text-gray-500">#{script.id}</p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-900">
                            User: {script.userEmail} ({script.userId})
                          </p>
                          <p className="text-sm text-gray-500">
                            Submitted: {new Date(script.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewScript(script)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        type="button"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ScriptModal
          script={selectedScript}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUploadVideo}
          onReject={handleRejectScript}
        />
      </div>
    </div>
  );
};


export default AdminScriptsPage;