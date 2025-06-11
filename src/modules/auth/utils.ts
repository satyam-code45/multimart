import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookies = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    //Ensure cross-domain cookie sharing as we will be subrouting so domain may be multimart.com or satyam.multimat.com
    sameSite: "none",
    domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN!,
    secure: process.env.NODE_ENV === "production"
  });
};

export default generateAuthCookies;
