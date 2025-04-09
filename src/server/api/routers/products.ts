import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const products = createTRPCRouter({

    createProduct: publicProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
        rating: z.string(),
        image: z.string(),
    })).mutation(async ({ ctx, input }) => {

        if (!ctx) {
            throw new Error("UnAuthorized")
        }

        await ctx.db.product.create({
            data: {
                name: input.name,
                description: input.description,
                image: input.image,
                price: input.price,
                rating: input.rating
            }
        })
    })
})