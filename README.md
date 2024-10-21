# Bruddet ⛰

This is the repository contains Bruddet's frontend and cms application

## .env.local

You will need a .env.local file for the api tokens. Copy and rename the .env file and replace SANITY_EDITOR_TOKEN, SANITY_READ_TOKEN. These tokens are stored in "basen - shared" in 1Password. New tokens can be generated in api/tokens where you manage the Sanity project (https://www.sanity.io/organizations/oY2dfMupw/project/0chpibsu/api#tokens).

## Run project

To run a development version of the project locally run the following command in the root folder:

```
npm run dev
```

This will start Remix in development mode. You can then visit the following URLs:

- [localhost:5173](http://localhost:5173) - The local version of the frontend website

## Remix commands

### Build 🛠️

To build all apps and packages in frontend, run the following command in the root folder:

```
npm run build
```

### Develop 💻

To develop all apps and packages in frontend, run the following command in the root folder:

```
npm run dev
```

### Production

To test frontend build and run in production mode locally, run the following command in the root folder:

```
npm run start
```

## Backend commands

After starting the remix application, the CMS is available at `/studio`

## Making changes in the cms

Navigate to `cms/schematypes`

- `index.ts` contains all the different types and documents that are shown in Sanity Studio.
- `/objects` contains different types that are reused across the different documents

### Apply new changes to Sanity Studio 📂

Inside the root folder, run these commands:

#### 1. Schema extraction

```
npx sanity schema extract
```

##### 2. Generate types from schema

```
npx sanity typegen generate
```

### Dynamic classnames in Tailwind

You can't use dynamic class naming like bg-${color} in Tailwind out of the box with Sanity. When Tailwind compiles the CSS, it checks the code for a class name that matches, but it will only find classes that exist as a complete unbruken string in the source files. Tailwind can't find the dynamic classes at runtime since it does not yet exist. As a workaround, to avoid having to write out all possible combinations in strings with functions and if-sentences (which was done at first, and required lots of code each time a new color-combination was added), we use a Safelist in tailwind.config.js, where we generate the possible combinations of colorsWithVariants and StyleProps so that Tailwind can find them when compiling. This makes it possible to avoid having to write a new function for each styleprop that handles each case of colorcombination.

### Internationalization 🇳🇴🇬🇧

To implement language in a new document type:

- Inside `cms/structure/documentInternationalization.ts` add the new document to schemaTypes

### Singletons 📄

This script will create one or many "singleton" documents for each language. It works by appending the language ID to the document ID and creating the translations.metadata document

1. Take a backup of your dataset with:

```
npx sanity dataset export
```

2. Copy this file to the root of your Sanity Studio project

3. Update the SINGLETONS and LANGUAGES constants to your needs

4. Run the script (replace <schema-type> with the name of your schema type):

```
npx sanity exec ./createSingletons.ts --with-user-token
```

5. Update your desk structure to use the new documents

6. Import the saved dataset:

```
npx sanity dataset import [exported dataset].tar.gz [your chosen dataset] --missing
```

## Frontend 💅

### Add new colors to Tailwind

Open `frontend/tailwind.config.js`:

- Add the hex code and name under `extend: {colors: { ... }}`

### Add new color themes 🎨

Open `frontend/app/utils/colorCombinations.ts`

- Add a new case to all of the functions used

### SVG files

- Find `.svg` graphic components and masks in `frontend/app/assets`
