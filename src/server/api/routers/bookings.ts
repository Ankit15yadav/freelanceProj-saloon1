import { z } from "zod";
import { createTRPCRouter, publicProcedure, } from "../trpc";
import { db } from "@/server/db";
import { Input } from "@/components/ui/input";

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
            orderBy: {
                createdAt: 'desc'
            }
        })

        return bookings;
    }),

    updateBooking: publicProcedure.input(z.object({
        groupdId: z.string()
    })).mutation(async ({ ctx, input }) => {

        await ctx.db.booking.update({
            where: {
                id: input.groupdId
            },
            data: {
                status: 'VIEWED'
            }
        })
    }),

    insertBooking: publicProcedure.input(z.object({
        name: z.string(),
        phone: z.string().min(10).max(10),
        timeSlot: z.string(),
        modeOfReservation: z.string(),
        coupon: z.string(),
        date: z.string(),
        service: z.string(),
        price: z.string()
    })).mutation(async ({ ctx, input }) => {

        if (!ctx) {
            throw new Error("user is unauthorized");
        }

        await ctx.db.booking.create({
            data: {
                date: input.date,
                name: input.name,
                phoneNumber: input.phone,
                modeOfReservation: input.modeOfReservation,
                timeSlot: input.timeSlot,
                coupon: input.coupon,
                serviceName: input.service,
                servicePrice: input.price
            }
        })
    })
})