This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## LinkedIn Data Processing

This project includes a tool to process LinkedIn data exports and generate structured data for the Experience page.

### Exporting Your LinkedIn Data

1. Go to your LinkedIn account settings
2. Click on "Data privacy"
3. Click on "Get a copy of your data"
4. Select "Want something in particular?" option
5. Check the following data files:
   - Profile
   - Positions
   - Education
   - Skills
   - Rich Media
6. Request the archive and download it when available

### Processing the LinkedIn Data

1. Create a directory `.brain/linkedInDataExport` in the project root
2. Extract the LinkedIn data ZIP file and place the CSV files in this directory
3. Run the processing script:

```bash
pnpm process-linkedin
```

4. This will:
   - Parse the CSV files
   - Extract profile information, work experience, education, and skills
   - Attempt to download media files (profile photo, etc.)
   - Generate placeholder images for companies and schools
   - Save structured JSON data in `src/data/`

### Advanced Options

The LinkedIn data processing script includes several advanced options:

#### Using LinkedIn Authentication

To download media directly from LinkedIn (which often requires authentication):

1. Log in to LinkedIn in your browser
2. Use browser developer tools to export cookies to JSON:
   - Chrome: DevTools > Application > Storage > Cookies > Right-click > Save all cookies as JSON
   - Firefox: DevTools > Storage > Cookies > Export
3. Save the cookies file to `.brain/linkedin-cookies.json`
4. Edit the `CONFIG.useAuthentication` option in the script to `true`

#### Company Logo Generation

The script will generate visually appealing letter avatars for companies and schools:

- Each letter avatar uses a color from LinkedIn's color palette
- The first letter of the company/school name is displayed prominently
- The script ensures consistent styling across all avatars

> **Note:** The script previously supported the Clearbit Logo API for company logos, but this service has been deprecated and is no longer available. Letter avatars are now used as the primary fallback when direct downloads fail.

#### Troubleshooting

If you encounter issues with media downloads:

1. Enable verbose logging by setting `CONFIG.verbose = true` in the script
2. Check for debug screenshots in the project root directory
3. Try using LinkedIn authentication as described above
4. If all else fails, the script will generate letter avatars as placeholders
