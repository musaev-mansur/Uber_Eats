import React from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch } from "../../hooks/hooks";
import { ISignUp } from "../../types/IUser";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpCafe } from "../../store/reducers/user/userActions";

const SignUpCafe = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ISignUp>();

  const onSubmit = (data: ISignUp) => {
    dispatch(signUpCafe(data));
    reset();
  };

  return (
    <div className="Registration">
      <div className="Registration__child">
        <div className="Registration__buttons">
          <Link to="/client/sign-up">
            <button className="greenBack EmptyButton">Стать клиентом</button>
          </Link>
          <button className="greenBack FullButton"> Для ресторана</button>
        </div>
        <br />
        <span>
          Уже есть аккаунт? <Link to="/sign-in">Войти</Link>
        </span>
        <h1>СТАТЬ ПАРТНЕРОМ</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name={"name"}
            register={register}
            text={"Название ресторана"}
            type={"input"}
          />
          <br />
          <Input
            name={"phone"}
            register={register}
            text={"Номер телефона"}
            type={"input"}
          />
          <br />
          <Input
            name={"city"}
            register={register}
            text={"Город"}
            type={"input"}
          />
          <br />
          <Input
            name={"address"}
            register={register}
            text={"Адрес"}
            type={"input"}
          />
          <br />
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
          <input
            className="greenBack Allbutton Registration__submit"
            type="submit"
            disabled={!isValid}
            value={"Регистрация"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpCafe;
