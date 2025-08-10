// Main script for the Reflective MVS dashboard
// Uses the RMVS_CONFIG object defined in config.js to populate the interface.

(() => {
  const cfg = window.RMVS_CONFIG;

  // Populate quick links navigation
  const nav = document.getElementById("quickLinks");
  nav.innerHTML = cfg.quickLinks.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("");

  // Set copyright year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Set draft workspace link
  document.getElementById("draftBtn").href = cfg.draftWorkspace;

  // Helper to generate embed iframes
  function embedFrame(url) {
    if (!url) {
      return `<div class="muted">Add share link in <code>config.js</code>.</div>`;
    }
    return `<iframe src="${url}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  }
  // Populate analytics frames
  document.getElementById("gaFrame").innerHTML = embedFrame(cfg.embeds.GA_LOOKER);
  document.getElementById("gscFrame").innerHTML = embedFrame(cfg.embeds.GSC_LOOKER);

  // Render topics and shuffle
  const topicsEl = document.getElementById("topics");
  function renderTopics(list) {
    topicsEl.innerHTML = list.map(t => `<li>${t}</li>`).join("");
  }
  renderTopics(cfg.topics);
  document.getElementById("shuffleTopics").onclick = () => {
    renderTopics([...cfg.topics].sort(() => Math.random() - 0.5));
  };

  // Fetch latest blog posts via Blogger JSON feed
  async function loadPosts() {
    try {
      const res = await fetch(cfg.site.bloggerJsonFeed);
      const data = await res.json();
      const entries = (data.feed.entry || []).slice(0, 6).map(e => {
        const title = e.title.$t;
        const link = (e.link.find(l => l.rel === "alternate") || {}).href || "#";
        const published = new Date(e.published.$t).toLocaleDateString();
        return { title, link, published };
      });
      const ul = document.getElementById("latestPosts");
      ul.innerHTML = entries.map(x => `<li><a href="${x.link}" target="_blank" rel="noopener">${x.title}</a><br><span class="muted tiny">${x.published}</span></li>`).join("");
    } catch (err) {
      document.getElementById("latestPosts").innerHTML = `<li class="muted">Couldn’t load posts.</li>`;
    }
  }
  loadPosts();

  // Simple RSS feed parser for news feeds
  const feedsWrap = document.getElementById("newsFeeds");
  async function fetchRSS(url) {
    const res = await fetch(url);
    const text = await res.text();
    const xml = new window.DOMParser().parseFromString(text, "application/xml");
    const items = [...xml.querySelectorAll("item, entry")].slice(0, 6);
    return items.map(n => ({
      title: n.querySelector("title")?.textContent?.trim() || "Untitled",
      link: n.querySelector("link")?.getAttribute("href") || n.querySelector("link")?.textContent || "#"
    }));
  }
  async function renderFeeds() {
    feedsWrap.innerHTML = "";
    for (const src of cfg.newsFeeds) {
      try {
        const items = await fetchRSS(src.rss);
        const list = items.map(i => `<li><a href="${i.link}" target="_blank" rel="noopener">${i.title}</a></li>`).join("");
        feedsWrap.insertAdjacentHTML("beforeend", `
          <div class="feed">
            <h3>${src.name}</h3>
            <ul>${list}</ul>
          </div>
        `);
      } catch (e) {
        feedsWrap.insertAdjacentHTML("beforeend", `
          <div class="feed">
            <h3>${src.name}</h3>
            <ul><li class="muted">Feed blocked or unavailable.</li></ul>
          </div>
        `);
      }
    }
  }
  renderFeeds();

  // Render backlog
  document.getElementById("backlog").innerHTML = cfg.backlog.map(i => `<li>${i}</li>`).join("");

  // Render social links
  const socialEl = document.getElementById("socialLinks");
  socialEl.innerHTML = cfg.socialLinks.map(link => {
    return `<li><a href="${link.href}" target="_blank" rel="noopener">${link.name}</a></li>`;
  }).join("");

  // Render blog manager links
  // Create a new card section for managing your Blogger site
  const blogSection = document.createElement('section');
  blogSection.className = 'card';
  // Card content includes a heading and a list container
  blogSection.innerHTML = '<h2>Blog Manager</h2><ul class="list" id="blogLinks"></ul>';
  // Append the blog manager card to the main dashboard grid
  document.querySelector('main.shell.grid').appendChild(blogSection);
  // Populate the list with Blogger management links from the global configuration
  const blogEl = document.getElementById('blogLinks');
  blogEl.innerHTML = (window.RMVS_CONFIG.blogLinks || []).map(link => {
    return `<li><a href="${link.href}" target="_blank" rel="noopener">${link.name}</a></li>`;
  }).join("");
})();
