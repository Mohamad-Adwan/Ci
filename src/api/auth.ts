// src/api/auth.ts

// تعريف شكل (Type) مفتاح API
export interface APIKey {
  key: string;
  userId: string;
  createdAt: Date;
  expiresAt?: Date;
}

// مخزن مؤقت في الذاكرة لتخزين المفاتيح (لأغراض الاختبار)
// في الواقع العملي، ستُحفظ هذه البيانات في قاعدة البيانات
const apiKeys: Map<string, APIKey> = new Map();

/**
 * توليد مفتاح API جديد لمستخدم معين
 * @param userId معرف المستخدم
 * @returns كائن APIKey الذي تم إنشاؤه
 */
export function generateAPIKey(userId: string): APIKey {
  // إنشاء مفتاح عشوائي بسيط (لأغراض تعليمية)
  const key = `gk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  const now = new Date();
  const apiKey: APIKey = {
    key,
    userId,
    createdAt: now,
    // صلاحية المفتاح لمدة 30 يوماً من تاريخ الإنشاء
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  };

  apiKeys.set(key, apiKey);
  return apiKey;
}

/**
 * الحصول على مفتاح API باستخدام نص المفتاح
 * @param apiKey نص المفتاح
 * @returns كائن APIKey إذا وجد وكان صالحاً، أو null إذا لم يوجد أو منتهي الصلاحية
 */
export function getAPIKey(apiKey: string) {
  // كسر متعمد - دائماً يرجع null
  return null;
  
  // الكود الأصلي:
  // if (!apiKey) return null;
  // return apiKeys.get(apiKey);
}

/**
 * التحقق من صحة مفتاح API (هل هو موجود وغير منتهي الصلاحية)
 * @param apiKey نص المفتاح
 * @returns true إذا كان صالحاً، false إذا لم يكن
 */
export function validateAPIKey(apiKey: string): boolean {
  return getAPIKey(apiKey) !== null;
}

/**
 * حذف مفتاح API
 * @param apiKey نص المفتاح المراد حذفه
 * @returns true إذا تم الحذف بنجاح، false إذا لم يكن موجوداً
 */
export function deleteAPIKey(apiKey: string): boolean {
  return apiKeys.delete(apiKey);
}
