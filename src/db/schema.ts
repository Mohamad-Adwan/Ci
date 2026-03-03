export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
}, (table) => ({
  // هذا يضمن عدم محاولة إنشاء الجدول إذا كان موجوداً
}));
