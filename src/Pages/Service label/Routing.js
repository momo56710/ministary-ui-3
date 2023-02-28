import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Route , Routes} from 'react-router';
import DashboardPISL from './Pages/Service label/pages/Projet Innovent/dashboard'
import DashboardSTSL from './Pages/Service label/pages/Startups/dashboard'
import DashboardINSL from './Pages/Service label/pages/Incubator/dashboard'
import AddPISL from './Pages/Service label/pages/Projet Innovent/Add';
import EditPISL from './Pages/Service label/pages/Projet Innovent/Edit';
import EditINSL from './Pages/Service label/pages/Incubator/Edit';
import AddSTSL from './Pages/Service label/pages/Startups/Add';
import AddINSL from './Pages/Service label/pages/Incubator/Add';
import EditSTSL from './Pages/Service label/pages/Startups/Edit';
import HomeSL from './Pages/Service label/Home';
import { BrowserRouter } from 'react-router-dom';
export default function Routing() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/comite-de-labilisation" element={<HomeCL />} />
      <Route path="/service-label" element={<HomeSL />} />
      <Route path="/service-label/projet-innovent" element={<DashboardPISL/>} />
      <Route path="/service-label/projet-innovent/create" element={<AddPISL/>} />
      <Route path="/service-label/projet-innovent/edit/:_id" element={<EditPISL/>} />
      <Route path="/service-label/Startups" element={<DashboardSTSL/>} />
      <Route path="/service-label/Startups/create" element={<AddSTSL/>} />
      <Route path="/service-label/Startups/edit/:_id" element={<EditSTSL/>} />
      <Route path="/service-label/incubateur" element={<DashboardINSL/>} />
      <Route path="/service-label/incubateur/create" element={<AddINSL/>} />
      <Route path="/service-label/incubateur/edit/:_id" element={<EditINSL/>} />
     
    </Routes>
  </BrowserRouter>
  )
}
