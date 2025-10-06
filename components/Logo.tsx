import Image from "next/image"

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Image
                src="/logo.webp"
                alt="Clippy logo"
                width={24}
                height={24}
                className="rounded-md"
            />
            <span className="text-lg font-bold text-primary mt-0.5">Clippy</span>
        </div>
    )
}

export default Logo
