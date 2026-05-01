# Image Generation Debugging Guide

## Root Causes Identified

The "Something went wrong while generating the image" error could be caused by:

### 1. **Missing Environment Variables**

Check your `.env.local` file has:

```
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=...
NEXT_IMAGEKIT_PRIVATE_KEY=...
NEXT_IMAGEKIT_URL_ENDPOINT=...
```

### 2. **Database Not Migrated**

The Neon database tables may not exist. Run:

```bash
npm run db:push
```

### 3. **Missing Image Components**

Fixed: Removed imports for non-existent `StudioPreviewPanel` and `HistoryPreviewDialog` from `workbench.tsx`

## Debugging Steps

### Check System Health

Visit `http://localhost:3000/api/health` to see:

- Database connection status
- Environment variables loaded
- Which API keys are configured

### Check Browser Console

1. Open DevTools (F12)
2. Go to Network tab
3. Submit a generation
4. Look for `/api/generate-image` request
5. Click on it and check:
   - **Status**: Should be 200 if successful
   - **Response**: Will show error details in development mode

### Check Logs

1. Check terminal where `npm run dev` is running
2. Look for `generate-image route failed:` messages
3. Error details will show:
   - Database connection errors
   - OpenAI API errors
   - ImageKit upload errors
   - Schema validation errors

## Most Likely Culprits (in order)

1. **DATABASE_URL not set** → Database operations fail silently
2. **Database tables not migrated** → `createGeneration` fails
3. **OPENAI_API_KEY invalid** → Image generation fails
4. **ImageKit credentials missing** → Image upload fails

## What Was Fixed

✅ **Better Error Logging**: Added detailed error logging to `/api/generate-image`
✅ **Database Test Function**: Added `testDatabaseConnection()` helper
✅ **Health Check Endpoint**: New `/api/health` for diagnostics
✅ **Component Imports**: Fixed missing component errors in workbench.tsx

## Next Steps

1. Run `npm run db:push` to migrate the database
2. Verify all environment variables in `.env.local`
3. Visit `/api/health` to confirm configuration
4. Try image generation again
5. Check browser console and server logs for specific error messages
