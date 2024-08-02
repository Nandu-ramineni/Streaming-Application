import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { API_URL, updateProfile } from "../../Services/api";
import { HiPencilSquare } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { FcAddImage } from "react-icons/fc";
const ProfileDetails = ({ profile, fetchProfile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const profileImageUrl = profile.image ? `${API_URL}/uploads/${profile.image}` : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await updateProfile(userId, formData);
            if (response.status === 200) {
                fetchProfile();
                setIsModalOpen(false);
            } else {
                alert('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        fetchProfile();
    };

    return (
        <div>
            <section className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-100">Profiles</h2>
                <button onClick={handleEditClick} className="text-xl flex items-center gap-2 text-white">
                    <HiPencilSquare /> Edit
                </button>
            </section>
            <section className="flex items-center gap-8">
                <div className="flex flex-col justify-start gap-4 mt-6">
                    <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-full"
                    />
                    <h2 className="text-xl font-semibold text-gray-100 ">{profile.username}</h2>
                </div>
                <div>
                    <button><CiCirclePlus className="text-3xl text-white w-20 h-20 rounded-full" /></button>
                </div>
            </section>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-gray-900 p-6 rounded-lg text-white">
                        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                {/* <label htmlFor="image" className="block text-gray-400">Profile Photo</label> */}
                                <div {...getRootProps()} className="mt-2 border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer">
                                    <p className="flex justify-center"><FcAddImage className="text-3xl w-24 h-24" /></p>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the image here...</p>
                                    ) : (
                                        <p>Drag {'n'} drop an image here, or click to select one</p>
                                    )}
                                </div>
                                {fileName && (
                                    <p className="mt-2 text-gray-300">{`Selected file: ${fileName}`}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-800 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
