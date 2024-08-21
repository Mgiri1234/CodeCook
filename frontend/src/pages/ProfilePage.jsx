import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from "../Axios";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './styles.css';

function ProfilePage() {
    const navigate = useNavigate();

    const [heatmapData, setHeatmapData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const [data, setData] = useState({
        handle: "",
        fullName: "",
        email: "",
        dob: "",
        problemsSolved: 0,
        problemsAttempted: 0,
        userType: "",
        photo: ""
    });

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const response = await axiosInstance.post("/users/isloggedin");
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        };
        isLoggedIn();
    }, [navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/users/getProfile");
                const userData = response.data.data;
                if (userData) {
                    setData({
                        handle: userData.handle,
                        fullName: userData.fullName,
                        email: userData.email,
                        dob: userData.dob,
                        problemsSolved: userData.problemsSolved,
                        problemsAttempted: userData.problemsAttempted,
                        userType: userData.isAdmin ? "Admin" : "User",
                        photo: userData.photo
                    });
                    
                    setIsAdmin(userData.isAdmin);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchHeatmapData = async () => {
            const res = await axiosInstance.get("/submissions/heatmap");
            setHeatmapData(res.data.data);
        };
        fetchHeatmapData();
    }, []);

    const [image, setImage] = useState("");

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleUpdateImage = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axiosInstance.put('users/update-image', formData);
            console.log('Image data updated successfully:', response.data);

            // Update the photo in the data state
            setData(prevData => ({
                ...prevData,
                photo: URL.createObjectURL(image)
            }));
        } catch (error) {
            console.error('Error updating image data:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-start p-4 md:p-10 bg-gray-100">
                <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/4">
                    <img src={data.photo ? data.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                        alt="Avatar" className="w-full h-auto rounded-full shadow-lg" />
                    <input type="file" onChange={handleImageUpload} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <button onClick={handleUpdateImage} className="mt-2 w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update</button>
                </div>
                <div className="w-full md:w-3/4">
                    <div className="text-2xl md:text-5xl font-bold mb-4">
                        {data.handle}
                    </div>
                    <div className="text-lg md:text-xl mb-2">
                        Name: {data.fullName}
                    </div>
                    <div className="text-lg md:text-xl mb-2">
                        Email: {data.email}
                    </div>

                    <div className="text-lg md:text-xl mb-2">
                        Date of Birth: {new Date(data.dob).toLocaleString('en-IN', { timeZone: 'IST', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>

                    <div className="text-lg md:text-xl mb-2">
                        Problems Solved: {data.problemsSolved}
                    </div>
                    <div className="text-lg md:text-xl mb-2">
                        Problems Attempted: {data.problemsAttempted}
                    </div>
                    <div className="text-lg md:text-xl mb-2">
                        User Type: {data.userType}
                    </div>
                    {(isAdmin==true) && (
                    <div className="flex items-center">
                        <Link className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
                            to={`/admin`}
                        >
                            AdminPanel
                        </Link>
                    </div>
                    )
                    }
                    <div className="mt-4">
                        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-300">
                            <CalendarHeatmap
                                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                                endDate={new Date()}
                                values={heatmapData}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                            />
                            {console.log(heatmapData)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;
