import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { comments } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const commentsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    try {
      const result = await db
        .select()
        .from(comments)
        .orderBy(desc(comments.createdAt))
        .limit(50);
      return result;
    } catch (error) {
      console.error("[Comments] Failed to list comments:", error);
      return [];
    }
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().trim().min(1, "El comentario no puede estar vacío").max(1000, "El comentario es demasiado largo"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Base de datos no disponible" });
      }

      const userName = ctx.user.name || "Usuario de la Comunidad";

      try {
        await db.insert(comments).values({
          userId: ctx.user.id,
          userName,
          content: input.content,
        });

        const created = await db
          .select()
          .from(comments)
          .where(eq(comments.userId, ctx.user.id))
          .orderBy(desc(comments.createdAt))
          .limit(1);

        return created[0] ?? { success: true };
      } catch (error) {
        console.error("[Comments] Failed to create comment:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "No se pudo publicar el comentario" });
      }
    }),
});
