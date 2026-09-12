<p align="center">
  <img src="public/images/rakitan-logo.png" width="180" alt="Rakitan CMS Logo" />
</p>

<h1 align="center">Rakitan CMS</h1>

<p align="center">
  <strong>The Next-Generation Modular Open-Source CMS & Component-Driven Visual Builder</strong>
</p>

<p align="center">
  <a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 11" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18%2F19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://inertiajs.com"><img src="https://img.shields.io/badge/Inertia.js-v2-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License" /></a>
  <a href="#contributing"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" /></a>
</p>

---

## 🌟 Overview & Vision

**Rakitan** (*Indonesian for "Assembly" or "Custom Build"*) is a modern, modular, open-source Content Management System designed to rival legacy systems like WordPress. 

Traditional CMS platforms often burden servers with hundreds of conflicting plugins, bloated databases, and fragile themes. **Rakitan** replaces this fragility with a **puzzle-like, component-driven visual builder**:
- Every content block is an isolated, reusable React component with its own validated props, default state, and live inspector.
- Page layouts and configurations are saved as clean, normalized JSON structures in MySQL.
- Public pages render dynamically with instant server-side data fetching and lightweight client hydration.
- Built-in WordPress-compatible XML export and import tools allow seamless data migration.

> 📢 **Rakitan is 100% Free and Open Source.** We are actively building an open community of developers, designers, and creators to shape the future of modular web publishing. We warmly welcome your contributions!

---

## 🚀 Key Features

### 1. 🧩 The "Puzzle Core" (Extensible Block Registry)
- **Zero-Bloat Architecture**: Blocks are self-contained modules (`resources/js/Blocks/Definitions/`) registered in a central registry (`registry.js`).
- **6 Built-in Production Blocks**:
  - 🌟 **Hero Section**: Dual action buttons, badge pill, gradient / solid / custom image backgrounds, and alignment controls.
  - ⚡ **Feature Grid**: 2, 3, or 4 responsive columns with dynamic Lucide icons, badges, and titles.
  - 📝 **Rich Text / Article**: Clean typography, drop cap toggle, container width options, and built-in XSS sanitization via `DOMPurify`.
  - 🖼️ **Media Gallery**: Image showcase grid with hover captions and smooth scale animations.
  - 📢 **Call to Action (CTA)**: High-conversion closing banner with gradient, boxed card, or minimalist themes.
  - 📏 **Spacer & Divider**: Vertical whitespace controller and customizable decorative separator lines.

### 2. 🎨 Drag-and-Drop Visual Page Builder
- **Powered by `@dnd-kit`**: Smooth, accessible vertical sorting and reordering.
- **3-Panel Layout**:
  - **Left Panel**: Puzzle Palette (filter by category, live search) & Page Structure Outline Tree.
  - **Center Canvas**: Interactive live preview canvas with instant reorder, duplicate, delete, and move actions.
  - **Right Panel**: Sleek, high-contrast dark inspector for editing block properties, styles, and page-level SEO metadata.
- **Responsive Viewport Switcher**: Instantly preview how pages look on **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)**.
- **Undo / Redo & Live Status**: Multi-step history management with saving indicators.

### 3. ⚡ Dynamic Public Rendering & Catch-All Routing
- Catch-all dynamic routing in Laravel (`/{slug?}`) fetches page data and resolves blocks instantly.
- Automated SEO metadata injection via Inertia `<Head>` (`meta_title`, `meta_description`).
- Clean public layout with responsive navigation and footer.

### 4. 📦 Data Migration Tools (WordPress-Compatible XML)
- **Export to XML**: Exports all pages or filtered pages (published/draft) into a standard WXR (WordPress eXtended RSS) XML file.
- **Import from XML**: Upload any standard WordPress export XML or Rakitan XML file. Standard WordPress posts are automatically converted into modular Rich Text blocks!

