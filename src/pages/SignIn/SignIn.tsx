import React from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch } from "../../hooks/hooks";
import { IAuth } from "../../types/IUser";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpCafe } from "../../store/reducers/user/userActions";
import './SignIn.scss'

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IAuth>();

  const onSubmit = (data: IAuth) => {
    dispatch(signUpCafe(data));
    reset();
  };

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
            Нет аккаунта?   <Link to="/sign-in">Зарегистрироваться</Link>
          </span>
      </div>
    </div>
  );
};

export default SignIn;
