// Define roles
export const SUPERADMIN = "superadmin"
export const ADMIN = "admin";
export const INSTRUCTOR = "instructor";
export const SCHOOL = "school";
export const USER = "user";


export const RESET_PASSWORD_EXPIRE=3600000   // 1 hour in ms

export const ALLOWED_TABS = [
  "user-management",
  "approval-requests",
  "content",
  "donation-tracking",
  "gallery-approvals",
  "manage-programs",
  "invoice-approvals",
] as const;