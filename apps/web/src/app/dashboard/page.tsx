'use client';

import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { UserRole } from '@BRIXA/api';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const getDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case UserRole.ADMIN:
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Admin Dashboard
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Manage users, view system analytics, and configure platform settings.</p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Manage Users
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      
      case UserRole.CONTRACTOR:
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Contractor Dashboard
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Manage your projects, bids, and contractor profile.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case UserRole.CLIENT:
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Client Dashboard
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Manage your construction projects and connect with contractors.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome to Brixa
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Your role-based dashboard will be available here.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Brixa</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                {user?.role === UserRole.ADMIN && (
                  <Link
                    href="/admin"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName} {user?.lastName}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="mt-2 text-gray-600">
                Role: <span className="font-medium">{user?.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </p>
            </div>
            
            {getDashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
}