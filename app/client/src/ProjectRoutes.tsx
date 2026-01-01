import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
const ProjectRoutes = () => {

  return (
	<BrowserRouter>
		<Routes >				
			<Route path="/" element={<Home/>} index /> 
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
  )
}

export default ProjectRoutes
