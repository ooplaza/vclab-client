import React, { FC, useEffect } from 'react';
import { Input } from './ui/input';

const AppDebouncedInput: FC<
  {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
> = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);  

  return (
    <Input
      className='max-w-sm'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export default AppDebouncedInput;
