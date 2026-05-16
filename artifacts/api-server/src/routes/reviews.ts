import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router = Router();

const createReviewSchema = z.object({
  customerName: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5),
  serviceId: z.number().int().nullable().optional(),
});

router.get("/reviews", async (req, res) => {
  try {
    const rows = await db
      .select({
        review: reviewsTable,
        serviceName: servicesTable.name,
      })
      .from(reviewsTable)
      .leftJoin(servicesTable, eq(reviewsTable.serviceId, servicesTable.id))
      .orderBy(reviewsTable.createdAt);

    const reviews = rows.map(({ review: r, serviceName }) => ({
      id: r.id,
      customerName: r.customerName,
      rating: r.rating,
      comment: r.comment,
      serviceId: r.serviceId ?? null,
      serviceName: serviceName ?? null,
      createdAt: r.createdAt.toISOString(),
    }));

    const totalCount = reviews.length;
    const averageRating = totalCount > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount) * 10) / 10
      : 0;

    res.json({ reviews, averageRating, totalCount });
  } catch (err) {
    req.log.error({ err }, "Failed to list reviews");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const parsed = createReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }

    const { customerName, rating, comment, serviceId } = parsed.data;

    const [review] = await db.insert(reviewsTable).values({
      customerName,
      rating,
      comment,
      serviceId: serviceId ?? null,
    }).returning();

    res.status(201).json({
      id: review.id,
      customerName: review.customerName,
      rating: review.rating,
      comment: review.comment,
      serviceId: review.serviceId ?? null,
      serviceName: null,
      createdAt: review.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create review");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
