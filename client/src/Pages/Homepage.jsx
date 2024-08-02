import { Route, Routes } from "react-router-dom"
import Navbar from "../Components/Navbar/Navbar"
import Banner from "../Components/Home/Banner"
import Video from "../Components/Home/Video"
import LanguageVideos from "../Components/Home/LanguageVideo"
import Login from "./Auth/Login"
import Subscription from "./Subscription/Subscription"
import Register from "./Auth/Register"
import Profile from "./Profile/Profile"
import Movies from "./Movies/Movies"
import Series from "./Movies/Series"
import WatchList from "./WatchList/WatchList"
import Search from "./Search/Search"
import UpgradeSubscription from "./Subscription/UpgradeSubscription"
import Footer from "../Components/Footer/Footer"
import PaymentSuccessful from "./Subscription/PaymentSuccessful"
import PageNotFound from "./Maintenance/Page404"

const Homepage = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Banner/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/subscription" element={<Subscription/>} />
                <Route path="/upgrade-subscription" element={<UpgradeSubscription/>} />
                <Route path="/video/:id" element={<Video/>} />
                <Route path="/watch/:language" element={<LanguageVideos />} />
                <Route path="/watch/:language/:id" element={<Video/>} />
                <Route path="/movies" element={<Movies/>} />
                <Route path="/watch/:id" element={<Video/>} />
                <Route path="/series" element={<Series/>} />
                <Route path="/watch-list" element={<WatchList/>} />
                <Route path="/search" element={<Search/>} />
                <Route path='/sub-success' element={<PaymentSuccessful />} />
                <Route path='*' element={<PageNotFound/>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default Homepage
