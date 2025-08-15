import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-blue-600">1,234</p>
        </div>

        {/* Card 2: New Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">New Orders</h3>
          <p className="text-4xl font-bold text-green-600">56</p>
        </div>

        {/* Card 3: Products in Stock */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Products in Stock</h3>
          <p className="text-4xl font-bold text-yellow-600">789</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            <li className="mb-2 pb-2 border-b border-gray-200">User John Doe registered.</li>
            <li className="mb-2 pb-2 border-b border-gray-200">Order #1234 placed by Jane Smith.</li>
            <li className="mb-2 pb-2 border-b border-gray-200">Product &quot;Laptop Pro&quot; updated.</li>
            <li>Admin Alice approved a new product.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
