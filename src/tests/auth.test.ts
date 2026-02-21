import { describe, expect, test, beforeEach, afterEach } from "vitest";
import {
  generateAPIKey,
  getAPIKey,
   apiKeys,
  APIKey,
} from "../api/auth.js";

describe("API Key Functions", () => {
  const testUserId = "test-user-123";
  let generatedKey: APIKey;

  beforeEach(() => {
    // تنظيف الخريطة قبل كل اختبار
    apiKeys.clear();

    // إنشاء مفتاح جديد
    generatedKey = generateAPIKey(testUserId);
    console.log("BeforeEach - Generated key:", generatedKey);
  });

  afterEach(() => {
    // تنظيف بعد كل اختبار
    apiKeys.clear();
  });

  test("getAPIKey should return valid key", () => {
    console.log("Test - Looking for key:", generatedKey.key);

    const result = getAPIKey(generatedKey.key);

    console.log("Test - Result:", result);

    expect(result).toBeDefined();
    expect(result?.userId).toBe(testUserId);
    expect(result?.key).toBe(generatedKey.key);
  });

  test("getAPIKey should return null for invalid key", () => {
    const result = getAPIKey("invalid-key-123");
    expect(result).toBeNull();
  });

  test("getAPIKey should handle empty string", () => {
    const result1 = getAPIKey("");
    expect(result1).toBeNull();

    const result2 = getAPIKey("   ");
    expect(result2).toBeNull();
  });
});
