import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
const FooterTenants = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full px-4 py-6 gap-2 lg:px-12">
        <p className="text-gray-500">Powered by</p>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
          <span className={cn("text-xl font-semibold", poppins.className)}>
            MultiMart
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default FooterTenants;
