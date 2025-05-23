# HackFlow: Your AI-Powered Hackathon Co-Pilot

**HackFlow** is an innovative platform designed to supercharge the hackathon experience. It leverages cutting-edge AI to guide participants through every stage, from discovering relevant hackathons and generating groundbreaking ideas to visualizing project flows, collaborating with teammates, and analyzing competitive landscapes.

**Live Demo:** [Link to Your Deployed Application]  
**Video Demo:** [Link to Your Video Demonstration]

## Inspiration

Hackathons are vibrant hubs of innovation, but participants often face significant hurdles:

- **Idea Paralysis:** Struggling to brainstorm unique and viable project ideas.
- **Information Overload:** Difficulty finding the right hackathons aligned with their interests.
- **Team Formation Challenges:** Finding skilled and compatible teammates.
- **Project Planning:** Structuring project architecture and milestones effectively.
- **Resource Discovery:** Identifying the best tools, APIs, and datasets.
- **Competitive Edge:** Understanding how to make their project stand out.

HackFlow was born out of a desire to solve these challenges by providing an intelligent, all-in-one platform that empowers both novice and experienced hackathon participants to innovate, collaborate, and succeed.

## What it Does (Core Features)

HackFlow offers a suite of AI-driven tools to streamline the hackathon lifecycle:

1. **AI Hackathon Finder:**
   - Leverages Perplexity AI (Sonar Pro) to deliver personalized hackathon listings from major platforms like Devpost, Devfolio, DoraHacks, and more, based on user interests and themes.
2. **AI Idea Generator:**
   - Utilizes Perplexity AI (Sonar Deep Research) to transform simple user inputs or problem statements into comprehensive project overviews, complete with suggested use cases, features, and potential tech stacks.
3. **Project Flowchart Generator:**
   - Automatically visualizes AI-generated project ideas or user-defined project structures into interactive flowcharts using React Flow, helping users understand project architecture, modules, and dependencies.
4. **Competitive Analysis (Conceptual):**
   - (Future Vision/Implemented if applicable) AI-powered analysis to compare a user's project against past winning submissions, offering insights on uniqueness, impact, and areas for improvement.
5. **AI Resource Hub:**
   - Provides AI-driven recommendations for APIs, datasets, development tools, and learning resources relevant to the user's project theme and chosen technologies.
6. **Team Collaboration & Management:**
   - **Team Formation:** Tools to help users find potential teammates based on skills, interests, and availability, or create and manage their own teams. Includes team profile creation.
   - **Real-Time Team Chat:** Integrated chat functionality using Socket.IO for seamless communication and collaboration among team members.
7. **Secure User Authentication:**
   - Managed by Clerk, providing robust and easy-to-use sign-up, sign-in, and user management capabilities.

## How We Built It

HackFlow is a full-stack application built with a modern, scalable, and AI-first approach.

**Tech Stack:**

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **UI Components:** Shadcn UI, Lucide Icons
- **State Management:** React Context, `useState`, `useEffect`
- **Routing:** Next.js App Router
- **Visualization:** React Flow (for project flowcharts)
- **Backend/API:** Next.js API Routes (Serverless Functions)
- **AI Integration:**
  - **Perplexity API:**
    - `sonar-pro` for hackathon finding, resource recommendations.
    - `sonar-deep-research` (or similar) for in-depth idea generation.
- **Database:** NeonDB (Serverless PostgreSQL)
- **ORM:** Prisma
- **Real-Time Communication:** Socket.IO (for team chat)
- **Authentication:** Clerk (for user sign-up, sign-in, and management)
- **Deployment:** (Specify your deployment platform, e.g., Vercel, Netlify)

**Key Integrations & Architecture:**

- **Perplexity API:** Core for all AI-driven features, providing the intelligence for search, generation, and recommendations.
- **Clerk:** Handles all user authentication, ensuring secure access to user-specific data and team features.
- **NeonDB & Prisma:** Provides a robust and scalable serverless PostgreSQL database solution, with Prisma as the ORM for type-safe database access.
- **Socket.IO:** Enables real-time, bidirectional communication for the team chat feature.
- **Next.js App Router:** Structures the application with clear separation of concerns, server components, and client components for optimal performance.

## Challenges We Ran Into

- **AI Prompt Engineering:** Crafting effective prompts for the Perplexity API to ensure accurate, relevant, and consistently formatted JSON responses was an iterative process.
- **Real-Time Synchronization:** Implementing Socket.IO for team chat required careful handling of connection states, message broadcasting, and ensuring a smooth user experience across multiple clients.
- **Database Migration & Setup:** (If applicable, e.g., "Initially exploring other DB solutions before settling on NeonDB and configuring it with Prisma.") Ensuring the NeonDB and Prisma setup was correct for both pooled and direct connections.
- **Integrating Multiple Services:** Orchestrating Clerk for authentication, Perplexity for AI, Socket.IO for real-time, and NeonDB for data storage into a cohesive platform.
- **UI/UX for AI Features:** Designing an intuitive user interface that seamlessly integrates various AI outputs (like generated ideas, flowcharts, and resource lists) without overwhelming the user.

