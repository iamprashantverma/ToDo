exports.createTaskSchema = {
  body: {
    type: "object",
    required: ["title","deadline"],
    properties: {
      title: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        errorMessage: {
          minLength: "Title must be at least 3 characters",
          maxLength: "Title must not exceed 255 characters",
        },
      },
      deadline: {
        type: "string",
        format: "date", // YYYY-MM-DD
        isFutureDate: true,
        errorMessage: {
          type: "Deadline must be a string",
          format: "Deadline must be in YYYY-MM-DD format",
          isPastDate: "Deadline must be today or a past date",
        },
      },
      completed: {
        type: "boolean",
        default: false,
        errorMessage: {
          type: "Completed must be a boolean value",
        },
      },
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        title: "Title is required",
      },
      additionalProperties: "Extra fields are not allowed",
    },
  },
};
