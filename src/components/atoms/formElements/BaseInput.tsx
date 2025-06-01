type BaseInputProps = {
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BaseInput = ({
  type = 'text',
  id = '',
  value = '',
  placeholder = '',
  required = false,
  onChange = () => {},
}: BaseInputProps) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className='block w-full p-2
      bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    />
  );
};
