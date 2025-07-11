import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ctx}) => {
        

        const data = await ctx.db.find({
            collection: "categories",
            depth: 1, //Populate subcateegories, subcategories.[0] will be a type of category
            pagination: false,
            where: {
                parent: {
                    exists: false
                }
            },
            sort: "name"
        })

        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                //Because of depth one it is confirm that doc will of type "category"
                ...(doc as Category),
            }))
        }))
        return formattedData
    })
})