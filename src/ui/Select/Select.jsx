import React from 'react'
import s from './Select.module.scss'

export const Select = ({options, value, onChange}) => {
  return (
    <select onChange={onChange} className={s.select} value={value}>
      {options.map((el) => (
        <option key={el}>{el}</option>
      ))}
    </select>
  );
}
