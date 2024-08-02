import img from '../../assets/PageXFound.png'
import {Link} from 'react-router-dom'
const PageNotfound = () => {
    return (
        <section className="grid grid-cols-1  gap-4 px-6 py-2 min-h-screen">
            <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center text-white text-center text-2xl">
            <img src={img} alt="Not found" className="mb-4 w-64 h-72" />
            {/* <p>Page not found😔</p> <br /> */}
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><Link to='/'>Back to Home</Link></button>
        </div>
        </section>
    )
}

export default PageNotfound
