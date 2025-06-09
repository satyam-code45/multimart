import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
interface Props {
  slug: string;
}

const NavbarCheckout = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={"/"} className="pl-6 flex items-center">
          <span className={cn("text-3xl md:text-5xl font-semibold", poppins.className)}>
            MultiMart
          </span>
        </Link>
        <Button variant="elevated" asChild>
          <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavbarCheckout;
