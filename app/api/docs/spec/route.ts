import { apiSpec } from "@/app/lib/swagger";
import { NextResponse } from "next/server";

/**
 * GET /api/docs/spec
 * Serve OpenAPI JSON spec untuk Swagger UI.
 */
export async function GET() {
  return NextResponse.json(apiSpec);
}
