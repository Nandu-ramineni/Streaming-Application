
import { Route, Routes } from 'react-router-dom'
import UploadVideo from '../components/video/UploadVideo'
import DisplayVideos from '../components/video/DisplayVideos'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Login from '../components/Auth/Login'
import Subscriptions from '../components/Subscriptions/Subscriptions'
import AdminHomePage from './AdminHomePage/AdminHomePage'
import Users from '../components/Users/Users'
import Settings from '../components/Settings/Settings'
import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import ProtectedRoutes from '../components/ProtectedRoutes/ProtectedRoutes'
import Notifications from '../components/Notifications/Notifications'

const HomePage = () => {
    const { account } = useContext(DataContext);
    const isAuthenticated = !!account;
    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex flex-col w-full">
                <Navbar />
                <Routes>
                    <Route path='/' element={<ProtectedRoutes element={<AdminHomePage />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/users' element={<ProtectedRoutes element={<Users />} isAuthenticated={isAuthenticated} />} />
                    <Route path="/upload" element={<ProtectedRoutes element={<UploadVideo />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/stream'element={<ProtectedRoutes element={<DisplayVideos />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/subscriptions' element={<ProtectedRoutes element={<Subscriptions />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/notifications' element={<ProtectedRoutes element={<Notifications />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/settings' element={<ProtectedRoutes element={<Settings />} isAuthenticated={isAuthenticated} />} />
                </Routes>
            </div>
        </div>
    )
}

export default HomePage
