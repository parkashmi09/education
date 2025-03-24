import Image from "next/image"
import Link from "next/link"
import LogoStudy from "../assets/images/logoStudy.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-10 h-10 mr-2">
        <Image
          src={LogoStudy}
          alt="TARGETBOARD Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-[#EECD44]">
        TARGETBOARD
      </span>
    </Link>
  )
}

