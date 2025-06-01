export const DefaultButton = ({
  type = 'submit',
  text = '',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className='w-fit px-4 py-1 bg-black text-white rounded
hover:bg-blue-700 transition'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
