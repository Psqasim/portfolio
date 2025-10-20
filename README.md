# Muhammad Qasim's Portfolio

Welcome to my personal portfolio website! This project showcases my skills, projects, and experience as a Frontend Developer and Python enthusiast. Built with modern web technologies, it features a dynamic and interactive user experience.

## Features

- **Dynamic Content powered by Sanity.io**: All major sections, including my profile, skills, projects, and contact messages, are managed through Sanity.io, a headless CMS. This allows for easy content updates without touching the codebase.
- **Responsive Design**: The website is fully responsive, ensuring a seamless experience across desktops, tablets, and mobile devices.
- **Interactive UI/UX**: Leveraging `Framer Motion` for smooth animations and transitions, providing an engaging user interface.
- **Theme Toggle**: Users can switch between Light, Dark, and System themes for a personalized browsing experience.
- **Project Showcase**: A dedicated section to display my portfolio projects, complete with filtering, search functionality, and detailed modal views for each project.
- **Skills Section**: Highlights my technical proficiencies with categorized skills, proficiency levels, and interactive cards.
- **Contact Form**: A functional contact form that allows visitors to send messages directly to me, with data securely stored in Sanity.io.
- **Preloader**: A custom, full-screen animated preloader with glitch effects, particles, and a progress bar, creating a unique and engaging entry point to the site.

## Technologies Used

- **Next.js**: React framework for production-grade applications.
- **TypeScript**: Strongly typed JavaScript for enhanced code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
- **Sanity.io**: Headless CMS for flexible content management.
- **Framer Motion**: A production-ready motion library for React to power animations.
- **Lucide-React & React Icons**: A comprehensive set of customizable SVG icons.
- **Next-Themes**: For managing and persisting theme preferences (Light/Dark/System).

## Animations & Interactive Elements

This portfolio is designed with a strong emphasis on visual appeal and interactivity:

- **Dynamic Preloader**: A captivating initial loading screen featuring glitch text effects, particle animations, and a progress bar, setting an engaging tone.
- **Smooth Section Transitions**: Sections like "Hero," "About," "Contact," and "Projects" gracefully animate into view using `Framer Motion`'s `whileInView` and `initial` properties, creating a fluid scrolling experience.
- **Interactive Cards**: Project and Skill cards respond to user interaction with subtle hover effects, including scaling, shadow changes, and border highlights, adding a layer of polish.
- **Animated Navigation**: The Navbar provides smooth scrolling to sections, a dynamic theme toggle, and a mobile menu that slides in with a custom CSS animation.
- **Social Link Interactions**: Social media icons in the footer feature `Framer Motion`'s `whileHover` effects, providing visual feedback on interaction.
- **Hero Section Dynamics**: The hero section includes animated text elements, such as a pulsing effect on the name, drawing attention to key information.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Psqasim/your-portfolio-repo.git
    cd your-portfolio-repo
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Sanity.io**: 
    - Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage).
    - Configure your `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN` in a `.env.local` file.
    - Run `npm run dev` to start the Sanity Studio and import your schemas.

4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured for deployment on platforms like Vercel. Ensure your environment variables for Sanity.io are correctly set up in your deployment environment.

## Contact

Feel free to reach out to me via the contact form on the website or connect with me on LinkedIn/GitHub.

---

© {new Date().getFullYear()} Muhammad Qasim. All rights reserved.