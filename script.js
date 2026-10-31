/**
 * Toochukwu Okutalukwe — portfolio (GitHub Pages compatible).
 * The six editorially selected projects are also the offline fallback.
 * When online, the full public repository archive is fetched from GitHub.
 * No API key, backend, paid package, tracker or build process is needed.
 */
'use strict';
const GITHUB_USER = 'Kelvinchuks';
const GITHUB_ROOT = `https://github.com/${GITHUB_USER}`;

const FEATURED = [
  {
    name: 'my-thesis-reproducibility',
    description: 'Reproducible workflows for the MSc thesis on linguistic change in large-scale consumer complaint narratives.',
    language: 'Jupyter Notebook', topics: ['research','NLP','Python','statistics'],
    categories: ['research','ml','data'], featured: true
  },
  {
    name: 'shap-consistency-healthcare',
    description: 'Cross-model SHAP consistency analysis across healthcare risk prediction datasets.',
    language: 'Jupyter Notebook', topics: ['research','SHAP','XGBoost','PyTorch'],
    categories: ['research','ml'], featured: true
  },
  {
    name: 'Who-Exploit-AI',
    description: 'oTree trust-game experiments and statistical analysis of cooperation with human and artificial partners.',
    language: 'Jupyter Notebook', topics: ['research','human-AI','oTree','behavioral'],
    categories: ['research','data'], featured: true
  },
  {
    name: 'Explainable-AI-XAI-using-LIME',
    description: 'A model-explainability audit of banking predictions, including a data-leakage warning.',
    language: 'Jupyter Notebook', topics: ['AI','LIME','banking','XAI'],
    categories: ['research','ml','data'], featured: true
  },
  {
    name: 'Instagram-Post-Analysis',
    description: 'Engagement, geographic patterns and VADER sentiment analysis of Instagram posts.',
    language: 'Jupyter Notebook', topics: ['data','sentiment','analytics','Power Query'],
    categories: ['data','ml'], featured: true
  },
  {
    name: 'alx-system_engineering-devops',
    description: 'Linux shell exercises covering commands, permissions, redirections and variables.',
    language: 'Shell', topics: ['Shell','Linux','systems','Bash'],
    categories: ['engineering','security'], featured: true
  }
];

const FALLBACK = FEATURED.map((r, index) => ({
  ...r, html_url: `${GITHUB_ROOT}/${encodeURIComponent(r.name)}`,
  stars: 0, fork: false, updated_at: null, fallbackOrder: index
}));

const state = {
  repositories: FALLBACK,
  isLive: false,
  category: 'all',
  search: '',
  sort: 'updated'
};

const grid = document.querySelector('#repo-grid');
const searchInput = document.querySelector('#repo-search');
const sortInput = document.querySelector('#repo-sort');
const status = document.querySelector('#repo-status');
const count = document.querySelector('#repo-results-count');
const disclaimer = document.querySelector('#repo-disclaimer');

const cleanString = value => typeof value === 'string' ? value : '';
const noBadUrl = value => typeof value === 'string' && /^https:\/\/github\.com\/Kelvinchuks\/[^?#]+/i.test(value);

function categorize(repo) {
  const text = [repo.name,repo.description,repo.language,...(repo.topics || [])].join(' ').toLowerCase();
  const categories = new Set(FEATURED.find(f => f.name.toLowerCase() === repo.name.toLowerCase())?.categories || []);
  const buckets = {
    research: /research|thesis|experiment|trust|study|social.?norm|hci|reproducib|statistic|analysis of ai/,
    ml: /neural|machine.?learning|deep.?learning|xai|lime|shap|ai|nlp|model|classif|sentiment|predic|transformer|data.?science/,
    data: /data|analytics|dashboard|power.?bi|tableau|analysis|insight|sql|visuali|excel|notebook|finance|bank/,
    security: /cyber|security|soc|siem|nmap|splunk|suricata|wireshark|threat|vuln|incident|shell_permissions/,
    engineering: /linux|devops|shell|bash|system|web|script|app|python|engineering|docker|cloud|html|javascript|typescript|api/
  };
  for (const [key, pattern] of Object.entries(buckets)) if (pattern.test(text)) categories.add(key);
  return [...categories];
}

function normalizeRepo(raw) {
  const title = cleanString(raw.name);
  const matching = FEATURED.find(r => r.name.toLowerCase() === title.toLowerCase());
  return {
    name: title,
    description: cleanString(raw.description) || matching?.description || '',
    language: cleanString(raw.language) || matching?.language || '',
    html_url: noBadUrl(raw.html_url) ? raw.html_url : `${GITHUB_ROOT}/${encodeURIComponent(title)}`,
    topics: Array.isArray(raw.topics) ? raw.topics.filter(x=>typeof x === 'string') : [],
    stars: Number.isFinite(raw.stargazers_count) ? raw.stargazers_count : 0,
    fork: Boolean(raw.fork),
    updated_at: cleanString(raw.pushed_at || raw.updated_at),
    categories: [],
    featured: Boolean(matching)
  };
}

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = String(text);
  return el;
}

