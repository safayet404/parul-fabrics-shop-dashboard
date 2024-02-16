import React from 'react'

const CustomInput = (props) => {
    const {type,label,i_id,i_class,name,list,value,placeholder,onChange,onBlur} = props
  return (
    <div>
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        list={list}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default CustomInput