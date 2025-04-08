import { z } from "zod";
import { createTRPCRouter, publicProcedure, } from "../trpc";
import { db } from "@/server/db";

export const Bookings = createTRPCRouter({
    getBooking: publicProcedure.input(z.object({
        userId: z.string()
    })).query(async ({ ctx, input }) => {

        if (!ctx) {
            throw new Error("Not authorized");
        }

        const user = await ctx.db.user.findUnique({
            where: {
                id: input.userId
            },
        })

        if (!user) {
            throw new Error("Authorized");
        }

        const bookings = await db.booking.findMany({

        })

        return bookings;
    })
})