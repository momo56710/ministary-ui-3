import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import DashboardPI from './Pages/Service label/pages/Projet Innovent/dashboard'
import AddPI from './Pages/Service label/pages/Projet Innovent/Add';
import EditPI from './Pages/Service label/pages/Projet Innovent/Edit';
import DashboardST from './Pages/Service label/pages/Startups/dashboard'
import AddST from './Pages/Service label/pages/Startups/Add';
import EditST from './Pages/Service label/pages/Startups/Edit';
import Home from './Pages/Service label/Home';
import LogIn from './Pages/login'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/service-label" element={<Home />} />
          <Route path="/service-label/projet-innovent" element={<DashboardPI />} />
          <Route path="/service-label/projet-innovent/create" element={<AddPI />} />
          <Route path="/service-label/projet-innovent/edit/:_id" element={<EditPI />} />
          <Route path="/service-label/Startups" element={<DashboardST />} />
          <Route path="/service-label/Startups/create" element={<AddST />} />
          <Route path="/service-label/Startups/edit/:_id" element={<EditST />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