function createRepositoryCard(repo) {
  const article = node('article', 'repo-card');
  const top = node('div', 'repo-card-top');
  const symbol = node('span', 'repo-card-icon', repo.fork ? '⑂' : '⌘');
  symbol.setAttribute('aria-hidden', 'true');
  top.append(symbol, node('span','repo-card-type',repo.fork ? 'FORKED REPOSITORY' : repo.featured ? 'FEATURED ON THIS SITE' : 'PUBLIC REPOSITORY'));

  const heading = node('h3');
  const link = node('a', '', repo.name);
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  heading.appendChild(link);

  const desc = node('p','',repo.description || 'A public repository on my GitHub profile. Open its source to explore the project.');
  const footer = node('div', 'repo-card-footer');
  const lang = node('span');
  const languageDot = node('span','language-dot' + (repo.language ? '' : ' is-empty'));
  languageDot.setAttribute('aria-hidden','true');
  lang.append(languageDot,document.createTextNode(repo.language || 'Not specified'));
  const open = node('a','',`SOURCE ↗`);
  open.href = repo.html_url;
  open.target = '_blank';
  open.rel = 'noopener noreferrer';
  open.setAttribute('aria-label',`Open ${repo.name} on GitHub`);
  footer.append(lang,open);
  article.append(top,heading,desc,footer);
  return article;
}

