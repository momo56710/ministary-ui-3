import React from 'react';
import './Pages/components/css/scroll.css'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPISL from './Pages/Service label/pages/Projet Innovent/dashboard'
import DashboardSTSL from './Pages/Service label/pages/Startups/dashboard'
import DashboardINSL from './Pages/Service label/pages/Incubator/dashboard'
import AddPISL from './Pages/Service label/pages/Projet Innovent/Add';
import EditPISL from './Pages/Service label/pages/Projet Innovent/Edit';
import EditINSL from './Pages/Service label/pages/Incubator/Edit';
import AddSTSL from './Pages/Service label/pages/Startups/Add';
import AddINSL from './Pages/Service label/pages/Incubator/Add';
import EditSTSL from './Pages/Service label/pages/Startups/Edit';
import DashboardPICL from './Pages/comite de labilisation/pages/Projet Innovent/dashboard'
import DashboardSTCL from './Pages/comite de labilisation/pages/Startups/dashboard'
import DashboardINCL from './Pages/comite de labilisation/pages/Incubator/dashboard'
import AddPICL from './Pages/comite de labilisation/pages/Projet Innovent/Add';
import EditPICL from './Pages/comite de labilisation/pages/Projet Innovent/Edit';
import EditINCL from './Pages/comite de labilisation/pages/Incubator/Edit';
import AddSTCL from './Pages/comite de labilisation/pages/Startups/Add';
import AddINCL from './Pages/comite de labilisation/pages/Incubator/Add';
import EditSTCL from './Pages/comite de labilisation/pages/Startups/Edit';
import HomeSL from './Pages/Service label/Home';
import HomeCL from './Pages/comite de labilisation/Home';
import LogIn from './Pages/login'
import AddUser from './Pages/addUser';
import PdfSt from './Pages/Service label/pages/Startups/makePdf';
import PdfPI from './Pages/Service label/pages/Projet Innovent/makePdf';
import PdfIN from './Pages/Service label/pages/Incubator/makePdf';
import ConvertXlsx from './Pages/comite de labilisation/pages/convertXlsx';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/*service label links*/}
          <Route path="/comite-de-labilisation" element={<HomeCL />} />
          <Route path="/xlsx" element={<ConvertXlsx />} />
          <Route path="/service-label" element={<HomeSL />} />
          <Route path="/service-label/projet-innovent" element={<DashboardPISL/>} />
          <Route path="/service-label/projet-innovent/create" element={<AddPISL/>} />
          <Route path="/service-label/projet-innovent/edit/:_id" element={<EditPISL/>} />
          <Route path="/service-label/projet-innovent/make-pdf/:_id" element={<PdfPI/>} />
          <Route path="/service-label/Startups" element={<DashboardSTSL/>} />
          <Route path="/service-label/Startups/create" element={<AddSTSL/>} />
          <Route path="/service-label/Startups/edit/:_id" element={<EditSTSL/>} />
          <Route path="/service-label/Startups/make-pdf/:_id" element={<PdfSt/>} />
          <Route path="/service-label/incubateur" element={<DashboardINSL/>} />
          <Route path="/service-label/incubateur/create" element={<AddINSL/>} />
          <Route path="/service-label/incubateur/edit/:_id" element={<EditINSL/>} />
          <Route path="/service-label/incubateur/make-pdf/:_id" element={<PdfIN/>} />
          {/*comite de labilisation links*/}
          <Route path="/comite-de-labilisation/projet-innovent" element={<DashboardPICL/>} />
          <Route path="/comite-de-labilisation/projet-innovent/create" element={<AddPICL/>} />
          <Route path="/comite-de-labilisation/projet-innovent/edit/:_id" element={<EditPICL/>} />
          <Route path="/comite-de-labilisation/Startups" element={<DashboardSTCL/>} />
          <Route path="/comite-de-labilisation/Startups/create" element={<AddSTCL/>} />
          <Route path="/comite-de-labilisation/Startups/edit/:_id" element={<EditSTCL/>} />
          <Route path="/comite-de-labilisation/incubateur" element={<DashboardINCL/>} />
          <Route path="/comite-de-labilisation/incubateur/create" element={<AddINCL/>} />
          <Route path="/comite-de-labilisation/incubateur/edit/:_id" element={<EditINCL/>} />
          {/*sign in and up*/}
          <Route path="/login" element={<LogIn />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
