type SvgButtonProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SvgButton = ({
  icon: Icon,
  type = 'button',
  className,
  onClick,
  ...props
}: SvgButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      <Icon />
    </button>
  );
};