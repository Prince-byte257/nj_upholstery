import { Router } from "express";
import { db } from "@workspace/db";
import { quotesTable } from "@workspace/db";
import { z } from "zod";

const router = Router();

const createQuoteSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().nullable().optional(),
  serviceCategory: z.string().min(1),
  description: z.string().min(10),
  preferredContact: z.enum(["whatsapp", "call", "email"]).optional(),
});

router.post("/quotes", async (req, res) => {
  try {
    const parsed = createQuoteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }

    const { name, phone, email, serviceCategory, description, preferredContact } = parsed.data;

    const [quote] = await db.insert(quotesTable).values({
      name,
      phone,
      email: email ?? null,
      serviceCategory,
      description,
      preferredContact: preferredContact ?? null,
    }).returning();

    res.status(201).json({
      id: quote.id,
      name: quote.name,
      phone: quote.phone,
      email: quote.email ?? null,
      serviceCategory: quote.serviceCategory,
      description: quote.description,
      preferredContact: quote.preferredContact ?? null,
      createdAt: quote.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create quote");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
