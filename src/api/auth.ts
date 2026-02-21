// src/api/auth.ts

export interface APIKey {
  key: string;
  userId: string;
  createdAt: Date;
  expiresAt?: Date;
}

// مخزن المفاتيح - يجب أن يكون متاحاً للجميع
export const apiKeys: Map<string, APIKey> = new Map();

export function generateAPIKey(userId: string): APIKey {
  // إنشاء مفتاح عشوائي
  const key = `gk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

  const now = new Date();
  const apiKey: APIKey = {
    key,
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 يوم
  };

  // حفظ المفتاح في الخريطة
  apiKeys.set(key, apiKey);

  // للتأكد - طباعة المفتاح المضاف
  console.log(`Generated key: ${key} for user: ${userId}`);

  return apiKey;
}

export function getAPIKey(apiKey: string): APIKey | null {
  console.log(`Looking for key: ${apiKey}`);
  console.log(`Current keys in map:`, Array.from(apiKeys.keys()));

  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    console.log("Invalid input");
    return null;
  }

  const key = apiKeys.get(apiKey);

  if (!key) {
    console.log("Key not found");
    return null;
  }

  if (key.expiresAt && key.expiresAt < new Date()) {
    console.log("Key expired");
    apiKeys.delete(apiKey);
    return null;
  }

  console.log("Key found:", key);
  return key;
}

export function validateAPIKey(apiKey: string): boolean {
  return getAPIKey(apiKey) !== null;
}

export function deleteAPIKey(apiKey: string): boolean {
  return apiKeys.delete(apiKey);
}

// تصدير الخريطة أيضاً للاختبارات
export const _test = { apiKeys };
