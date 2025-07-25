export const PLAN_LIMITS = {
  STARTER: { maxFiles: 5, maxTotalSize: 4 * 1024 * 1024 },
  PROFESSIONAL: { maxFiles: 30, maxTotalSize: 10 * 1024 * 1024 },
  BUSINESS: { maxFiles: 50, maxTotalSize: 200 * 1024 * 1024 },
};

export const PLAN_LIMITS_WM = {
  STARTER: { bgFileSize: 4 * 1024 * 1024, maxTotalSize: 2 * 1024 * 1024 },
  PROFESSIONAL: { bgFileSize: 10 * 1024 * 1024, maxTotalSize: 5 * 1024 * 1024 },
  BUSINESS: { bgFileSize: 200 * 1024 * 1024, maxTotalSize: 20 * 1024 * 1024 },
};
