# EcoGrow - Turn Ads Into Forests

EcoGrow empowers individuals to contribute to environmental sustainability from the comfort of their homes. By watching ads, users earn tokens that fund the planting of real trees. Support NGOs, climb the leaderboard, and win fresh produce as monthly rewards!

## Tech Stack

### Backend

- Framework: ExpressJS (TypeScript)

- Database: PostgreSQL

- Workflow Engine: Conductor OSS

- API Integration: Tree Nation API (for fetching tree-related information)

### Frontend

- Framework: Next.js (TypeScript)

## Features

- User Dashboard: Users can track their tree-planting contributions, CO₂ offset, and global rankings.

- Interactive Map: A visual representation of planted trees across different locations.

- Leaderboard: Encourages friendly competition among users based on contributions.

- Tree Catalog: Provides details on available trees using data from Tree Nation's API.

- Automated Workflows: Powered by Conductor OSS to handle complex background processes efficiently.

## Getting Started

### Prerequisites

- Node.js (v16 or later)

- PostgreSQL

- Docker (optional, for Conductor OSS setup)

### Setup

#### Backend Setup

```shell
cd ecogrow-backend
pnpm install
cp .env.example .env  # Configure your environment variables
pnpm run dev  # Start the backend server
```

#### Frontend Setup

```shell
cd ecogrow-frontend
pnpm install
pnpm run dev  # Start the Next.js development server
```

#### Database Setup

- Ensure PostgreSQL is running and update your .env file with the correct database credentials. Run migrations if applicable:

```shell
npx prisma migrate dev
```

- You can seed the database with example data by running <https://github.com/Team-ByteWise/EcoGrow/blob/main/ecogrow-backend/prisma/seed.ts>

#### Conductor OSS Setup

Conductor OSS can be run using <https://github.com/Team-ByteWise/EcoGrow/blob/main/ecogrow-backend/workflows/ecogrow_conductor.ts>
