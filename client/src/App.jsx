import { BrowserRouter } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import DataProvider from "./Context/DataProvider"
import { useEffect, useState } from "react"
import { getMaintenanceMode } from "./Services/api"
import Maintenance from "./Pages/Maintenance/Maintenance"

const App = () => {
  const [maintenance, setMaintenance] = useState(false)
  const fetchMaintenance = async() => {
    try {
      const response = await getMaintenanceMode()
      setMaintenance(response.data.maintenanceMode)
    } catch (error) {
      console.error('Error fetching maintenance mode:', error)
    }
  }
  useEffect(() => {
    fetchMaintenance();
  },[])
  return (
    <DataProvider>
      <BrowserRouter>
        {
          maintenance ? <Maintenance/> : <Homepage />
        }
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
