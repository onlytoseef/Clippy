import Image from 'next/image'

interface HeaderProps {
  title: string
  subTitle: string
}

const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <div className="w-full md:w-3/6 bg-primary/5 p-8 flex flex-col justify-center items-center">
      <div className="mb-3">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={256}
          height={256}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h1 className="text-2xl font-semibold text-primary mb-2">{title}</h1>
      <p className="text-foreground/70 text-sm text-center">
        {subTitle}
      </p>
    </div>
  )
}

export default Header
