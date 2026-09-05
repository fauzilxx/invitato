/**
 * Swagger/OpenAPI specification for the Invitato Wedding Invitation API.
 */
export const apiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Invitato Wedding Invitation API",
    description:
      "Backend API for the Ricky & Felly wedding invitation — handles RSVP submissions and guest wishes. Data is persisted in Supabase (PostgreSQL).",
    version: "1.0.0",
    contact: {
      name: "Fauzil — Full Stack Engineer Candidate",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Next.js API Routes",
    },
  ],
  tags: [
    {
      name: "RSVP",
      description: "Guest attendance confirmation",
    },
    {
      name: "Wishes",
      description: "Guest wishes / congratulatory messages",
    },
  ],
  paths: {
    "/rsvp": {
      post: {
        tags: ["RSVP"],
        summary: "Submit RSVP",
        description:
          "Submit a new guest RSVP with attendance status and party size.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RsvpInput",
              },
              example: {
                guest_name: "John Doe",
                attendance: "hadir",
                guest_count: 2,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "RSVP created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Rsvp" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServerError" },
              },
            },
          },
        },
      },
    },
    "/wishes": {
      get: {
        tags: ["Wishes"],
        summary: "Get wishes list",
        description:
          "Retrieve paginated list of wishes, ordered by most recent.",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1, minimum: 1 },
            description: "Page number",
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10, minimum: 1, maximum: 50 },
            description: "Items per page",
          },
        ],
        responses: {
          "200": {
            description: "Wishes retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Wish" },
                    },
                    total: { type: "integer", example: 42 },
                    page: { type: "integer", example: 1 },
                    limit: { type: "integer", example: 10 },
                  },
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServerError" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Wishes"],
        summary: "Submit a wish",
        description: "Submit a new congratulatory wish/message for the couple.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WishInput" },
              example: {
                name: "Jane Doe",
                message:
                  "Selamat menempuh hidup baru! Semoga bahagia selalu 💕",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Wish created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Wish" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServerError" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RsvpInput: {
        type: "object",
        required: ["guest_name", "attendance", "guest_count"],
        properties: {
          guest_name: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            description: "Guest name",
          },
          attendance: {
            type: "string",
            enum: ["hadir", "tidak_hadir"],
            description: "Attendance status",
          },
          guest_count: {
            type: "integer",
            minimum: 1,
            maximum: 10,
            description: "Number of attendees",
          },
        },
      },
      WishInput: {
        type: "object",
        required: ["name", "message"],
        properties: {
          name: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            description: "Sender name",
          },
          message: {
            type: "string",
            minLength: 1,
            maxLength: 500,
            description: "Wish message",
          },
        },
      },
      Rsvp: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          guest_name: { type: "string" },
          attendance: { type: "string", enum: ["hadir", "tidak_hadir"] },
          guest_count: { type: "integer" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      Wish: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          message: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      ServerError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
        },
      },
    },
  },
};
