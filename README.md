# Nasratullah Shinwari’s SQL and Power BI portfolio

A standalone practice site for a terminal and deployment course. The page introduces three case studies from the [public SQL and Power BI portfolio](https://github.com/shinwari87/sql-powerbi-portfolio). All project figures come from fictional data. The first-response chart uses the [queue scorecard](https://github.com/shinwari87/sql-powerbi-portfolio/blob/main/support-sla/results/queue_scorecard.csv).

## Run the local preview

With Node.js 18 or newer and npm available, open a terminal in this folder and run:

```sh
npm run dev
```

Open the local address printed in the terminal. The default is [http://127.0.0.1:3000](http://127.0.0.1:3000). Press Control+C to stop the preview. On macOS or Linux, use `PORT=3001 npm run dev` to choose another port.

The project uses static HTML and CSS and has no package dependencies. You can also open `public/index.html` directly in a browser.

To check your edits from the terminal before sharing them, run `git diff`. After committing, use `git log -1 --oneline` to see the version you saved.

## Edit the site

- `public/index.html` contains the page, chart values and links to the studies and SQL.
- `public/site.css` controls typography, color, spacing and the mobile layout.
- `server.mjs` serves the contents of `public/` on your computer.
- `vercel.json` selects `public/` as the deployment output directory.
