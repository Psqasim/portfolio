# Personal Portfolio Website

## Overview
This repository contains the source code for my personal portfolio website, deployed at [psqasim-portfolio.vercel.app](https://psqasim-portfolio.vercel.app/). The portfolio showcases my professional background, skills, projects, and provides ways to connect with me.

## Features
- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Modern UI/UX**: Clean and professional interface with smooth animations
- **Project Gallery**: Showcase of my recent development work with descriptions
- **Skills Section**: Visual representation of my technical competencies
- **Contact Form**: Direct way for potential clients or employers to reach out
- **Resume/CV**: Downloadable resume for recruiters and hiring managers

## Technologies Used
- **Frontend**: React.js, Next.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Forms**: Form handling with serverless functions
- **Animations**: Framer Motion
- **Icons**: React Icons / Font Awesome

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Installation
1. Clone this repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site in your browser

## Deployment
This portfolio is deployed using [Vercel](https://vercel.com/). The production site automatically updates when changes are pushed to the main branch.

### Manual Deployment
```bash
npm run build
npm run export
# Then deploy the out directory to your hosting provider
```

## Project Structure
```
├── components/         # Reusable UI components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS and styling files
├── lib/                # Utility functions
├── data/               # Static data files
└── ...
```

## Customization
To customize this portfolio for your own use:

1. Update personal information in `data/profile.js`
2. Replace projects in `data/projects.js`
3. Modify skills and experience in their respective data files
4. Replace images in the `public/images` directory
5. Adjust color schemes in the Tailwind configuration

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
For any inquiries, please reach out through the contact form on the website or connect with me at:
- Email: [your-email@example.com](mailto:muhammadqasim0326@gmail.com)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/muhammad-qasim-5bba592b4/)
- GitHub: [Your GitHub](https://github.com/Psqasim)

## Acknowledgements
- Next.js team for the amazing framework
- Vercel for the seamless deployment experience
- All open source contributors whose libraries made this project possible