import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import "./Information.scss";
import { IUserEdit } from "../../types/IUser";
import { useForm } from "react-hook-form";

const Information = () => {
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  const [editUserProfile, { isLoading }] = userApi.useEditUserProfileMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUserEdit>();

  const onSubmit = async (data: IUserEdit) => {

    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => { 
      if (key === 'image' && value) {
        formData.append(key, value[0]);
      }else if (value) {
        formData.append(key, value.toString());
      }
    });
    
    await editUserProfile(formData);
    reset();
  };

  return (
    <div className="left-profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-elems">
          <label>
            1.Название организации
            <input {...register("name")} />
          </label>
          <label>
            2.Изменить логотип
            <input type="file" {...register("image")} />
          </label>
          <label>
            3.Телефон
            <input
              {...register("phone", {
                pattern: /^((\+7|7|8)+([0-9]){10})$/,
              })}
            />
          </label>
          <label>
            4.Email
            <input {...register("mail")} type="email" />
          </label>
          <label>
            5.Адрес организации
            <input {...register("address")} />
          </label>
        </div>
        <button type="submit" className='save greenBack'>Сохранить изменения</button>
      </form>
    </div>
  );
};

export default Information;
