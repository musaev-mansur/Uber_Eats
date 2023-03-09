import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input/Input";
import { IAuth } from "../types/IUser";

const Authorization = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm( );

  const onSubmit = (data: IAuth) => {
    alert(JSON.stringify(data));
    reset();
    return 
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name={'name'} register={register} text={'Имя'} type={'input'}/><br/>
        <Input name={'phone'} register={register} text={'Номер телефона'} type={'input'}/><br/>
        <Input name={'city'} register={register} text={'Город'} type={'input'}/><br/>
        <Input name={'address'} register={register} text={'Адрес'} type={'input'}/><br/>
        <Input name={'mail'} register={register} text={'Электронная почта'} type={'email'}/><br/>
        <Input name={'password'} register={register} text={'Пароль'} type={'password'}/><br/>
        <input className="greenBack Allbutton" type='submit' disabled={!isValid} />
      </form>
    </div>
  );
};

export default Authorization;
