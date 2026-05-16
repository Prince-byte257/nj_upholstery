import { Router } from "express";
import { db } from "@workspace/db";
import { galleryTable, servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/gallery", async (req, res) => {
  try {
    const serviceIdParam = req.query.serviceId;
    const serviceId = serviceIdParam ? parseInt(serviceIdParam as string, 10) : null;

    const rows = await db
      .select({
        gallery: galleryTable,
        serviceName: servicesTable.name,
      })
      .from(galleryTable)
      .innerJoin(servicesTable, eq(galleryTable.serviceId, servicesTable.id))
      .where(serviceId ? eq(galleryTable.serviceId, serviceId) : undefined);

    res.json(rows.map(({ gallery: g, serviceName }) => formatGalleryItem(g, serviceName)));
  } catch (err) {
    req.log.error({ err }, "Failed to list gallery");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/gallery/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [row] = await db
      .select({
        gallery: galleryTable,
        serviceName: servicesTable.name,
      })
      .from(galleryTable)
      .innerJoin(servicesTable, eq(galleryTable.serviceId, servicesTable.id))
      .where(eq(galleryTable.id, id));

    if (!row) return res.status(404).json({ error: "Not found" });

    res.json(formatGalleryItem(row.gallery, row.serviceName));
  } catch (err) {
    req.log.error({ err }, "Failed to get gallery item");
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatGalleryItem(g: typeof galleryTable.$inferSelect, serviceName: string) {
  return {
    id: g.id,
    title: g.title,
    description: g.description ?? null,
    imageUrl: g.imageUrl,
    beforeImageUrl: g.beforeImageUrl ?? null,
    afterImageUrl: g.afterImageUrl ?? null,
    serviceId: g.serviceId,
    serviceName,
    tags: g.tags ?? [],
  };
}

export default router;
