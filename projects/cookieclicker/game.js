export class Game {
  constructor() {
    this.cookies = 0;
    this.upgrades = {
      cursor: { count: 0, baseCost: 15, cps: 0.1 },
      grandma: { count: 0, baseCost: 100, cps: 1 }
    };
    this.lastUpdate = Date.now();
  }

  init() {
    this.setupEventListeners();
    this.startGameLoop();
    this.updateDisplay();
  }

  setupEventListeners() {
    const cookie = document.getElementById('cookie');
    cookie.addEventListener('click', () => this.clickCookie());

    // Setup upgrade buttons
    Object.keys(this.upgrades).forEach(upgradeId => {
      const button = document.querySelector(`#${upgradeId} button`);
      button.addEventListener('click', () => this.buyUpgrade(upgradeId));
    });
  }

  clickCookie() {
    this.cookies++;
    this.updateDisplay();
  }

  buyUpgrade(upgradeId) {
    const upgrade = this.upgrades[upgradeId];
    const cost = this.calculateCost(upgradeId);
    
    if (this.cookies >= cost) {
      this.cookies -= cost;
      upgrade.count++;
      this.updateDisplay();
    }
  }

  calculateCost(upgradeId) {
    const upgrade = this.upgrades[upgradeId];
    return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
  }

  calculateCPS() {
    return Object.values(this.upgrades).reduce((total, upgrade) => {
      return total + (upgrade.count * upgrade.cps);
    }, 0);
  }

  startGameLoop() {
    setInterval(() => {
      const now = Date.now();
      const delta = (now - this.lastUpdate) / 1000;
      this.cookies += this.calculateCPS() * delta;
      this.lastUpdate = now;
      this.updateDisplay();
    }, 100);
  }

  updateDisplay() {
    document.getElementById('cookie-count').textContent = Math.floor(this.cookies);
    document.getElementById('cps').textContent = this.calculateCPS().toFixed(1);

    // Update upgrades display
    Object.keys(this.upgrades).forEach(upgradeId => {
      const upgrade = this.upgrades[upgradeId];
      const element = document.getElementById(upgradeId);
      element.querySelector('.cost').textContent = this.calculateCost(upgradeId);
      element.querySelector('.owned').textContent = upgrade.count;
      element.querySelector('button').disabled = this.cookies < this.calculateCost(upgradeId);
    });
  }
}