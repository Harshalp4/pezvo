import { NextResponse } from "next/server";
import { getZones } from "@/lib/api";

/** Small helper for the callback modal's pincode datalist. */
export const revalidate = 3600;

export async function GET() {
  const { zones } = await getZones();
  return NextResponse.json({
    pincodes: zones.map((z) => z.pincode),
    areas: zones.map((z) => ({ pincode: z.pincode, name: z.name })),
  });
}
