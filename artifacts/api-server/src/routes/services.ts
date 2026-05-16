import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/services", async (req, res) => {
  try {
    const services = await db.select().from(servicesTable);
    res.json(services.map(formatService));
  } catch (err) {
    req.log.error({ err }, "Failed to list services");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, id));
    if (!service) return res.status(404).json({ error: "Not found" });

    res.json(formatService(service));
  } catch (err) {
    req.log.error({ err }, "Failed to get service");
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatService(s: typeof servicesTable.$inferSelect) {
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    category: s.category,
    startingPrice: s.startingPrice,
    imageUrl: s.imageUrl,
    features: s.features ?? [],
    turnaroundDays: s.turnaroundDays ?? null,
  };
}

export default router;
