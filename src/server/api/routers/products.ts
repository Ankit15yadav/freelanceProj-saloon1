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
    }),

    getProducts: publicProcedure.query(async ({ ctx }) => {

        const products = await ctx.db.product.findMany();

        return products;
    }),

    deleteProduct: publicProcedure.input(z.object({
        productId: z.string()
    })).mutation(async ({ ctx, input }) => {

        if (!ctx) {
            return;
        }

        if (input.productId === "") {
            throw new Error("Product id is required");
        }

        return await ctx.db.product.delete({
            where: {
                id: input.productId
            }
        })
    })
})