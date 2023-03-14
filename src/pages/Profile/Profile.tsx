import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import avatar from "../../images/avatar.png"
import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="left">
          <div className="text">
            <hr />
            <h2>ПИЦЦЫ</h2>
          </div>

          
        </div>
        <div className="right">
          <div className="userImage">
            <img src={avatar} alt="" />
          </div>
          <p>{data?.name}</p>
          <p>{data?.mail}</p>
        </div>
      </div>
        
    </div>
  );
};

export default Profile;