## Accomplishments That We're Proud Of

- Successfully integrating multiple AI functionalities from Perplexity to create a truly intelligent hackathon assistant.
- Building a real-time team chat feature from scratch using Socket.IO.
- Implementing a robust backend with NeonDB and Prisma for reliable data management.
- Creating a user-friendly interface that simplifies complex hackathon tasks.
- The modular architecture allows for easy expansion of features in the future.

## What We Learned

- Advanced techniques in AI prompt engineering and parsing varied AI responses.
- Full-stack development with Next.js 14+ (App Router), TypeScript, and Tailwind CSS.
- Database design and ORM usage with Prisma and serverless PostgreSQL (NeonDB).
- Implementing real-time communication systems with Socket.IO.
- Secure user authentication and management using Clerk.
- The importance of a well-structured project for integrating diverse services and APIs.

## What's Next for HackFlow

- **Enhanced Competitive Analysis:** Fully develop the AI-powered competitive analysis feature.
- **Presentation Builder:** Add a module to help users generate outlines or slides for their hackathon presentations.
- **GitHub/Discord Integration:** Allow teams to link their repositories and Discord servers.
- **Advanced Team Matching Algorithms:** Improve the suggestions for team formation.
- **Personalized Dashboards:** Offer users a more customized overview of their projects, tasks, and relevant hackathons.
- **Mobile Responsiveness:** Further optimize the platform for a seamless experience on mobile devices.

## Setup Instructions

To set up and run HackFlow locally:

1. **Clone the repository:**

   ```bash
   git clone [Your Repository URL]
   cd perp2k25
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root of the project by copying `.env.example` (if you have one) or by creating it manually.
   - Add the following environment variables with your actual credentials:

   ```properties
   # Perplexity API Key
   PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # NeonDB Database Connection Strings (from your NeonDB dashboard)
   DATABASE_URL="postgresql://user:password@project_host:port/dbname?sslmode=require" # Pooled connection
   DATABASE_URL_UNPOOLED="postgresql://user:password@project_host:port/dbname?sslmode=require" # Direct connection

   # Clerk Authentication Keys (from your Clerk dashboard)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # Socket.IO Server URL (if self-hosted or different from the main app URL)
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000

   # Optional: For NextAuth if you were using it previously or for other purposes
   # NEXTAUTH_URL="http://localhost:3000"
   # NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Push the Prisma schema to your database:**
   This command will synchronize your database schema with your `prisma/schema.prisma` file.

   ```bash
   npx prisma db push
   ```

5. **Generate Prisma Client:**
   This command generates the Prisma Client based on your schema.

   ```bash
   npx prisma generate
   ```

6. **Run the development server:**

   ```bash
   npm run dev
   ```

7. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The database schema is managed by Prisma. Key models include:

**`Idea`**

- `id`: String (UUID, primary key)
- `created_at`: DateTime (default: now)
- `title`: String
- `description`: String
- `flowchart`: String (Stores flowchart data, e.g., JSON for React Flow or Mermaid syntax)
- `user_id`: String? (Foreign key linking to the user, optional if ideas can be anonymous)

**`TeamMessage`**

- `id`: String (CUID, primary key)
- `teamId`: String (Identifier for the team)
- `sender`: String (User ID of the sender)
- `senderName`: String? (Display name of the sender)
- `message`: String (Content of the message)
- `createdAt`: DateTime (default: now)

**`TeamProfile`**

- `id`: String (CUID, primary key)
- `teamId`: String (Unique identifier for the team, could be user-generated or system-generated)
- `name`: String? (Team name)
- `email`: String? (Contact email for the team or team creator)
- `role`: String? (e.g., "Looking for members", "Project in progress")
- `techStack`: String? (Comma-separated list or JSON array of technologies)
- `skills`: String? (Comma-separated list or JSON array of skills the team has or needs)
- `availability`: Json? (e.g., schedule or commitment level)
- `lookingFor`: Json? (Description of roles or skills the team is looking for)
- `githubRepo`: String? (Link to the team's GitHub repository)
- `discordLink`: String? (Link to the team's Discord server)
- `createdAt`: DateTime (default: now)

_(Refer to `prisma/schema.prisma` for the most up-to-date and detailed schema information.)_

## Team Members (Example)

- [Your Name 1] - Role (e.g., Full-Stack Developer, AI Specialist)
- [Your Name 2] - Role (e.g., Frontend Developer, UI/UX Designer)
- _(Add other team members)_

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details (you would need to create this file if you choose MIT).
