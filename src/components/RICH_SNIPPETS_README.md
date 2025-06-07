# Rich Snippets Implementation

This setup script has added structured data (rich snippets) to your components for better SEO.

## What was added:

### 1. FAQ Component (`FAQ.tsx`)
- **Schema**: FAQPage
- **Rich Snippet**: FAQ results in search
- **Usage**: Import and use with `faqs` prop

### 2. Testimonial Component (`Testimonial.tsx`)
- **Schema**: Review/AggregateRating
- **Rich Snippet**: Star ratings in search results
- **Usage**: Import and use with `reviews` prop

### 3. ContactSection Component (`ContactSection.tsx`)
- **Schema**: LocalBusiness
- **Rich Snippet**: Business info, hours, location
- **Usage**: Import and use with `business` prop

### 4. ServiceSection Component (`ServiceSection.tsx`)
- **Schema**: Service
- **Rich Snippet**: Services offered
- **Usage**: Import and use with `services` prop

### 5. SocialMedia Component (`SocialMedia.tsx`)
- **Schema**: Organization
- **Rich Snippet**: Social profiles, contact info
- **Usage**: Import and use with `organization` prop

### 6. New Breadcrumbs Component (`Breadcrumbs.tsx`)
- **Schema**: BreadcrumbList
- **Rich Snippet**: Navigation breadcrumbs
- **Usage**: `<Breadcrumbs items={[{name: "Home", url: "/"}]} />`

## How to use:

1. Import the components in your pages
2. Pass appropriate props (or use defaults)
3. Structured data will be automatically injected into `<head>`

## Testing Rich Snippets:

1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Test your URLs after deployment
3. Monitor Google Search Console for rich snippet errors

## Customization:

- Edit the default data in each component
- Use the utility functions in `utils/structuredData.ts`
- Add more schema types as needed

## Backup Files:

Original components were backed up with `.backup` extension before modification.
