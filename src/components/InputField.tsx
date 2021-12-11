import React from 'react';

const InputField = ({
  label,
  value,
  setValue,
  inputRef,
}: {
  label: string;
  value: string | undefined;
  setValue: (val: string) => void;
  inputRef?: any;
}) => {
  return (
    <div className='input_field_wrapper'>
      <label className='input'>
        <input
          className='input_field'
          type='text'
          placeholder=' '
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          ref={inputRef}
        />
        <span className='input_label'>{label}</span>
      </label>
    </div>
  );
};

export default InputField;
