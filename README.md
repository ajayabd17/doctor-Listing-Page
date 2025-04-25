# Doctor Listing Page

## Project Overview

This is a **Doctor Listing Page** that allows users to search, filter, and sort a list of doctors fetched from an external API.  
All functionality is handled on the client side, with search/filter state reflected in the URL for seamless navigation and back/forward support.

---

## Tech Stack

- **React** with TypeScript  
- **Vite**  
- **Tailwind CSS**  
- **shadcn/ui** for accessible, styled UI components  

---

## Features

### 🔍 Autocomplete Search
- Top 3 name-based suggestions while typing
- Pressing Enter or clicking a suggestion filters the list
- No suggestions shown if no match found

### 🎛️ Filter Panel
- **Consultation Mode** (Single select): Video Consult / In Clinic  
- **Specialties** (Multi-select): Filter by doctor specialties  
- **Sort Options**: Fees (ascending) or Experience (descending)  

### 🩺 Doctor Listing
- Displays doctor name, specialties, years of experience, and consultation fees
- Data is filtered, sorted, and searched client-side after initial API fetch

### 🔗 URL Sync
- All filters and search state are stored in URL query parameters
- Navigating with browser Back/Forward retains all applied filters

### 🧪 Testing Support
- Follows strict `data-testid` requirements for automated testing compatibility

---

## Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project folder
cd <YOUR_PROJECT_DIRECTORY>

# Install dependencies
npm install

# Start the development server
npm run dev


Let me know if you want to auto-fill `<YOUR_GIT_URL>` or `<YOUR_PROJECT_DIRECTORY>` too!
