import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schema";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE)
  }),
  register: baseProcedure
    .input(
      registerSchema
    )
    .mutation(async ({ input, ctx }) => {

      const existingData = await ctx.db.find({
        collection:"users",
        limit: 1,
        where:{
          username: {
            equals: input.username
          }
        }
      })

      const eixstingUser = existingData.docs[0];

      if(eixstingUser){
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken"
        })
      }

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, //hashed by payload as long as auth: true in user colleciton
        },
      });
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Username or Password is incorrect",
        });
      }

      const cookies = await getCookies();

      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        //Ensure cross-domain cookie sharing as we will be subrouting so domain may be multimart.com or satyam.multimat.com
        // sameSite: "none",
        // domain: ""
      });
      return data;
    }),
  login: baseProcedure
    .input(
      loginSchema
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Username or Password is incorrect",
        });
      }

      const cookies = await getCookies();

      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        //Ensure cross-domain cookie sharing as we will be subrouting so domain may be multimart.com or satyam.multimat.com
        // sameSite: "none",
        // domain: ""
      });
      return data;
    }),
});
