import React from 'react';

/**
 *
 * @returns a input element with label animation
 */
function InputField({
  label,
  value,
  setValue,
  inputRef,
}: {
  label: string;
  value: string | undefined;
  setValue: (val: string) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}) {
  return (
    <div className='input_field_wrapper'>
      <label className='input'>
        <input
          className='input_field'
          type='text'
          placeholder=' '
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          ref={inputRef ?? undefined}
        />
        <span className='input_label'>{label}</span>
      </label>
    </div>
  );
}

export default React.memo(InputField);
