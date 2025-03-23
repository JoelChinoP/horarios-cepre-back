export default () => ({
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '',
  CORE_SCHEMA: process.env.CORE_SCHEMA || '',
  CACHE_KEYS: {
    ALL_ADMISSIONS: 'all_admissions',
    CURRENT_ADMISSION: 'current_admission',
  },
});