function renderRepositories() {
  const search = state.search.trim().toLowerCase();
  const filtered = state.repositories.filter(r => {
    const categories = r.categories?.length ? r.categories : categorize(r);
    const matchesCategory = state.category === 'all' || categories.includes(state.category);
    const matchesSearch = !search || [r.name,r.description,r.language,...(r.topics || [])].join(' ').toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  const result = [...filtered].sort((a,b) => {
    if (state.sort === 'name') return a.name.localeCompare(b.name);
    if (state.sort === 'stars') return (b.stars||0)-(a.stars||0) || a.name.localeCompare(b.name);
    if (!state.isLive) return (a.fallbackOrder ?? 999)-(b.fallbackOrder ?? 999);
    const da = a.updated_at ? Date.parse(a.updated_at) : 0;
    const db = b.updated_at ? Date.parse(b.updated_at) : 0;
    return db-da || a.name.localeCompare(b.name);
  });
  if (grid) {
    const fragment = document.createDocumentFragment();
    for (const r of result) fragment.appendChild(createRepositoryCard(r));
    if (!result.length) fragment.appendChild(node('div','repo-empty','No repositories match those filters. Try another search or category.'));
    grid.replaceChildren(fragment);
  }
  if (count) count.textContent = `${result.length} of ${state.repositories.length} repositories`;
}

async function loadGithubRepositories() {
  // On GitHub Pages, GitHub's public REST API enables the live, complete list.
  // The fallback has no external dependencies and also works via file://.
  const controller = new AbortController();
  const abort = setTimeout(() => controller.abort(), 10000);
  try {
    let repos = [];
    for (let page = 1; page <= 10; page++) {
      const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?per_page=100&page=${page}&sort=updated&direction=desc`;
      const response = await fetch(url, {headers: {Accept:'application/vnd.github+json'}, signal:controller.signal});
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
      const entries = await response.json();
      if (!Array.isArray(entries)) throw new Error('Unexpected GitHub API response');
      repos.push(...entries);
      if (entries.length < 100) break;
    }
    const validRepos = repos.filter(r => r && typeof r.name === 'string' && !r.private && r.owner?.login?.toLowerCase() === GITHUB_USER.toLowerCase());
    if (!validRepos.length) throw new Error('No public repositories returned');
    state.repositories = validRepos.map(normalizeRepo);
    state.isLive = true;
    if (status) status.textContent = `Live archive connected — ${state.repositories.length} public repositories from @${GITHUB_USER}.`;
    if (disclaimer) disclaimer.textContent = 'Public repository information updates when this page is reloaded. Private repositories are never accessible through this public listing. Metadata comes from GitHub; featured project write-ups are editorial summaries.';
    const repoNum = document.querySelector('#repo-number');
    const repoSource = document.querySelector('#repo-number-source');
    if (repoNum) repoNum.textContent = String(state.repositories.length).padStart(2,'0');
    if (repoSource) repoSource.textContent = 'currently on GitHub';
    renderRepositories();
  } catch (error) {
    if (status) status.textContent = 'Live GitHub sync unavailable — showing six verified repositories.';
    if (disclaimer) disclaimer.textContent = 'The live GitHub API could not be reached (for example, offline or rate-limited). The six verified projects above remain available. Select “All repositories on GitHub” to see the full public collection.';
    console.info('Repository sync fallback active:', error?.message || error);
  } finally {
    clearTimeout(abort);
  }
}

searchInput?.addEventListener('input', e => {state.search = e.target.value;renderRepositories();});
sortInput?.addEventListener('change', e => {state.sort = e.target.value;renderRepositories();});
for (const button of document.querySelectorAll('[data-repo-filter]')) {
  button.addEventListener('click', () => {
    state.category = button.dataset.repoFilter;
    document.querySelectorAll('[data-repo-filter]').forEach(b => {
      const active = b === button;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    renderRepositories();
  });
}

function setLens(lens) {
  document.querySelectorAll('[data-lens]').forEach(button=>{
    const active = button.dataset.lens === lens;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  document.querySelectorAll('[data-audiences]').forEach(card=>{
    card.hidden = lens !== 'all' && !(card.dataset.audiences||'').split(' ').includes(lens);
  });
}
for (const button of document.querySelectorAll('[data-lens]')) {
  button.addEventListener('click',()=>setLens(button.dataset.lens));
}
for (const link of document.querySelectorAll('[data-lens-link]')) {
  link.addEventListener('click',()=>setLens(link.dataset.lensLink));
}

const menuButton = document.querySelector('#mobile-menu');
const menu = document.querySelector('#nav');
menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(isOpen));
  menuButton.setAttribute('aria-label',isOpen ? 'Close menu' : 'Open menu');
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label','Open menu');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
renderRepositories();
loadGithubRepositories();


// The six event photos open in an accessible native HTML dialog.
const photoDialog = document.querySelector('#photo-dialog');
const photoDialogImage = document.querySelector('#photo-dialog-image');
const photoDialogCaption = document.querySelector('#photo-dialog-caption');
for (const trigger of document.querySelectorAll('[data-photo]')) {
  trigger.addEventListener('click', () => {
    if (!photoDialog || !photoDialogImage || typeof photoDialog.showModal !== 'function') return;
    photoDialogImage.src = trigger.dataset.photo;
    photoDialogImage.alt = trigger.querySelector('img')?.alt || '';
    photoDialogCaption.textContent = trigger.dataset.caption || '';
    photoDialog.showModal();
  });
}
photoDialog?.addEventListener('click', e => {
  if (e.target === photoDialog) photoDialog.close();
});
photoDialog?.addEventListener('close', () => {
  if (photoDialogImage) photoDialogImage.removeAttribute('src');
});


// LinkedIn update viewer: exact URL/height from user-supplied official iframe embeds.
// Content is never fetched until a visitor chooses to load a post, protecting
// load times and making third-party requests explicit. No LinkedIn API key needed.
const LINKEDIN_POSTS = [
  { kind: 'ugcPost', id: '7431080005025284096', height: 541, src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7431080005025284096?collapsed=1' },
  { kind: 'share', id: '7433156203041644544', height: 486, src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7433156203041644544?collapsed=1' },
  { kind: 'ugcPost', id: '7440165066446110720', height: 921, src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440165066446110720?collapsed=1' },
  { kind: 'ugcPost', id: '7353839398020427776', height: 627, src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7353839398020427776?collapsed=1' },
  { kind: 'share', id: '7354632830242406400', height: 541, src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7354632830242406400?collapsed=1' },
  { kind: 'share', id: '7337585448631873537', height: 669, src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7337585448631873537?collapsed=1' }
];
const linkedinTabs = Array.from(document.querySelectorAll('[data-linkedin-index]'));
const linkedinStage = document.querySelector('#linkedin-frame-stage');
const linkedinStatus = document.querySelector('#linkedin-status');
const linkedinPanel = document.querySelector('#linkedin-panel');
const linkedinCurrent = document.querySelector('#linkedin-current');
const linkedinOriginal = document.querySelector('#linkedin-open');
const linkedinExpand = document.querySelector('#linkedin-expand');
const linkedinDialog = document.querySelector('#linkedin-dialog');
const linkedinDialogFrame = document.querySelector('#linkedin-dialog-frame');
const linkedinDialogOpen = document.querySelector('#linkedin-dialog-open');
let linkedinSelected = 0;
let linkedinHasLoaded = false;

function linkedinOriginalUrl(post) {
  return `https://www.linkedin.com/feed/update/urn:li:${post.kind}:${post.id}/`;
}
function linkedinIframe(post, title) {
  const frame = document.createElement('iframe');
  frame.className = 'linkedin-iframe';
  frame.src = post.src;
  frame.setAttribute('width', '504');
  frame.setAttribute('height', String(post.height));
  frame.style.height = `${post.height}px`;
  frame.title = title;
  frame.setAttribute('loading', 'eager');
  frame.setAttribute('allowfullscreen', '');
  frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  frame.setAttribute('allow', 'fullscreen');
  return frame;
}
function linkedinLoad(index) {
  const post = LINKEDIN_POSTS[index];
  if (!post || !linkedinStage) return;
  linkedinStage.replaceChildren(linkedinIframe(post, `LinkedIn update ${index+1} of ${LINKEDIN_POSTS.length}`));
  linkedinHasLoaded = true;
  if (linkedinStatus) linkedinStatus.textContent = `Viewing post ${index+1} of ${LINKEDIN_POSTS.length}. If the embed stays blank, use “Open on LinkedIn.”`;
}
function linkedinSelect(index, load = true) {
  linkedinSelected = ((index % LINKEDIN_POSTS.length) + LINKEDIN_POSTS.length) % LINKEDIN_POSTS.length;
  linkedinTabs.forEach((button, i) => {
    const active = i === linkedinSelected;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  const tab = linkedinTabs[linkedinSelected];
  linkedinPanel?.setAttribute('aria-labelledby', tab?.id || 'linkedin-tab-1');
  if (linkedinCurrent) linkedinCurrent.textContent = String(linkedinSelected + 1).padStart(2, '0');
  if (linkedinOriginal) linkedinOriginal.href = linkedinOriginalUrl(LINKEDIN_POSTS[linkedinSelected]);
  if (load) linkedinLoad(linkedinSelected);
}
linkedinTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => linkedinSelect(i));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = i+1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = i-1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = LINKEDIN_POSTS.length-1;
    if (next !== undefined) {
      event.preventDefault();
      linkedinSelect(next);
      linkedinTabs[linkedinSelected]?.focus();
    }
  });
});
document.querySelector('#linkedin-load')?.addEventListener('click', () => linkedinLoad(linkedinSelected));
document.querySelector('#linkedin-prev')?.addEventListener('click', () => linkedinSelect(linkedinSelected-1));
document.querySelector('#linkedin-next')?.addEventListener('click', () => linkedinSelect(linkedinSelected+1));
linkedinExpand?.addEventListener('click', () => {
  if (!linkedinDialog || !linkedinDialogFrame || typeof linkedinDialog.showModal !== 'function') return;
  const post = LINKEDIN_POSTS[linkedinSelected];
  linkedinDialogFrame.replaceChildren(linkedinIframe(post, `Expanded LinkedIn update ${linkedinSelected+1}`));
  if (linkedinDialogOpen) linkedinDialogOpen.href = linkedinOriginalUrl(post);
  linkedinDialog.showModal();
});
linkedinDialog?.addEventListener('click', (e) => {
  if (e.target === linkedinDialog) linkedinDialog.close();
});
linkedinDialog?.addEventListener('close', () => {
  // Clear iframe to stop playback and release memory when modal closes.
  linkedinDialogFrame?.replaceChildren();
});
