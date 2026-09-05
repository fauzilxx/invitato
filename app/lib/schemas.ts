import { z } from "zod";

/**
 * Zod schemas for server-side and client-side validation.
 */

export const rsvpSchema = z.object({
  guest_name: z
    .string()
    .min(1, "Nama tidak boleh kosong")
    .max(100, "Nama terlalu panjang")
    .trim(),
  phone_code: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  attendance: z.enum(["hadir", "tidak_hadir"], {
    message: "Pilih status kehadiran",
  }),
  events: z.array(z.string()).optional(),
  guest_count: z
    .number()
    .int("Jumlah tamu harus bilangan bulat")
    .min(1, "Minimal 1 orang")
    .max(5, "Maksimal 5 orang"),
});

export const wishSchema = z.object({
  name: z
    .string()
    .min(1, "Nama tidak boleh kosong")
    .max(100, "Nama terlalu panjang")
    .trim(),
  message: z
    .string()
    .min(1, "Pesan tidak boleh kosong")
    .max(500, "Pesan maksimal 500 karakter")
    .trim(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type WishInput = z.infer<typeof wishSchema>;
