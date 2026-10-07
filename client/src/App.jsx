
import { Routes, Route } from "react-router";

import './App.css'
import DesignSystem from './pages/DesignSystem'

             
       const App =()=>{
        return (
          <Routes>
            <Route path="/design-system" element={<DesignSystem />} />
          </Routes>
        );

       }
export default App
