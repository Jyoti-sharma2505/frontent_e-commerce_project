// import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EcommerceContextProvider } from "./contexts/EcommerceContext";
import Home from "./pages/Home";
import ProductCart from "./pages/ProductCart";
import ProductDetails from "./pages/ProductDetails";
import Whislsit from "./pages/Whislist";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
// import AddressPage from "./pages/AddressPage";

function App() {
  return (
    <BrowserRouter>
      <EcommerceContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/wishlist" element={<Whislsit/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          {/* <Route path="/addresses" element={<AddressPage/>}/> */}
        </Routes>
      </EcommerceContextProvider>
    </BrowserRouter>
  );
}

export default App;
