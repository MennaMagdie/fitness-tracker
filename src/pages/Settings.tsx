import React from 'react';
import { Navbar } from '../components/Home/Navbar';
import { Footer } from '../components/Home/Footer';

const Settings = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account preferences</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Profile Information</h3>
              <p className="text-gray-600">Update your personal details</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-gray-600">Manage your notification preferences</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Privacy</h3>
              <p className="text-gray-600">Control your privacy settings</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings; 