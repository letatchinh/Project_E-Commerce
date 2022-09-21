import './App.css';
import Header from './layout/Header/Index'
import { Route, Routes } from 'react-router-dom';
import ListProducts from './components/ListProducts';
import CreateProduct from './components/CreateProduct';
import Login from './components/Login';
import Search from './components/Search';
import Register from './components/Register';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fecthProductRequest } from './redux/shopping/Shopping-actions';
import DetailProduct from './components/DetailProduct';
import ProfileUser from './components/ProfileUser';
import InfoUser from './components/InfoUser';
import ListPaymentUser from './components/ListPaymentUser';
import Payment from './components/Payment';
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
