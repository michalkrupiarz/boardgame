# City Development Board Game

## Short Description
A turn-based strategy board game focused on municipal growth and resource management. Players develop their city by managing a dynamic economy—balancing gold, production, food, culture, and science. The game features an expansive hexagonal map for exploration and resource harvesting, paired with an immersive city dashboard where players can strategically allocate their production yields to construct new infrastructure and maximize their turn-over-turn advantages.

## Domain
- **Category:** Entertainment / Gaming
- **Genre:** Turn-based Strategy, Resource Management, Map Exploration

## Tech Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool / Bundler:** Vite
- **Styling:** Vanilla CSS 3 (Dynamic custom CSS variables, Glassmorphism UI)
- **Testing:** Vitest (Unit testing for pure game logic reducers)
- **Rendering:** SVG-based Hexagonal Geometry (for tile plotting & interactivity)


How to trigger openspec
this will create proposalplace a city in the center tile of the map. Please create an OpenSpec change proposal for this feature
opsx-explore - ai will analyze proposal and refine it 
opsx-apply [change-name] will try to implement the change

Deployment is on vercel use github account

## Testing

### E2E Testing (Playwright)
To run all end-to-end tests:
```bash
npm run test:e2e
```

To view the last HTML report:
```bash
npm run test:e2e:report
```