### 5. 🛡️ Enterprise-Grade Security
- Strict server-side input validation and CSRF token protection on all mutative requests.
- Strict XSS sanitization via `DOMPurify` for user-supplied HTML content.
- Hardened XML parsing with external entity expansion disabled.
- Fully isolated automated test suite that never touches production database tables.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | [Laravel 11.x](https://laravel.com) (PHP 8.2+) |
| **Frontend Adapter** | [Inertia.js v2](https://inertiajs.com) (React 18/19) |
| **Styling & Theme** | [Tailwind CSS v3](https://tailwindcss.com) with native dark mode |
| **Drag & Drop Engine** | [@dnd-kit/core](https://dndkit.com), `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Database** | MySQL / MariaDB (utilizing native JSON columns) |
| **Sanitization** | [DOMPurify](https://github.com/cure53/DOMPurify) |

---

## 📦 Getting Started

### Prerequisites
- PHP >= 8.2 (`pdo_mysql`, `mbstring`, `openssl`, `xml`, `tokenizer`)
- Composer >= 2.0
- Node.js >= 18 & npm
- MySQL / MariaDB server

### 1. Clone & Environment Setup
```bash
git clone https://github.com/your-org/rakitan.git
cd rakitan

# Copy environment template
cp .env.example .env

# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### 2. Configure Database
Update `.env` with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_rakitan
DB_USERNAME=root
DB_PASSWORD=password
```

### 3. Generate App Key & Run Initial Migration
```bash
php artisan key:generate
php artisan migrate
```

### 4. Seed Demo Content
Populate initial demo pages (Homepage, About page, and administrator account):
```bash
php artisan db:seed
```

### 5. Start Development Servers
Start the Laravel API server:
```bash
php artisan serve --port=8000
```

In a separate terminal, start the Vite development server:
```bash
npm run dev
```

Visit the application in your browser:
- **Public Website**: [http://localhost:8000/](http://localhost:8000/)
- **Admin Dashboard**: [http://localhost:8000/admin/dashboard](http://localhost:8000/admin/dashboard)
- **Visual Builder**: [http://localhost:8000/admin/pages/1/builder](http://localhost:8000/admin/pages/1/builder)
- **Login Page**: [http://localhost:8000/login](http://localhost:8000/login)

### 🔑 Default Administrator Credentials
- **Email**: `admin@rakitan.test`
- **Password**: `password`

---

## 🧩 Building Custom Blocks (Developer Guide)

Creating a new block in Rakitan takes only a few minutes. Follow this 3-step pattern:

### Step 1: Create the Block Component
Create a new file in `resources/js/Blocks/Definitions/TestimonialBlock.jsx`:

```jsx
import React from 'react';
import { Quote } from 'lucide-react';

// 1. Visual Rendering Component (Used in Canvas & Public View)
export const TestimonialComponent = ({ props = {} }) => {
    const { quote = 'Rakitan transformed our publishing pipeline.', author = 'Jane Doe', role = 'CTO' } = props;

    return (
        <section className="py-16 px-6 bg-slate-900 text-center text-white">
            <Quote className="w-8 h-8 mx-auto text-indigo-400 mb-4 opacity-70" />
            <p className="text-xl font-medium max-w-2xl mx-auto mb-4 italic">"{quote}"</p>
            <p className="text-sm font-bold text-white">{author}</p>
            <p className="text-xs text-slate-400">{role}</p>
        </section>
    );
};

// 2. Inspector Settings Component (Used in Right Sidebar)
export const TestimonialSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Quote Text</label>
                <textarea
                    rows={3}
                    value={props.quote || ''}
                    onChange={(e) => updateProps({ quote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Author Name</label>
                <input
                    type="text"
                    value={props.author || ''}
                    onChange={(e) => updateProps({ author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Author Role / Company</label>
                <input
                    type="text"
                    value={props.role || ''}
                    onChange={(e) => updateProps({ role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>
    );
};
```

### Step 2: Register in `registry.js`
Open `resources/js/Blocks/registry.js` and add your block:

```javascript
import { Quote } from 'lucide-react';
import { TestimonialComponent, TestimonialSettings } from './Definitions/TestimonialBlock';

export const BLOCK_REGISTRY = {
    // ... existing blocks ...
    testimonial: {
        type: 'testimonial',
        label: 'Testimonial',
        category: 'Content',
        icon: Quote,
        description: 'Customer or partner quote with author credits.',
        defaultProps: {
            quote: 'Rakitan made page assembly delightful.',
            author: 'Jane Doe',
            role: 'Product Lead',
        },
        Component: TestimonialComponent,
        SettingsComponent: TestimonialSettings,
    },
};
```

### Step 3: Enjoy!
Open the Visual Builder (`/admin/pages/{id}/builder`). Your new block will automatically appear in the **Puzzle Palette** under the **Content** category and can be dragged directly onto the canvas!

---

## 🧪 Automated Testing

Rakitan includes a dedicated feature test suite that validates page rendering, authentication, builder mutation, settings, and XML migration without altering database schemas:

```bash
./vendor/bin/phpunit tests/Feature/RakitanCmsTest.php
```

All 9 tests with 62 assertions execute in under 0.5s.

---

## 🤝 Contributing to Rakitan

We believe the future of content management belongs to open, community-driven software. Whether you are fixing bugs, improving documentation, designing new block templates, or optimizing performance, **your contribution is deeply appreciated!**

### How You Can Help:
1. **⭐ Star & Share**: Help spread the word about Rakitan to developers looking for a modern WordPress alternative.
2. **🧩 Build New Blocks**: Create community blocks (e.g., Pricing Tables, FAQ accordions, Newsletter forms, Video embeds) and submit a pull request.
3. **🐛 Report Issues**: Found a bug or have a suggestion? Open an issue on our tracker with detailed steps to reproduce.
4. **🎨 Enhance Themes & UX**: Help polish accessibility, dark mode aesthetics, and micro-interactions.

### Development Workflow:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-block`).
3. Commit your changes (`git commit -m 'feat: add pricing table block'`).
4. Push to the branch (`git push origin feature/amazing-block`).
5. Open a Pull Request with a clear summary and screenshots.

---

## 📜 License

Rakitan CMS is open-source software licensed under the [MIT License](LICENSE). Feel free to use it for personal projects, commercial client websites, and SaaS applications.
