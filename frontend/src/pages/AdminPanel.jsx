import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminPanel() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await axiosInstance.post("/users/isloggedin");
                if (!response.data.data.isAdmin) {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error during authentication check", error);
                navigate('/');
            }
        };
        checkAdminStatus();
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    const handleAdminChange = async (user) => {
        try {
            const response = await axiosInstance.put(`/users/toggle-admin/${user._id}`);
            setUsers(users.map(u => u._id === user._id ? { ...u, isAdmin: !u.isAdmin } : u));
        } catch (error) {
            console.error('Error toggling admin status', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left font-semibold text-gray-600">Handle</th>
                                <th className="py-2 px-4 text-left font-semibold text-gray-600">Email</th>
                                <th className="py-2 px-4 text-center font-semibold text-gray-600">Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-t">
                                    <td className="py-2 px-4">{user.handle}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={user.isAdmin} 
                                            onChange={() => handleAdminChange(user)} 
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminPanel;
