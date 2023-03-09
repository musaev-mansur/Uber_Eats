import React from "react";
import './Input.scss'

interface InputTypes {
    name: string;
    register: any;
    text: string;
    type: string
}


const Input: React.FC<InputTypes> = ({name, register, text, type}) => {

  return (
    <label>
        {text}
        <br />
      <input type={type} className="AuthInput" {...register(name)}/>
    </label>
  );
};

export default Input;
