import './App.css';
import Header from './layout/Header/Index'
import { Route, Routes } from 'react-router-dom';
import ListProducts from './components/client/ListProducts';
import CreateProduct from './components/client/CreateProduct';
import Login from './components/client/Login';
import Search from './components/client/Search';
import Register from './components/client/Register';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fecthProductRequest } from './redux/shopping/Shopping-actions';
import DetailProduct from './components/client/DetailProduct';
import ProfileUser from './components/client/ProfileUser';
import InfoUser from './components/client/InfoUser';
import ListPaymentUser from './components/client/ListPaymentUser';
import Payment from './components/client/Payment';
function App() {
  const dispatch = useDispatch();
  const fetch = useCallback(async() => {
    await dispatch(fecthProductRequest())
  },[])
  useEffect(() => {
    fetch()
  },[]);
  return (
   <>
     <Header />
     <Routes>
       <Route path='/' element={<ListProducts />}/>
       <Route path='/search' element={<Search />}/>
       <Route path='/new' element={<CreateProduct />}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/register' element={<Register />}/>
      <Route path='products/:productId' element={<DetailProduct/>}/>
      <Route path='profile_Info' element={<ProfileUser children={<InfoUser/>}/>}/>
      <Route path='profile_ListPayment' element={<ProfileUser children={<ListPaymentUser/>}/>}/>
      <Route path='payment' element={<Payment />}/>
     
     </Routes>
   </>
  );
}

export default App;
