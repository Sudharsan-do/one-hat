import { env } from "~/env";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { getUploadAuthParams } from "@imagekit/next/server";
import z from "zod";
import { Status } from "@prisma/client";

export const videoRouter = createTRPCRouter({
    authUploadVideo: adminProcedure.query(async ({}) => {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: env.IMAGEKIT_PRIVATE_KEY,
            publicKey: env.NEXT_PUBLIC_IMAGEKIT_KEY,
        });
        return {
            token,
            expire,
            signature,
        };
    }),
    approveScript: adminProcedure
        .input(
            z.object({
                scriptId: z.string().min(1, "Script ID is required"),
                videoUrl: z.string().url("Invalid video URL"),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.videoScript
                .update({
                    where: { id: input.scriptId },
                    data: {
                        videoUrl: input.videoUrl,
                        status: Status.APPROVED,
                    },
                })
                .catch((error) => {
                    console.error("Error approving script:", error);
                    throw new Error("Failed to approve script");
                });
        }),
    rejectScript: adminProcedure
        .input(
            z.object({
                scriptId: z.string().min(1, "Script ID is required"),
                reason: z.string().min(1, "Rejection reason is required"),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.videoScript
                .update({
                    where: { id: input.scriptId },
                    data: {
                        reason: input.reason,
                        status: Status.REJECTED,
                    },
                })
                .catch((error) => {
                    console.error("Error rejecting script:", error);
                    throw new Error("Failed to reject script");
                });
        }),
    fetchScripts: adminProcedure
        .input(
            z.object({
                userId: z.string().optional(),
                email: z.string().optional(),
                scriptId: z.string().optional(),
                status: z
                    .enum([Status.APPROVED, Status.PENDING, Status.REJECTED])
                    .optional(),
                pageIndex: z.number().min(0).default(0),
                pageSize: z.number().min(1).max(100).default(10),
            }),
        )
        .query(async ({ ctx, input }) => {
            const data = await Promise.all([
                ctx.db.videoScript.findMany({
                    skip: input.pageIndex * input.pageSize,
                    take: input.pageSize,
                    where: {
                        userId: input.userId?.trim()
                            ? {
                                  contains: input.userId.trim(),
                                  mode: "insensitive",
                              }
                            : undefined,
                        id: input.scriptId?.trim()
                            ? {
                                  contains: input.scriptId.trim(),
                                  mode: "insensitive",
                              }
                            : undefined,
                        status: input.status ?? undefined,
                        user: {
                            email: input.email?.trim()
                                ? {
                                      contains: input.email.trim(),
                                      mode: "insensitive",
                                  }
                                : undefined,
                        },
                    },
                    select: {
                        id: true,
                        userId: true,
                        status: true,
                        createdAt: true,
                        reason: true,
                        content: true,
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                }),
                ctx.db.videoScript.groupBy({
                    by: ["status"],
                    _count: {
                        status: true,
                    },
                }),
            ]);
            const statusCounts = Object.fromEntries(
                Object.values(Status).map((status) => {
                    const match = data[1].find(
                        (item) => item.status === status,
                    );
                    return [status, match?._count.status ?? 0];
                }),
            );
            return {
                list: data[0],
                pendingCount: statusCounts[Status.PENDING] ?? 0,
                completedCount: statusCounts[Status.APPROVED] ?? 0,
                rejectedCount: statusCounts[Status.REJECTED] ?? 0,
            };
        }),
});
