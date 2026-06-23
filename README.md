# 🎓 College Discovery Platform

A modern, interactive web application for discovering and comparing colleges. Built with Next.js 16, React 19, and TypeScript, featuring a clean UI powered by Tailwind CSS.

🌐 **Live Demo**: [https://college-discovery-platform-two-drab.vercel.app/](https://college-discovery-platform-two-drab.vercel.app/)

## ✨ Features

- **College Discovery**: Browse through a curated list of colleges with detailed information
- **Advanced Filtering**: Filter colleges by type, location, ranking, fees, and more
- **Detailed College Profiles**: View comprehensive information about each institution
- **Compare Colleges**: Side-by-side comparison of multiple colleges
- **Save Favorites**: Bookmark colleges for later review
- **Responsive Design**: Fully responsive UI that works seamlessly across all devices
- **Modern UI/UX**: Clean, intuitive interface with smooth interactions

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2.9](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.9.2](https://www.typescriptlang.org/)
- **UI Library**: [React 19.1.0](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Project Structure

```
Frontend_Project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── colleges/          # API routes for college data
│   │   ├── colleges/
│   │   │   └── [slug]/            # Dynamic college detail pages
│   │   ├── compare/               # College comparison page
│   │   ├── saved/                 # Saved colleges page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── college-card.tsx       # College card component
│   │   ├── college-filters.tsx    # Filter controls
│   │   ├── compare-view.tsx       # Comparison interface
│   │   ├── discovery-dashboard.tsx # Main dashboard
│   │   ├── discovery-provider.tsx # State management
│   │   ├── saved-view.tsx         # Saved colleges view
│   │   ├── site-header.tsx        # Navigation header
│   │   └── ui.tsx                 # Reusable UI components
│   └── lib/
│       ├── college-data.ts        # College data and utilities
│       └── format.ts              # Formatting utilities
├── public/                         # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🛠️ Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/suryareddy57/College-Discovery-Platform.git
   cd College-Discovery-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server

## 🌐 Deployment

This project is configured for deployment on Vercel.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

The application is automatically deployed on every push to the main branch.

## 🎨 Features in Detail

### College Discovery Dashboard
- Grid view of all available colleges
- Real-time filtering and sorting
- Quick access to college details

### Advanced Filters
- College type (Public/Private)
- Location-based filtering
- Ranking ranges
- Fee ranges
- Acceptance rates
- Program availability

### College Comparison
- Compare up to multiple colleges side-by-side
- Key metrics comparison
- Easy-to-read comparison table

### Saved Colleges
- Bookmark favorite colleges
- Persistent storage using local state
- Quick access to saved institutions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Surya Reddy**
- GitHub: [@suryareddy57](https://github.com/suryareddy57)

## 🙏 Acknowledgments

- College data and information for demonstration purposes
- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- Tailwind CSS for the utility-first CSS framework

---

Made with ❤️ using Next.js and React
