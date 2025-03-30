type Props = {
  children: React.ReactNode,
  modal: React.ReactNode,
};

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div className='relative min-h-screen'>
      {children}
      {modal}
    </div>
  )
}