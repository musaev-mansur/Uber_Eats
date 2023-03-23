import React, {useState} from "react";
import { userApi } from "../../store/reducers/servise/userServise";
import avatar from '../../images/avatar.png'
import "./TopCaffe.scss";

const TopCaffe = () => {
  const { data: allCafes } = userApi.useGetCafesQuery("");
  const [cafesTotal, setCafesTotal] = useState(4)
  return (
    <>
      <div className="top-cafe">
        <div className="text">
          <hr />
          <h2>топ заведений по отзывам</h2>
        </div>
        <div className="img-div">
          {allCafes?.slice(0, cafesTotal).map((cafe) => (
            <img key={cafe._id} src={cafe.image || 'data:image/png;base64,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'} alt="" />
          ))}
        </div>
        <button disabled={cafesTotal >= (allCafes?.length || 0)} onClick={() => setCafesTotal(cafesTotal + 4)} className="more greenBack">Показать больше</button>
      </div>
    </>
  );
};

export default TopCaffe;
