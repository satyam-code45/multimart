import NavbarCheckout from "@/modules/checkout/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
async function layout({ children, params }: Props) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarCheckout slug={slug} />

      <div className="flex-1 bg-[#F4F4F0] p-6">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
