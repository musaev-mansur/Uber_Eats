import React from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ILogIn } from "../../types/IUser";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './SignIn.scss'
import './AdaptiveSignIn.scss'
import { logIn } from "../../store/reducers/user/userActions";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILogIn>();

  const onSubmit = (data: ILogIn) => {
    dispatch(logIn(data));
    reset();
  };
 
  const { isAuth } = useAppSelector(state => state.user)

  return (
    <div className=" Auth ">
      <h1>Войти</h1>
      <div className="Registration__child">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name={"mail"}
            register={register}
            text={"Электронная почта"}
            type={"email"}
          />
          <br />
          <Input
            name={"password"}
            register={register}
            text={"Пароль"}
            type={"password"}
          />
          <br />
          <button
            className="greenBack Allbutton Registration__submit"
            type="submit"
            disabled={!isValid}
          >Войти</button>
        </form>
         <span>
            Нет аккаунта?   <Link to="/client/sign-up">Зарегистрироваться</Link>
          </span>
      </div>
      {isAuth && <Navigate to='/'/>}
    </div>
  );
};

export default SignIn;
