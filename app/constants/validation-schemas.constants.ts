import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required!").max(255, "Title is too long!"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(65635, "Description is too long!"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required!")
    .max(255, "Title is too long!")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(65635, "Description is too long!")
    .optional(),
  assignedUserId: z
    .string()
    .min(1, "Assigned user id is required!")
    .max(255, "Assigned user id is too long!")
    .nullable()
    .optional(),
});
