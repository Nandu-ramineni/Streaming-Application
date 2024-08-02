import img from '../../assets/maintenance.gif'

const Maintenance = () => {
    return (
        <section className="grid grid-cols-1  gap-4 px-6 py-2 min-h-screen">
            <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center text-white text-center text-2xl">
            <p>Enjoio says</p>
            <img src={img} alt="Not found" className="mb-4 w-60 h-64" />
            <p>System under Maintenance</p>
            <p>Please reach after some Time</p>
        </div>
        </section>
        
    )
}

export default Maintenance
