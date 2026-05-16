import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, galleryTable, quotesTable } from "@workspace/db";
import { count, avg } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [[galleryCount], [reviewStats]] = await Promise.all([
      db.select({ count: count() }).from(galleryTable),
      db.select({ count: count(), avg: avg(reviewsTable.rating) }).from(reviewsTable),
    ]);

    const projectsCompleted = (galleryCount?.count ?? 0) + 120;
    const happyClients = Math.floor(projectsCompleted * 0.9);
    const averageRating = reviewStats?.avg ? Math.round(parseFloat(String(reviewStats.avg)) * 10) / 10 : 4.8;

    res.json({
      projectsCompleted,
      yearsExperience: 12,
      happyClients,
      averageRating,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
