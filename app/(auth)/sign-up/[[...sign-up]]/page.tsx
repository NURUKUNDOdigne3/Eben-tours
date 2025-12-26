import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-10">
      <div className="mx-auto flex flex-col items-center gap-5 max-w-xl justify-center">
        <Image
          src="/log.webp"
          width={100}
          height={100}
          alt="Eben Safari Tours Logo"
        />
        <SignUp forceRedirectUrl="/admin" />
      </div>
    </div>
  );
}
