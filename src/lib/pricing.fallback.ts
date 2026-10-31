import type { Service, ServiceZone, Store } from "./types";

/**
 * Local mirror of the live catalogue, snapshotted from the real API on 2026-08-08.
 *
 * Used ONLY when the API call fails — the backend runs on Render's free tier and
 * sleeps, so a cold build would otherwise ship a broken pricing page. Refresh this
 * file whenever the rate card changes materially; the site prefers live data always.
 */

export const FALLBACK_SERVICES: Service[] = [
  {
    "id": "60000000-0000-0000-0000-000000000001",
    "name": "Dry Clean",
    "description": "Premium dry cleaning for garments",
    "category": "clothes",
    "pricePerPiece": 79.0,
    "iconUrl": null,
    "emoji": "\u2728",
    "sortOrder": 1,
    "garmentTypes": [
      {
        "id": "70000000-0000-0001-0000-000000000001",
        "name": "Shirt",
        "emoji": null,
        "priceOverride": 79.0,
        "sortOrder": 1
      },
      {
        "id": "70000000-0000-0001-0000-000000000002",
        "name": "Pant",
        "emoji": null,
        "priceOverride": 79.0,
        "sortOrder": 2
      },
      {
        "id": "70000000-0000-0001-0000-000000000003",
        "name": "Jeans",
        "emoji": null,
        "priceOverride": 99.0,
        "sortOrder": 3
      },
      {
        "id": "70000000-0000-0001-0000-000000000004",
        "name": "Blazer (Normal)",
        "emoji": null,
        "priceOverride": 229.0,
        "sortOrder": 4
      },
      {
        "id": "70000000-0000-0001-0000-000000000005",
        "name": "Blazer (Heavy)",
        "emoji": null,
        "priceOverride": 259.0,
        "sortOrder": 5
      },
      {
        "id": "70000000-0000-0001-0000-000000000006",
        "name": "Saree (Normal)",
        "emoji": null,
        "priceOverride": 169.0,
        "sortOrder": 6
      },
      {
        "id": "70000000-0000-0001-0000-000000000007",
        "name": "Saree (Heavy)",
        "emoji": null,
        "priceOverride": 209.0,
        "sortOrder": 7
      },
      {
        "id": "70000000-0000-0001-0000-000000000008",
        "name": "Saree (Diamond)",
        "emoji": null,
        "priceOverride": 249.0,
        "sortOrder": 8
      },
      {
        "id": "70000000-0000-0001-0000-000000000009",
        "name": "Saree (Navvari)",
        "emoji": null,
        "priceOverride": 199.0,
        "sortOrder": 9
      },
      {
        "id": "70000000-0000-0001-0000-00000000000a",
        "name": "Blouse / Top",
        "emoji": null,
        "priceOverride": 49.0,
        "sortOrder": 10
      },
      {
        "id": "70000000-0000-0001-0000-00000000000b",
        "name": "Lehenga/Gown/Anarkali (Normal)",
        "emoji": null,
        "priceOverride": 309.0,
        "sortOrder": 11
      },
      {
        "id": "70000000-0000-0001-0000-00000000000c",
        "name": "Lehenga/Gown/Anarkali (Heavy)",
        "emoji": null,
        "priceOverride": 509.0,
        "sortOrder": 12
      },
      {
        "id": "70000000-0000-0001-0000-00000000000d",
        "name": "Sherwani",
        "emoji": null,
        "priceOverride": 309.0,
        "sortOrder": 13
      },
      {
        "id": "70000000-0000-0001-0000-00000000000e",
        "name": "Tie",
        "emoji": null,
        "priceOverride": 59.0,
        "sortOrder": 14
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000002",
    "name": "Steam Press",
    "description": "Light steam press, no wash",
    "category": "clothes",
    "pricePerPiece": 19.0,
    "iconUrl": null,
    "emoji": "\u2668\ufe0f",
    "sortOrder": 2,
    "garmentTypes": [
      {
        "id": "70000000-0000-0002-0000-000000000001",
        "name": "Shirt",
        "emoji": null,
        "priceOverride": 19.0,
        "sortOrder": 1
      },
      {
        "id": "70000000-0000-0002-0000-000000000002",
        "name": "Pant",
        "emoji": null,
        "priceOverride": 19.0,
        "sortOrder": 2
      },
      {
        "id": "70000000-0000-0002-0000-000000000003",
        "name": "Jeans",
        "emoji": null,
        "priceOverride": 29.0,
        "sortOrder": 3
      },
      {
        "id": "70000000-0000-0002-0000-000000000004",
        "name": "Blazer",
        "emoji": null,
        "priceOverride": 69.0,
        "sortOrder": 4
      },
      {
        "id": "70000000-0000-0002-0000-000000000005",
        "name": "Saree (Normal)",
        "emoji": null,
        "priceOverride": 59.0,
        "sortOrder": 5
      },
      {
        "id": "70000000-0000-0002-0000-000000000006",
        "name": "Saree (Heavy)",
        "emoji": null,
        "priceOverride": 79.0,
        "sortOrder": 6
      },
      {
        "id": "70000000-0000-0002-0000-000000000007",
        "name": "Saree (Diamond)",
        "emoji": null,
        "priceOverride": 109.0,
        "sortOrder": 7
      },
      {
        "id": "70000000-0000-0002-0000-000000000008",
        "name": "Saree (Navvari)",
        "emoji": null,
        "priceOverride": 109.0,
        "sortOrder": 8
      },
      {
        "id": "70000000-0000-0002-0000-000000000009",
        "name": "Saree (Roll Press)",
        "emoji": null,
        "priceOverride": 109.0,
        "sortOrder": 9
      },
      {
        "id": "70000000-0000-0002-0000-00000000000a",
        "name": "Blouse / Top",
        "emoji": null,
        "priceOverride": 19.0,
        "sortOrder": 10
      },
      {
        "id": "70000000-0000-0002-0000-00000000000b",
        "name": "Kids Cloth (Below 12)",
        "emoji": null,
        "priceOverride": 19.0,
        "sortOrder": 11
      },
      {
        "id": "70000000-0000-0002-0000-00000000000c",
        "name": "Lehenga/Gown/Anarkali",
        "emoji": null,
        "priceOverride": 149.0,
        "sortOrder": 12
      },
      {
        "id": "70000000-0000-0002-0000-00000000000d",
        "name": "Sherwani",
        "emoji": null,
        "priceOverride": 229.0,
        "sortOrder": 13
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000003",
    "name": "Home Linen",
    "description": "Blankets, bedsheets, curtains & covers",
    "category": "home_linen",
    "pricePerPiece": 49.0,
    "iconUrl": null,
    "emoji": "\ud83d\udecf\ufe0f",
    "sortOrder": 3,
    "garmentTypes": [
      {
        "id": "70000000-0000-0003-0000-000000000001",
        "name": "Blanket (Single)",
        "emoji": null,
        "priceOverride": 259.0,
        "sortOrder": 1
      },
      {
        "id": "70000000-0000-0003-0000-000000000002",
        "name": "Blanket (Double)",
        "emoji": null,
        "priceOverride": 309.0,
        "sortOrder": 2
      },
      {
        "id": "70000000-0000-0003-0000-000000000003",
        "name": "Bedsheet (Single)",
        "emoji": null,
        "priceOverride": 159.0,
        "sortOrder": 3
      },
      {
        "id": "70000000-0000-0003-0000-000000000004",
        "name": "Bedsheet (Double)",
        "emoji": null,
        "priceOverride": 259.0,
        "sortOrder": 4
      },
      {
        "id": "70000000-0000-0003-0000-000000000005",
        "name": "Curtain",
        "emoji": null,
        "priceOverride": 49.0,
        "sortOrder": 5
      },
      {
        "id": "70000000-0000-0003-0000-000000000006",
        "name": "Pillow Cover",
        "emoji": null,
        "priceOverride": 49.0,
        "sortOrder": 6
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000004",
    "name": "Shoe Cleaning",
    "description": "Wash + deodorise, 48\u201372h turnaround",
    "category": "specialty",
    "pricePerPiece": 249.0,
    "iconUrl": null,
    "emoji": "\ud83d\udc5f",
    "sortOrder": 4,
    "garmentTypes": [
      {
        "id": "70000000-0000-0004-0000-000000000001",
        "name": "Shoes Wash",
        "emoji": null,
        "priceOverride": 249.0,
        "sortOrder": 1
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000005",
    "name": "Leather Care",
    "description": "Leather jackets & accessories",
    "category": "specialty",
    "pricePerPiece": 399.0,
    "iconUrl": null,
    "emoji": "\ud83e\udde5",
    "sortOrder": 5,
    "garmentTypes": [
      {
        "id": "70000000-0000-0005-0000-000000000001",
        "name": "Leather Jacket",
        "emoji": null,
        "priceOverride": 399.0,
        "sortOrder": 1
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000006",
    "name": "Soft Toy Cleaning",
    "description": "Sanitised wash by size",
    "category": "specialty",
    "pricePerPiece": 49.0,
    "iconUrl": null,
    "emoji": "\ud83e\uddf8",
    "sortOrder": 6,
    "garmentTypes": [
      {
        "id": "70000000-0000-0006-0000-000000000001",
        "name": "Soft Toy (Small)",
        "emoji": null,
        "priceOverride": 49.0,
        "sortOrder": 1
      },
      {
        "id": "70000000-0000-0006-0000-000000000002",
        "name": "Soft Toy (Medium)",
        "emoji": null,
        "priceOverride": 99.0,
        "sortOrder": 2
      },
      {
        "id": "70000000-0000-0006-0000-000000000003",
        "name": "Soft Toy (Large)",
        "emoji": null,
        "priceOverride": 149.0,
        "sortOrder": 3
      }
    ],
    "treatments": []
  },
  {
    "id": "60000000-0000-0000-0000-000000000007",
    "name": "Carpet & Sofa",
    "description": "Per sqft / per seat",
    "category": "specialty",
    "pricePerPiece": 49.0,
    "iconUrl": null,
    "emoji": "\ud83d\udecb\ufe0f",
    "sortOrder": 7,
    "garmentTypes": [
      {
        "id": "70000000-0000-0007-0000-000000000001",
        "name": "Carpet (per sqft)",
        "emoji": null,
        "priceOverride": 49.0,
        "sortOrder": 1
      },
      {
        "id": "70000000-0000-0007-0000-000000000002",
        "name": "Sofa Cover (per seat)",
        "emoji": null,
        "priceOverride": 99.0,
        "sortOrder": 2
      }
    ],
    "treatments": []
  }
];

export const FALLBACK_ZONES: ServiceZone[] = [
  {
    "id": "84abf8eb-fca1-48d6-9f0e-b6db94a3acba",
    "name": "Kharghar / Belapur",
    "pincode": "400706",
    "city": "Navi Mumbai",
    "area": null,
    "description": null,
    "isActive": true,
    "sortOrder": 0,
    "assignedStoreId": null,
    "assignedStoreName": null,
    "createdAt": "2026-04-26T10:15:59.499012Z",
    "updatedAt": "2026-04-26T10:15:59.499012Z"
  },
  {
    "id": "9c4322a6-8840-42e1-8e91-d4c763fbba02",
    "name": "Nerul / Seawoods",
    "pincode": "400705",
    "city": "Navi Mumbai",
    "area": null,
    "description": null,
    "isActive": true,
    "sortOrder": 0,
    "assignedStoreId": null,
    "assignedStoreName": null,
    "createdAt": "2026-04-26T10:16:02.037322Z",
    "updatedAt": "2026-04-26T10:16:02.037322Z"
  },
  {
    "id": "de6ea2ff-3383-4aa3-8119-db2b3bbcdeea",
    "name": "Vashi",
    "pincode": "400614",
    "city": "Navi Mumbai",
    "area": null,
    "description": null,
    "isActive": true,
    "sortOrder": 0,
    "assignedStoreId": null,
    "assignedStoreName": null,
    "createdAt": "2026-04-26T10:16:00.916811Z",
    "updatedAt": "2026-04-26T10:16:00.916811Z"
  }
];

export const FALLBACK_STORES: Store[] = [
  {
    "id": "e1111111-1111-1111-1111-111111111111",
    "name": "PEZVO Mahape Unit",
    "addressLine1": "MIDC Industrial Area",
    "addressLine2": null,
    "city": "Navi Mumbai",
    "state": "Maharashtra",
    "pincode": "400709",
    "latitude": 19.1136,
    "longitude": 73.0082,
    "phone": "+91 0000000000",
    "email": null,
    "googleMapsUrl": null,
    "openTime": "08:00:00",
    "closeTime": "20:00:00",
    "isOpenSunday": false,
    "serviceRadiusKm": 5,
    "isActive": true,
    "isHeadquarters": true
  }
];

/** Stamp shown in the UI when the site is running on mirrored data. */
export const FALLBACK_SNAPSHOT_DATE = "2026-08-08";
