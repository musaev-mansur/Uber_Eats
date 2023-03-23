import { Route, useActionData } from "react-router";
import { Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import "./App.scss";
import "./generalStyle/GeneralStyle.scss";
import HomePage from "./pages/HomePage/HomePage";
import Delivery from "./components/Delivery/Delivery";
import SignIn from "./pages/SignIn/SignIn";
import SignUpCafe from "./pages/SignUpCafe/SignUpCafe";
import SignUpClient from "./pages/SignUpClient/SignUpClient";
import Profile from "./pages/Profile/Profile";
import { logOut } from "./store/reducers/user/userActions";
import { useEffect } from "react";
import Basket from "./components/Basket/Basket";
import { cookies } from "./Api/api";
import { foodApi } from "./store/reducers/servise/foodService";
import Orders from "./components/Orders/Orders";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, isAuth } = useAppSelector((state) => state.user);
  const {data} = foodApi.useGetFoodInBasketQuery('')
  // console.log(data);
  

  useEffect(() => {
    if (cookies.get("data")) {
      dispatch(logOut());
    }
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <div className="Loader">
          <div>Loading...</div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/client/sign-up" element={<SignUpClient />} />
        <Route path="/cafe/sign-up" element={<SignUpCafe />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isAuth && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/orders" element={<Orders />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
