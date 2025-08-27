import Image from "next/image"

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Image
                src="/logo.webp"
                alt="Clippy logo"
                width={30}
                height={30}
                className="rounded-md"
            />
            <span className="text-xl font-bold text-primary mt-0.5">Clippy</span>
        </div>
    )
}

export default Logo
