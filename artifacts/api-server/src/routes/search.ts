import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable, galleryTable } from "@workspace/db";
import { ilike, or, eq } from "drizzle-orm";

const router = Router();

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q as string ?? "").trim();
    if (!q) {
      return res.json({ query: q, services: [], gallery: [] });
    }

    const pattern = `%${q}%`;

    const [services, galleryRows] = await Promise.all([
      db.select().from(servicesTable).where(
        or(
          ilike(servicesTable.name, pattern),
          ilike(servicesTable.description, pattern),
          ilike(servicesTable.category, pattern),
        )
      ).limit(6),

      db
        .select({
          gallery: galleryTable,
          serviceName: servicesTable.name,
        })
        .from(galleryTable)
        .innerJoin(servicesTable, eq(galleryTable.serviceId, servicesTable.id))
        .where(
          or(
            ilike(galleryTable.title, pattern),
            ilike(galleryTable.description, pattern),
            ilike(servicesTable.name, pattern),
          )
        )
        .limit(6),
    ]);

    res.json({
      query: q,
      services: services.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        category: s.category,
        startingPrice: s.startingPrice,
        imageUrl: s.imageUrl,
        features: s.features ?? [],
        turnaroundDays: s.turnaroundDays ?? null,
      })),
      gallery: galleryRows.map(({ gallery: g, serviceName }) => ({
        id: g.id,
        title: g.title,
        description: g.description ?? null,
        imageUrl: g.imageUrl,
        beforeImageUrl: g.beforeImageUrl ?? null,
        afterImageUrl: g.afterImageUrl ?? null,
        serviceId: g.serviceId,
        serviceName,
        tags: g.tags ?? [],
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to search");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
