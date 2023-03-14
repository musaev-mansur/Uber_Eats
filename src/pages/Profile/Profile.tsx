import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  console.log(data);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Profile;
