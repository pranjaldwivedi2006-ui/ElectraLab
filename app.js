
const app = document.getElementById("app");

const experiments = [
    {
        id: "ohms",
        icon: "⚡",
        color: "green",
        tag: "FUNDAMENTALS",
        title: "Ohm's Law",
        description: "Explore voltage, current and resistance.",
        level: "Beginner"
    },
    {
        id: "thevenin",
        icon: "🔌",
        color: "blue",
        tag: "NETWORK THEOREMS",
        title: "Thevenin's & Maximum Power Transfer",
        description: "Find equivalent circuits and study maximum load power.",
        level: "Intermediate"
    },
    
    {
        id: "energy",
        icon: "⏱️",
        color: "orange",
        tag: "MEASUREMENT",
        title: "Energy Meter Calibration",
        description: "Measure energy consumption and meter error.",
        level: "Intermediate"
    },
    {
        id: "transformer",
        icon: "🔄",
        color: "blue",
        tag: "TRANSFORMERS",
        title: "Transformer OC & SC Tests",
        description: "Determine transformer losses and equivalent parameters.",
        level: "Advanced"
    }
];

function renderDashboard() {
    app.innerHTML = `
        <div class="layout">
            <aside class="sidebar">
                <div class="brand">
                    <div class="brand-icon">ϟ</div>
                    <div class="brand-name">Volt<span>Lab</span></div>
                </div>

                <div class="nav-label">WORKSPACE</div>
                <nav class="nav">
                    <button class="nav-btn active" data-page="dashboard">
                        <span class="nav-emoji">▦</span>
                        <span class="nav-text">Dashboard</span>
                    </button>
                    <button class="nav-btn" data-page="experiments">
                        <span class="nav-emoji">⌘</span>
                        <span class="nav-text">Experiments</span>
                    </button>
                    <button class="nav-btn" data-page="missions">
                        <span class="nav-emoji">◈</span>
                        <span class="nav-text">Challenge Mode</span>
                    </button>
        </nav>

        <div class="sidebar-bottom">
            <div class="lab-card">
                <div class="lab-card-title">⚡ Virtual Lab</div>
                <p>Experiment, explore and understand how electrical circuits work.</p>
            </div>
            <div class="profile">
                <div class="avatar">👨‍🎓</div>
                <div>
                    <div class="profile-name">Engineering Student</div>
                    <div class="profile-sub">Electrical Laboratory</div>
                </div>
            </div>
        </div>
    </aside>

    <main class="main" id="main-content"></main>
    </div>
    `;
    showPage("dashboard");
}

function experimentCard(exp) {
    return `
        <article class="experiment-card">
            <div class="exp-icon ${exp.color}">${exp.icon}</div>
            <div class="exp-tag">${exp.tag}</div>
            <h3>${exp.title}</h3>
            <p>${exp.description}</p>
            <div class="exp-footer">
                <span class="level">${exp.level}</span>
                <button class="open-exp" data-experiment="${exp.id}">
                   ${["ohms", "thevenin", "energy"].includes(exp.id) ? "Open Lab →" : "Coming Soon"}
                </button>
            </div>
        </article>
    `;

}

function showPage(page) {
    const main = document.getElementById("main-content");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.page === page);
    });

    if (page === "dashboard") {
        main.innerHTML = `
            <div class="topbar">
                <div class="breadcrumb">Workspace / <strong>Dashboard</strong></div>
                <div class="status-pill"><span class="status-dot"></span> System Ready</div>
            </div>

            <section class="hero">
                <div>
                    <h1>Welcome to ElectraLab ⚡</h1>
                    <p>Your interactive electrical engineering laboratory.<br>
                    Learn by building, experimenting and simulating.</p>
                </div>
                <button class="hero-btn" data-page="experiments">Explore Experiments →</button>
            </section>

            <section class="stats">
                <div class="stat-card">
                    <div class="stat-top"><span class="stat-label">Experiments</span><span class="stat-icon">⚗️</span></div>
                    <div class="stat-value">06</div>
                    <div class="stat-foot">Planned virtual experiments</div>
                </div>
                <div class="stat-card">
                    <div class="stat-top"><span class="stat-label">Available Now</span><span class="stat-icon">⚡</span></div>
                    <div class="stat-value">01</div>
                    <div class="stat-foot">Ready to interact</div>
                </div>
                <div class="stat-card">
                    <div class="stat-top"><span class="stat-label">Lab Status</span><span class="stat-icon">◉</span></div>
                    <div class="stat-value" style="color:var(--accent)">Online</div>
                    <div class="stat-foot">Simulation environment ready</div>
                </div>
            </section>

            <section>
                <div class="section-head">
                    <h2>Featured Experiments</h2>
                    <button class="view-all" data-page="experiments">View all →</button>
                </div>
                <div class="experiment-grid">
                    ${experiments.map(experimentCard).join("")}
                </div>
            </section>
        `;
    }

    if (page === "experiments") {
        main.innerHTML = `
            <div class="topbar">
                <div class="breadcrumb">Workspace / <strong>Experiments</strong></div>
                <div class="status-pill"><span class="status-dot"></span> Lab Ready</div>
            </div>
            <h1 class="page-title">Experiment Library</h1>
            <p class="page-description">Choose an experiment to explore electrical principles through simulation.</p>
            <div class="experiment-grid">
                ${experiments.map(experimentCard).join("")}
            </div>
        `;
    }

    if (page === "missions") {
        main.innerHTML = `
            <div class="topbar">
                <div class="breadcrumb">Workspace / <strong>Challenge Mode</strong></div>
                <div class="status-pill"><span class="status-dot"></span> Lab Ready</div>
            </div>
            <h1 class="page-title">Challenge Mode ◈</h1>
            <p class="page-description">Test your understanding by solving electrical engineering challenges.</p>
            <div class="empty-panel">
                <div style="font-size:40px;margin-bottom:15px">🎯</div>
                <h3>Missions are under development</h3>
                <p>Interactive electrical challenges will be added after the first simulations are ready.</p>
            </div>
        `;
    }
}

function renderOhmsLab() {
    let voltage = 10;
    let resistance = 100;
    let running = false;

    showPage("simulation");

    const main = document.getElementById("main-content");

    main.innerHTML = `
        <div class="sim-page">
            <button class="back-btn" id="back-to-experiments">← Back to Experiments</button>

            <div class="topbar">
                <div class="breadcrumb">Experiments / <strong>Ohm's Law</strong></div>
                <div class="status-pill"><span class="status-dot"></span> Interactive Lab</div>
            </div>

            <div class="sim-heading">
                <h1>Ohm's Law Laboratory ⚡</h1>
                <p>Investigate the relationship between voltage, current and resistance in a DC circuit.</p>
            </div>

            <div class="sim-grid">
                <section class="sim-panel">
                    <div class="sim-panel-title">Circuit Workspace</div>
                    <div class="sim-panel-subtitle">DC voltage source connected to a resistor</div>

                    <div class="circuit-stage" id="circuit-stage">
                <svg viewBox="0 0 600 330" role="img" aria-label="Battery, ammeter and resistor circuit diagram">
                    <!-- Main wires -->
                    <path class="wire" d="M100 70 H250"/>
                    <path class="wire" d="M350 70 H500 V250 H100 V70"/>
                    <path class="wire" d="M250 70 H350"/>

                    <!-- Battery -->
                    <line class="component" x1="100" y1="145" x2="100" y2="178"/>
                    <line class="component" x1="82" y1="145" x2="118" y2="145"/>
                    <line class="component" x1="90" y1="178" x2="110" y2="178"/>
                    <text class="component-text" x="42" y="163">DC Source</text>
                    <text class="measure-text" id="svg-voltage" x="40" y="205">10 V</text>

                    <!-- Resistor -->
                    <rect class="component" x="250" y="52" width="100" height="36" rx="5"/>
                    <text class="component-text" x="282" y="75">R1</text>
                    <text class="measure-text" id="svg-resistance" x="270" y="112">100 Ω</text>

                    <!-- Ammeter -->
                    <circle class="component" cx="500" cy="160" r="26"/>
                    <text class="component-text" x="492" y="166">A</text>
                    <text class="measure-text" id="svg-current" x="460" y="204">100 mA</text>

                    <!-- Voltmeter branch -->
                    <path class="wire" d="M230 70 V250"/>
                    <path class="wire" d="M370 70 V250"/>
                    <path class="wire" d="M230 150 H370"/>
                    <circle class="component" cx="300" cy="150" r="23"/>
                    <text class="component-text" x="292" y="156">V</text>
                    <text class="measure-text" x="274" y="190">Meter</text>

                    <!-- Current flow particles -->
                    <circle class="flow-dot" cx="100" cy="70" r="5"/>
                    <circle class="flow-dot" cx="100" cy="70" r="5" style="animation-delay:.5s"/>
                    <circle class="flow-dot" cx="100" cy="70" r="5" style="animation-delay:1s"/>
                </svg>
            </div>

            <div class="meter-grid">
                <div class="meter">
                    <div class="meter-label">Circuit Current (I)</div>
                    <div class="meter-value" id="current-meter">100 <span class="meter-unit">mA</span></div>
                </div>
                <div class="meter">
                    <div class="meter-label">Resistor Voltage (V)</div>
                    <div class="meter-value" id="voltage-meter">10 <span class="meter-unit">V</span></div>
                </div>
                <div class="meter">
                    <div class="meter-label">Resistance (R)</div>
                    <div class="meter-value" id="resistance-meter">100 <span class="meter-unit">Ω</span></div>
                </div>
                <div class="meter">
                    <div class="meter-label">Power (P)</div>
                    <div class="meter-value" id="power-meter">1 <span class="meter-unit">W</span></div>
                </div>
            </div>
        </section>

        <section class="sim-panel">
            <div class="sim-panel-title">Simulation Controls</div>
            <div class="sim-panel-subtitle">Adjust values to observe circuit behavior</div>

            <div class="control-row">
                <div class="control-head">
                    <span>Supply Voltage</span>
                    <span id="voltage-label">10 V</span>
                </div>
                <input class="sim-range" id="voltage-slider" type="range" min="1" max="20" step="1" value="10">
                <div class="range-labels"><span>1 V</span><span>20 V</span></div>
            </div>

            <div class="control-row">
                <div class="control-head">
                    <span>Resistance</span>
                    <span id="resistance-label">100 Ω</span>
                </div>
                <input class="sim-range" id="resistance-slider" type="range" min="10" max="1000" step="10" value="100">
                <div class="range-labels"><span>10 Ω</span><span>1000 Ω</span></div>
            </div>

            <div class="sim-actions">
                <button class="sim-action-btn primary" id="start-btn">▶ Run</button>
                <button class="sim-action-btn" id="reset-btn">↻ Reset</button>
            </div>

            <div class="sim-status" id="sim-status">
                <span class="status-dot"></span>
                <span>Simulation stopped</span>
            </div>

            <div class="formula-box">
                <div class="formula-label">OHM'S LAW</div>
                <div class="formula">V = I × R</div>
                <div class="explanation">
                    Current equals voltage divided by resistance.
                    Increase voltage to increase current, or increase resistance to decrease current.
                </div>
            </div>
        </section>
    </div>
</div>
`;

    const voltageSlider = document.getElementById("voltage-slider");
    const resistanceSlider = document.getElementById("resistance-slider");
    const startBtn = document.getElementById("start-btn");
    const resetBtn = document.getElementById("reset-btn");
    const stage = document.getElementById("circuit-stage");
    const status = document.getElementById("sim-status");

    function updateSimulation() {
        const current = voltage / resistance;
        const power = voltage * current;

        document.getElementById("voltage-label").textContent = `${voltage} V`;
        document.getElementById("resistance-label").textContent = `${resistance} Ω`;

        document.getElementById("current-meter").innerHTML =
            `${(current * 1000).toFixed(2)} <span class="meter-unit">mA</span>`;

        document.getElementById("voltage-meter").innerHTML =
            `${voltage.toFixed(2)} <span class="meter-unit">V</span>`;

        document.getElementById("resistance-meter").innerHTML =
            `${resistance} <span class="meter-unit">Ω</span>`;

        document.getElementById("power-meter").innerHTML =
            `${power.toFixed(3)} <span class="meter-unit">W</span>`;

        document.getElementById("svg-voltage").textContent = `${voltage} V`;
        document.getElementById("svg-resistance").textContent = `${resistance} Ω`;
        document.getElementById("svg-current").textContent =
            `${(current * 1000).toFixed(1)} mA`;
    }

    voltageSlider.addEventListener("input", () => {
        voltage = Number(voltageSlider.value);
        updateSimulation();
    });

    resistanceSlider.addEventListener("input", () => {
        resistance = Number(resistanceSlider.value);
        updateSimulation();
    });

    startBtn.addEventListener("click", () => {
        running = !running;
        startBtn.textContent = running ? "⏸ Pause" : "▶ Run";
        startBtn.classList.toggle("primary", !running);
        stage.classList.toggle("circuit-running", running);
        status.classList.toggle("running", running);
        status.innerHTML = running
            ? '<span class="status-dot"></span><span>Simulation running</span>'
            : '<span class="status-dot"></span><span>Simulation paused</span>';
    });

    resetBtn.addEventListener("click", () => {
        voltage = 10;
        resistance = 100;
        running = false;

        voltageSlider.value = 10;
        resistanceSlider.value = 100;

        startBtn.textContent = "▶ Run";
        startBtn.classList.add("primary");
        stage.classList.remove("circuit-running");
        status.classList.remove("running");
        status.innerHTML = '<span class="status-dot"></span><span>Simulation stopped</span>';

        updateSimulation();
    });

    document.getElementById("back-to-experiments").addEventListener("click", () => {
        renderDashboard();
        showPage("experiments");
    });

    updateSimulation();
}

app.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-page]");
    const experimentButton = event.target.closest("[data-experiment]");

    if (pageButton) {
        showPage(pageButton.dataset.page);
    }

    if (experimentButton) {
        const experiment = experimentButton.dataset.experiment;

        if (experiment === "ohms") {
    renderOhmsLab();
} else if (experiment === "thevenin") {
    renderTheveninLab();
} else if (experiment === "series") {
    renderSeriesLab();
} else if (experiment === "energy") {
    renderEnergyMeterLab();
}
    }
});

renderDashboard();
function renderSeriesLab() {
    showPage("simulation");
const main = document.getElementById("main-content");

if (!main) {
    console.error("ElectraLab: main-content element not found!");
    return;
}
    
    main.innerHTML = `
        <div class="sim-page">
            <div class="sim-header">
                <button class="back-btn" onclick="renderDashboard()">← Back to Dashboard</button>
                <h1>Series Circuit Lab</h1>
                <p>Explore how voltage, resistance and current behave in a series circuit.</p>
            </div>

            <div class="sim-grid">
                <div class="sim-panel">
                    <h2>🔌 Circuit Setup</h2>

                    <div class="control-group">
                        <label>Supply Voltage: <span id="seriesVoltageValue">12</span> V</label>
                        <input type="range" id="seriesVoltage" min="1" max="24" value="12">
                    </div>

                    <div class="control-group">
                        <label>Resistor R1: <span id="r1Value">100</span> Ω</label>
                        <input type="range" id="r1" min="10" max="500" step="10" value="100">
                    </div>

                    <div class="control-group">
                        <label>Resistor R2: <span id="r2Value">220</span> Ω</label>
                        <input type="range" id="r2" min="10" max="500" step="10" value="220">
                    </div>

                    <div class="control-group">
                        <label>Resistor R3: <span id="r3Value">330</span> Ω</label>
                        <input type="range" id="r3" min="10" max="500" step="10" value="330">
                    </div>
                </div>

                <div class="sim-panel">
                    <h2>📊 Live Measurements</h2>

                    <div class="meter-grid">
                        <div class="meter">
                            <span>Total Resistance</span>
                            <strong id="seriesTotalR">650 Ω</strong>
                        </div>

                        <div class="meter">
                            <span>Circuit Current</span>
                            <strong id="seriesCurrent">18.46 mA</strong>
                        </div>

                        <div class="meter">
                            <span>Voltage R1</span>
                            <strong id="vR1">1.85 V</strong>
                        </div>

                        <div class="meter">
                            <span>Voltage R2</span>
                            <strong id="vR2">4.06 V</strong>
                        </div>

                        <div class="meter">
                            <span>Voltage R3</span>
                            <strong id="vR3">6.09 V</strong>
                        </div>
                    </div>

                    <div class="formula-box">
                       <div class="formula-box calculation-panel">
    <h3>🧮 Calculation Breakdown</h3>

    <div class="calc-step">
        <h4>1. Equivalent Resistance</h4>
        <p id="calcResistance">Rₑq = R₁ + R₂ + R₃</p>
        <strong id="calcResistanceResult">= 650 Ω</strong>
    </div>

    <div class="calc-step">
        <h4>2. Circuit Current</h4>
        <p id="calcCurrent">I = V / Rₑq</p>
        <strong id="calcCurrentResult">= 18.46 mA</strong>
    </div>

    <div class="calc-step">
        <h4>3. Voltage Distribution</h4>
        <<p id="calcVoltage1">V₁ = I × R₁</p>
        <p id="calcVoltage2">V₂ = I × R₂</p>
        <p id="calcVoltage3">V₃ = I × R₃</p>
    </div>

    <div class="calc-step">
        <h4>4. KVL Verification</h4>
        <<p id="kvlCalculation">V₁ + V₂ + V₃ = V</p>
        <strong id="kvlResult">✓ Kirchhoff's Law Verified</strong>
    </div>
</div>

                <div class="sim-panel circuit-panel">
                    <h2>⚡ Circuit Visualization</h2>

                    <svg viewBox="0 0 600 320" class="circuit-svg">
                        <path class="wire" d="M100 70 H500 V250 H100 V70" />

                        <circle cx="100" cy="160" r="30" fill="#111722" stroke="#54d6b2" stroke-width="3"/>
                        <text x="100" y="155" text-anchor="middle" class="component-text">12V</text>
                        <text x="100" y="175" text-anchor="middle" class="component-text">Battery</text>

                        <rect x="180" y="55" width="65" height="30" rx="5" class="component"/>
                        <text x="212" y="75" text-anchor="middle" class="component-text">R1</text>

                        <rect x="300" y="55" width="65" height="30" rx="5" class="component"/>
                        <text x="332" y="75" text-anchor="middle" class="component-text">R2</text>

                        <rect x="420" y="55" width="65" height="30" rx="5" class="component"/>
                        <text x="452" y="75" text-anchor="middle" class="component-text">R3</text>

                        <circle class="flow-dot" cx="150" cy="70" r="5"/>
                        <circle class="flow-dot" cx="220" cy="70" r="5"/>
                        <circle class="flow-dot" cx="320" cy="70" r="5"/>
                        <circle class="flow-dot" cx="430" cy="70" r="5"/>
                    </svg>

                    <div class="status-box">
                        <span>🟢</span> Circuit connected — current flows through all components.
                    </div>
                </div>
            </div>
        </div>
    `;

    const voltage = document.getElementById("seriesVoltage");
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    function updateSeries() {
        const V = Number(voltage.value);
        const R1 = Number(r1.value);
        const R2 = Number(r2.value);
        const R3 = Number(r3.value);

        const RT = R1 + R2 + R3;
        const I = V / RT;

        document.getElementById("seriesVoltageValue").textContent = V;
        document.getElementById("r1Value").textContent = R1;
        document.getElementById("r2Value").textContent = R2;
        document.getElementById("r3Value").textContent = R3;

        document.getElementById("seriesTotalR").textContent = RT + " Ω";
        document.getElementById("seriesCurrent").textContent = (I * 1000).toFixed(2) + " mA";

        document.getElementById("vR1").textContent = (I * R1).toFixed(2) + " V";
        document.getElementById("vR2").textContent = (I * R2).toFixed(2) + " V";
        document.getElementById("vR3").textContent = (I * R3).toFixed(2) + " V";
    }

    [voltage, r1, r2, r3].forEach(input => {
        input.addEventListener("input", updateSeries);
    });

    updateSeries();
}

function renderTheveninLab() {
    showPage("simulation");

    const main = document.getElementById("main-content");
    if (!main) return;

    main.innerHTML = `
    <div class="sim-page" style="width:100%;max-width:none;margin:0;padding:18px">

        <button class="back-btn" id="thevenin-back">
            ← Back to Experiments
        </button>

        <div class="sim-heading">
            <h1>Thevenin's Theorem & Maximum Power Transfer</h1>
            <p>Adjust the circuit and observe its electrical behaviour.</p>
        </div>

        <div class="thevenin-grid">

            <!-- CONTROLS -->
            <section class="sim-panel" style="padding:18px">
                <h2>⚙️ Circuit Controls</h2>

                <div class="control-row">
                    <label>Supply Voltage: <b id="th-v-label">12 V</b></label>
                    <input id="th-v" type="range" min="1" max="24" value="12" style="width:100%">
                </div>

                <div class="control-row">
                    <label>R1: <b id="th-r1-label">100 Ω</b></label>
                    <input id="th-r1" type="range" min="10" max="1000" step="10" value="100" style="width:100%">
                </div>

                <div class="control-row">
                    <label>R2: <b id="th-r2-label">220 Ω</b></label>
                    <input id="th-r2" type="range" min="10" max="1000" step="10" value="220" style="width:100%">
                </div>

                <div class="control-row">
                    <label style="display:flex;justify-content:space-between;align-items:center;gap:10px">
    <span>Load RL:</span>
    <input id="th-rl-number" type="number" min="1" max="2000" step="1" value="220"
        style="width:100px;padding:6px;border-radius:6px;background:var(--panel2);color:var(--text);border:1px solid var(--border)">
    <b id="th-rl-label">220 Ω</b>
</label>
                    <input id="th-rl" type="range" min="1" max="2000" step="1" value="220" style="width:100%">
                </div>

                <button class="sim-action-btn" id="th-reset" style="margin-top:12px">
                    ↻ Reset Values
                </button>
            </section>

            <!-- CIRCUIT -->
            <section class="sim-panel" style="padding:18px">
                <h2>🔌 Circuit Setup</h2>
            <div style="display:flex;gap:10px;margin-bottom:18px">
    <button id="th-original-btn" class="primary-btn">Original Circuit</button>
    <button id="th-equivalent-btn" class="secondary-btn">Thevenin Equivalent</button>
</div>
<div id="th-original-circuit">
             <svg viewBox="0 0 600 340" style="width:100%;max-width:700px">
    <!-- Main circuit wires -->
    <g stroke="#64748b" stroke-width="3" fill="none" stroke-linecap="round">
        <path d="M100 70 H230"/>
        <path d="M310 70 H500 V270 H100 V210"/>
        <path d="M100 130 V70"/>
        <path d="M100 270 V210"/>

        <!-- R2 branch -->
        <path d="M350 70 V120"/>
        <path d="M350 180 V270"/>

        <!-- Load branch -->
        <path d="M500 70 V120"/>
        <path d="M500 180 V270"/>
    </g>

    <!-- Source -->
    <circle cx="100" cy="170" r="40"
        fill="#17202c" stroke="#66d9b5" stroke-width="3"/>
    <text x="100" y="165" text-anchor="middle"
        fill="#e9eef7" font-size="18">V</text>
    <text x="100" y="188" text-anchor="middle"
        fill="#66d9b5" font-size="13">DC</text>

    <!-- R1 -->
    <rect x="230" y="50" width="80" height="40" rx="5"
        fill="#17202c" stroke="#66d9b5" stroke-width="3"/>
    <text x="270" y="75" text-anchor="middle"
        fill="#e9eef7" font-size="15">R1</text>

    <!-- R2 -->
    <rect x="325" y="120" width="50" height="60" rx="5"
        fill="#17202c" stroke="#66d9b5" stroke-width="3"/>
    <text x="350" y="155" text-anchor="middle"
        fill="#e9eef7" font-size="15">R2</text>

    <!-- Load RL -->
    <rect x="475" y="120" width="50" height="60" rx="5"
        fill="#17202c" stroke="#f4bd50" stroke-width="3"/>
    <text x="500" y="155" text-anchor="middle"
        fill="#e9eef7" font-size="15">RL</text>

    <!-- Values -->
    <text x="270" y="110" text-anchor="middle"
        id="th-svg-r1" fill="#66d9b5" font-size="13">100 Ω</text>
    <text x="350" y="200" text-anchor="middle"
        id="th-svg-r2" fill="#66d9b5" font-size="13">220 Ω</text>
    <text x="500" y="200" text-anchor="middle"
        id="th-svg-rl" fill="#f4bd50" font-size="13">220 Ω</text>
    <text x="100" y="230" text-anchor="middle"
        id="th-svg-v" fill="#66d9b5" font-size="13">12 V</text>

    <!-- Output terminals -->
    <text x="390" y="58" fill="#e9eef7" font-size="12">Output +</text>
    <text x="390" y="292" fill="#e9eef7" font-size="12">Output −</text>
</svg>
</div>
<div id="th-equivalent-circuit" style="display:none">
    <svg viewBox="0 0 600 340" style="width:100%;max-width:700px">
        <!-- Thevenin equivalent circuit wires -->
        <g stroke="#64748b" stroke-width="3" fill="none" stroke-linecap="round">
            <path d="M100 70 H230"/>
            <path d="M310 70 H500 V270 H100 V210"/>
        </g>

        <!-- Thevenin voltage source -->
        <circle cx="100" cy="170" r="40"
            fill="#17202c" stroke="#66d9b5" stroke-width="3"/>
        <text x="100" y="165" text-anchor="middle"
            fill="#e9eef7" font-size="18">Vth</text>
        <text x="100" y="188" text-anchor="middle"
            fill="#66d9b5" font-size="13">DC</text>

        <!-- Thevenin resistance -->
        <rect x="230" y="50" width="80" height="40" rx="5"
            fill="#17202c" stroke="#66d9b5" stroke-width="3"/>
        <text x="270" y="75" text-anchor="middle"
            fill="#e9eef7" font-size="15">Rth</text>

        <!-- Load -->
        <rect x="460" y="120" width="80" height="60" rx="5"
            fill="#17202c" stroke="#f4bd50" stroke-width="3"/>
        <path d="M500 70 V120 M500 180 V270"
            stroke="#64748b" stroke-width="3" fill="none"/>
        <text x="500" y="155" text-anchor="middle"
            fill="#e9eef7" font-size="15">RL</text>

        <!-- Live values -->
        <text x="270" y="110" text-anchor="middle"
            id="th-svg-vth" fill="#66d9b5" font-size="13">Vth = 0 V</text>
        <text x="270" y="35" text-anchor="middle"
            id="th-svg-rth" fill="#66d9b5" font-size="13">Rth = 0 Ω</text>
        <text x="500" y="200" text-anchor="middle"
            id="th-svg-rl2" fill="#f4bd50" font-size="13">RL = 0 Ω</text>
    </svg>
</div>

                <p style="opacity:.75">
                    The load is connected across the output terminals of the resistor network.
                </p>
            </section>

            <!-- LIVE METERS -->
            <section class="sim-panel" style="padding:18px">
                <h2>📊 Live Measurements</h2>

                <div class="meter-grid">
                    <div class="meter">
                        <div class="meter-label">Thevenin Voltage</div>
                        <div class="meter-value" id="th-vth">--</div>
                    </div>

                    <div class="meter">
                        <div class="meter-label">Thevenin Resistance</div>
                        <div class="meter-value" id="th-rth">--</div>
                    </div>

                    <div class="meter">
                        <div class="meter-label">Load Current</div>
                        <div class="meter-value" id="th-i">--</div>
                    </div>

                    <div class="meter">
                        <div class="meter-label">Load Power</div>
                        <div class="meter-value" id="th-p">--</div>
                    </div>
                </div>
            </section>

            <!-- CALCULATIONS -->
            <section class="sim-panel thevenin-calculations" style="padding:18px">
                <h2>🧮 Calculation Breakdown</h2>
                <div id="th-calc" style="line-height:1.8"></div>
            </section>

            <!-- GRAPH -->
            <section class="sim-panel" style="padding:18px;grid-column:1/-1">
                <h2>📈 Maximum Power Transfer</h2>
                <p>Observe how load power changes as load resistance changes.</p>
                <div id="th-chart" style="width:100%;overflow:auto"></div>
                <div id="th-max" style="font-weight:600;margin-top:10px"></div>

<div id="th-mpt-info" style="
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:12px;
    margin-top:16px;
">
    <div class="sim-panel" style="padding:16px">
        <div style="color:var(--muted);font-size:13px">Optimal Load Resistance</div>
        <div id="th-optimal-rl" style="font-size:22px;font-weight:700;color:var(--accent)">-- Ω</div>
    </div>

    <div class="sim-panel" style="padding:16px">
        <div style="color:var(--muted);font-size:13px">Maximum Power Available</div>
        <div id="th-max-power" style="font-size:22px;font-weight:700;color:var(--orange)">-- mW</div>
    </div>

    <div class="sim-panel" style="padding:16px">
        <div style="color:var(--muted);font-size:13px">Current Load Power</div>
        <div id="th-current-power" style="font-size:22px;font-weight:700;color:var(--blue)">-- mW</div>
        <div class="sim-panel" style="padding:16px;margin-top:12px">
    <div style="color:var(--muted);font-size:13px">Maximum Power Efficiency</div>
    <div id="th-mpt-efficiency" style="font-size:22px;font-weight:700;color:var(--purple)">-- %</div>
    <div style="font-size:12px;color:var(--muted);margin-top:6px">
        Current load power compared to the theoretical maximum.
    </div>
</div>
        <div id="th-mpt-status" style="
    margin-top:10px;
    padding:10px;
    border-radius:8px;
    background:var(--panel2);
    font-size:13px;
    color:var(--muted);
">
    Adjust RL to match Rth for maximum power.
</div>
    </div>
</div>
            </section>

        </div>
    </div>
    `;

    const v = document.getElementById("th-v");
    const r1 = document.getElementById("th-r1");
    const r2 = document.getElementById("th-r2");
    const rl = document.getElementById("th-rl");

    function update() {
        const V = Number(v.value);
        const R1 = Number(r1.value);
        const R2 = Number(r2.value);
        const RL = Number(rl.value);

        // Thevenin equivalent
        const Vth = V * R2 / (R1 + R2);
        const Rth = (R1 * R2) / (R1 + R2);

        // Load calculations
        const I = Vth / (Rth + RL);
        const VL = I * RL;
        const PL = I * I * RL;

        // Maximum power transfer
        const Pmax = (Vth * Vth) / (4 * Rth);
        // Maximum Power Transfer values
const optimalRL = Rth;
const currentPowerMilliwatts = PL * 1000;
const mptEfficiency = Pmax > 0 ? (PL / Pmax) * 100 : 0;
const maxPowerMilliwatts = Pmax * 1000;
        const f = (n) => Number(n).toFixed(2);

        // Update labels
        document.getElementById("th-v-label").textContent = V + " V";
        document.getElementById("th-r1-label").textContent = R1 + " Ω";
        document.getElementById("th-r2-label").textContent = R2 + " Ω";
        document.getElementById("th-rl-label").textContent = RL + " Ω";

        document.getElementById("th-svg-v").textContent = V + " V";
        document.getElementById("th-svg-r1").textContent = R1 + " Ω";
        document.getElementById("th-svg-vth").textContent = "Vth = " + f(Vth) + " V";
document.getElementById("th-svg-rth").textContent = "Rth = " + f(Rth) + " Ω";
document.getElementById("th-svg-rl2").textContent = "RL = " + RL + " Ω";
        document.getElementById("th-svg-r2").textContent = R2 + " Ω";
        document.getElementById("th-svg-rl").textContent = RL + " Ω";

        // Update meters
        document.getElementById("th-vth").textContent = f(Vth) + " V";
        document.getElementById("th-rth").textContent = f(Rth) + " Ω";
        document.getElementById("th-i").textContent = f(I * 1000) + " mA";
        document.getElementById("th-p").textContent = f(PL * 1000) + " mW";
        // Maximum Power Transfer display
document.getElementById("th-optimal-rl").textContent = f(optimalRL) + " Ω";
document.getElementById("th-max-power").textContent = f(maxPowerMilliwatts) + " mW";
document.getElementById("th-current-power").textContent = f(currentPowerMilliwatts) + " mW";
document.getElementById("th-mpt-efficiency").textContent = f(mptEfficiency) + " %";

// Maximum Power Transfer status
const mptStatus = document.getElementById("th-mpt-status");

if (Math.abs(RL - Rth) < 0.01) {
    mptStatus.textContent = "🎯 Maximum power transfer! RL matches Rth.";
    mptStatus.style.color = "var(--accent)";
} else if (RL < Rth) {
    mptStatus.textContent = "⬇️ Load resistance is below the optimum. Increase RL.";
    mptStatus.style.color = "var(--blue)";
} else {
    mptStatus.textContent = "⬆️ Load resistance is above the optimum. Decrease RL.";
    mptStatus.style.color = "var(--orange)";
}
        // Calculation breakdown
        document.getElementById("th-calc").innerHTML = `
            <p><b>1. Thevenin Voltage</b><br>
            Vth = V × R2 / (R1 + R2)<br>
            = ${V} × ${R2} / (${R1} + ${R2})<br>
            = <b>${f(Vth)} V</b></p>

            <p><b>2. Thevenin Resistance</b><br>
            Rth = R1 × R2 / (R1 + R2)<br>
            = ${R1} × ${R2} / (${R1} + ${R2})<br>
            = <b>${f(Rth)} Ω</b></p>

            <p><b>3. Load Current</b><br>
            I = Vth / (Rth + RL)<br>
            = ${f(Vth)} / (${f(Rth)} + ${RL})<br>
            = <b>${f(I * 1000)} mA</b></p>

            <p><b>4. Load Voltage</b><br>
            VL = I × RL<br>
            = ${f(I)} × ${RL}<br>
            = <b>${f(VL)} V</b></p>

            <p><b>5. Load Power</b><br>
            PL = I² × RL<br>
            = <b>${f(PL * 1000)} mW</b></p>
        `;

        // Power curve
        const points = [];
        const maxX = 2000;
        let peakPower = 0;

        for (let k = 0; k <= 60; k++) {
            const x = 10 + (maxX - 10) * k / 60;
            const p = (Vth * Vth * x) / ((Rth + x) * (Rth + x));

            points.push({ x, p });
            if (p > peakPower) peakPower = p;
        }

        const W = 720;
        const H = 250;
        const pad = 48;
        const maxY = peakPower * 1.12 || 1;

        const path = points.map((pt, i) => {
            const x = pad + (pt.x - 10) / (maxX - 10) * (W - pad - 15);
            const y = H - pad - (pt.p / maxY) * (H - pad - 25);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        }).join(" ");

        const peakX = pad + (Rth - 10) / (maxX - 10) * (W - pad - 15);
        const peakY = H - pad - (Pmax / maxY) * (H - pad - 25);

        document.getElementById("th-chart").innerHTML = `
            <svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:520px;max-width:760px">
                <path d="M ${pad} 20 V ${H-pad} H ${W-12}"
                    fill="none" stroke="currentColor" stroke-opacity=".5"/>
                <path d="${path}" fill="none" stroke="#4fc3a1" stroke-width="3"/>
                <circle cx="${peakX}" cy="${peakY}" r="5" fill="#f4bd50"/>
                <text x="${pad}" y="${H-12}" fill="currentColor" font-size="12">Low RL</text>
                <text x="${W-110}" y="${H-12}" fill="currentColor" font-size="12">High RL</text>
                <text x="${Math.max(pad,peakX-30)}" y="${Math.max(18,peakY-12)}"
                    fill="currentColor" font-size="12">Peak Power</text>
            </svg>
        `;

        document.getElementById("th-max").textContent =
            `Maximum Power Transfer occurs when RL = Rth = ${f(Rth)} Ω. ` +
            `Theoretical maximum load power = ${f(Pmax * 1000)} mW`;
    }

    // Sliders
   [v, r1, r2, rl].forEach(input => {
    input.addEventListener("input", update);
});

// RL slider and number box sync
const rlNumber = document.getElementById("th-rl-number");

rl.addEventListener("input", () => {
    rlNumber.value = rl.value;
});

rlNumber.addEventListener("input", () => {
    let value = Number(rlNumber.value);

    if (value >= 1 && value <= 2000) {
        rl.value = value;
        update();
    }
});
    // Circuit view switching
const originalBtn = document.getElementById("th-original-btn");
const equivalentBtn = document.getElementById("th-equivalent-btn");
const originalCircuit = document.getElementById("th-original-circuit");
const equivalentCircuit = document.getElementById("th-equivalent-circuit");

originalBtn.addEventListener("click", () => {
    originalCircuit.style.display = "block";
    equivalentCircuit.style.display = "none";

    originalBtn.classList.add("active");
    equivalentBtn.classList.remove("active");
});

equivalentBtn.addEventListener("click", () => {
    originalCircuit.style.display = "none";
    equivalentCircuit.style.display = "block";

    equivalentBtn.classList.add("active");
    originalBtn.classList.remove("active");
});
    // Reset
    document.getElementById("th-reset").addEventListener("click", () => {
        v.value = 12;
        r1.value = 100;
        r2.value = 220;
        rl.value = 220;
        update();
    });

    // Back button
    document.getElementById("thevenin-back").addEventListener("click", () => {
        renderDashboard();
        showPage("experiments");
    });

    update();
}
let energyRunning = false;
let energyDiscSpeed = 0;
function renderEnergyMeterLab() {
    const main = document.getElementById("main-content");

    main.innerHTML = `
        <div class="sim-page energy-lab">
            <div class="sim-header">
                <button class="back-btn" onclick="renderDashboard()">← Back</button>
                <h1>Energy Meter Calibration Lab</h1>
                <p>Interactive 3D Electrical Measurement Workbench</p>
            </div>

            <div class="energy-panel">
                <h2>3D Circuit Workbench</h2>
                <p>Rotate: Drag | Zoom: Scroll</p>

                <div class="energy-workspace" id="energy3D"></div>

<div class="energy-panel energy-controls">
    <h2>Simulation Controls</h2>

    <label>Supply Voltage (V)</label>
    <input type="number" id="energyVoltage" value="230" min="0" max="300">

    <label>Load Resistance (Ω)</label>
    <input type="number" id="energyResistance" value="100" min="1" max="10000">

    <label>Power Factor</label>
    <input type="number" id="energyPF" value="1" min="0.1" max="1" step="0.01">

    <div class="energy-toolbar">
    <button id="energyRunBtn" class="back-btn">▶ Start</button>
    <button id="energyStopBtn" class="back-btn">⏸ Stop</button>
    <button id="energyResetBtn" class="back-btn">↻ Reset</button>
</div>
</div>
            </div>

           <div class="energy-panel">
    <h2>Live Measurements</h2>
    <div class="energy-grid">
        <div class="energy-stat">
            <span>Voltage</span>
            <strong id="energyVoltageDisplay">230 V</strong>
        </div>

        <div class="energy-stat">
            <span>Current</span>
            <strong id="energyCurrentDisplay">0.00 A</strong>
        </div>

        <div class="energy-stat">
            <span>Real Power</span>
            <strong id="energyPowerDisplay">0 W</strong>
        </div>

        <div class="energy-stat">
            <span>Energy Consumed</span>
            <strong id="energyConsumedDisplay">0.000 kWh</strong>
        </div>

        <div class="energy-stat">
            <span>Elapsed Time</span>
            <strong id="energyElapsedDisplay">0 s</strong>
        </div>
    </div>

<div class="energy-panel">
    <h2>Meter Calibration</h2>
    <p>Compare the reference energy with the energy recorded by the meter.</p>
    <div class="energy-control">
    <label for="meterAccuracy">Simulated Meter Error (%)</label>
    <input
        type="number"
        id="meterAccuracy"
        value="-2"
        min="-20"
        max="20"
        step="0.1"
    >
    <small>Negative = under-registration | Positive = over-registration</small>
</div>
    <div class="energy-grid">
        <div class="energy-stat">
            <span>Reference Energy (kWh)</span>
            <strong id="referenceEnergy">0.000000</strong>
        </div>

        <div class="energy-stat">
            <span>Meter Energy (kWh)</span>
            <strong id="meterEnergy">0.000000</strong>
        </div>

        <div class="energy-stat">
            <span>Percentage Error</span>
            <strong id="meterError">—</strong>
        </div>

        <div class="energy-stat">
            <span>Correction Factor</span>
            <strong id="meterCorrection">—</strong>
        </div>

        <div class="energy-stat">
            <span>Calibration Status</span>
            <strong id="calibrationStatus">Not Started</strong>
        </div>
    </div>
</div>
</div>
        </div>
    `;

    initEnergy3D();
    // Energy Meter Simulation Calculations
const runBtn = document.getElementById("energyRunBtn");


let energyStartTime = null;
let energyTotalKWh = 0;
let energyElapsedTotal = 0;
let energyLastUpdate = null;

runBtn.addEventListener("click", () => {
    const V = parseFloat(document.getElementById("energyVoltage").value);
    const R = parseFloat(document.getElementById("energyResistance").value);
    const PF = parseFloat(document.getElementById("energyPF").value);

    if (!Number.isFinite(V) || !Number.isFinite(R) || !Number.isFinite(PF) ||
        V <= 0 || R <= 0 || PF <= 0 || PF > 1) {
        alert("Please enter valid electrical values.");
        return;
    }

    const I = V / R;
    const P = V * I * PF;
    energyDiscSpeed = P * 0.00002;

    energyRunning = true;
    energyStartTime = Date.now();
    energyElapsedTotal = 0;
    energyLastUpdate = Date.now();

    document.getElementById("energyVoltageDisplay").textContent = V.toFixed(1) + " V";
    document.getElementById("energyCurrentDisplay").textContent = I.toFixed(3) + " A";
    document.getElementById("energyPowerDisplay").textContent = P.toFixed(2) + " W";

    alert("Simulation Started!");
});

// Stop Simulation
document.getElementById("energyStopBtn").addEventListener("click", () => {
    if (energyRunning) {
        updateEnergyMeter();
        energyRunning = false;
    }
});

// Reset Simulation
document.getElementById("energyResetBtn").addEventListener("click", () => {
    energyRunning = false;
    energyStartTime = null;
    energyLastUpdate = null;
    energyTotalKWh = 0;

    document.getElementById("energyVoltageDisplay").textContent = "0 V";
    document.getElementById("energyCurrentDisplay").textContent = "0 A";
    document.getElementById("energyPowerDisplay").textContent = "0 W";
    document.getElementById("energyConsumedDisplay").textContent = "0.000000 kWh";
    document.getElementById("energyElapsedDisplay").textContent = "0 s";
});

function updateEnergyMeter() {
    if (!energyRunning) return;

    const now = Date.now();
    const deltaSeconds = (now - energyLastUpdate) / 1000;
    energyLastUpdate = now;

    const V = parseFloat(document.getElementById("energyVoltage").value);
    const R = parseFloat(document.getElementById("energyResistance").value);
    const PF = parseFloat(document.getElementById("energyPF").value);

    const I = V / R;
    const P = V * I * PF;

    // Reference energy calculation
    energyTotalKWh += (P * deltaSeconds) / 3600000;

    energyElapsedTotal += deltaSeconds;
    const elapsedSeconds = Math.floor(energyElapsedTotal);

    // Simulated meter error: 2% under-registration
    const referenceEnergy = energyTotalKWh;
    const accuracyInput = parseFloat(
    document.getElementById("meterAccuracy").value
);

const meterEnergy = referenceEnergy * (1 + accuracyInput / 100);

    // Calibration calculations
    const errorPercent = referenceEnergy > 0
        ? ((meterEnergy - referenceEnergy) / referenceEnergy) * 100
        : 0;

    const correctionFactor = meterEnergy > 0
        ? referenceEnergy / meterEnergy
        : 0;

    // Update live measurements
    document.getElementById("energyConsumedDisplay").textContent =
        referenceEnergy.toFixed(6) + " kWh";

    document.getElementById("energyElapsedDisplay").textContent =
        elapsedSeconds + " s";

    // Update calibration panel
    document.getElementById("referenceEnergy").textContent =
        referenceEnergy.toFixed(6);

    document.getElementById("meterEnergy").textContent =
        meterEnergy.toFixed(6);

    document.getElementById("meterError").textContent =
        errorPercent.toFixed(2) + " %";

    document.getElementById("meterCorrection").textContent =
        correctionFactor.toFixed(4);

    document.getElementById("calibrationStatus").textContent =
        errorPercent < 0 ? "Under-registering" :
        errorPercent > 0 ? "Over-registering" :
        "Accurate";
}

setInterval(updateEnergyMeter, 1000);
}

function initEnergy3D() {
    const container = document.getElementById("energy3D");

    if (!container || typeof THREE === "undefined") {
        console.error("Three.js or workspace not found");
        return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);

    const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(7, 6, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 10, 7);
    scene.add(light);

    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.2, 7),
        new THREE.MeshStandardMaterial({ color: 0x26354b })
    );

    floor.position.y = -0.2;
    scene.add(floor);

    // Energy meter body
const meter = new THREE.Group();

// Main casing
const casing = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.7, 1.2),
    new THREE.MeshStandardMaterial({ color: 0xdfe6ed, roughness: 0.65 })
);
meter.add(casing);

// Meter display face
const face = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 1.1, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x172033 })
);
face.position.set(0, 0.15, 0.64);
meter.add(face);

// Dial window
const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.08, 32),
    new THREE.MeshStandardMaterial({ color: 0x29c7a8 })
);
dial.rotation.x = Math.PI / 2;
dial.position.set(-0.48, 0.25, 0.72);
meter.add(dial);

// Display reading window
const display = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.28, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x9affc8 })
);
display.position.set(0.48, 0.45, 0.72);
meter.add(display);

// Meter label plate
const labelPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.22, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xffb74d })
);
labelPlate.position.set(0.45, -0.05, 0.72);
meter.add(labelPlate);

// Bottom terminals
for (let i = 0; i < 4; i++) {
    const terminal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.18, 20),
        new THREE.MeshStandardMaterial({ color: 0xc5ccd5, metalness: 0.8, roughness: 0.3 })
    );

    terminal.rotation.x = Math.PI / 2;
    terminal.position.set(-0.75 + i * 0.5, -0.95, 0.25);
    meter.add(terminal);
}

meter.position.set(0, 0.85, 0);
scene.add(meter);

// AC Supply Unit
const supply = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x2878d0 })
);
supply.position.set(-3, 0.75, 0);
scene.add(supply);

// Supply dial
const supplyDial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.12, 32),
    new THREE.MeshStandardMaterial({ color: 0x182435 })
);
supplyDial.rotation.x = Math.PI / 2;
supplyDial.position.set(-3, 0.95, 0.65);
scene.add(supplyDial);

// Load Unit
const loadUnit = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x38a779 })
);
loadUnit.position.set(3, 0.75, 0);
scene.add(loadUnit);

// Load adjustment knob
const loadKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.12, 32),
    new THREE.MeshStandardMaterial({ color: 0x182435 })
);
loadKnob.rotation.x = Math.PI / 2;
loadKnob.position.set(3, 0.95, 0.65);
scene.add(loadKnob);

// Connecting wires
function makeWire(points, color) {
    const curve = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(p[0], p[1], p[2]))
    );

    const wire = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 32, 0.045, 8, false),
        new THREE.MeshStandardMaterial({ color: color })
    );

    scene.add(wire);
}

// Supply to meter
makeWire([
    [-2.25, 1.0, 0.4],
    [-1.8, 1.8, 0.4],
    [-1.2, 1.8, 0.4],
    [-1.0, 1.4, 0.4]
], 0xff4545);

// Meter to load
makeWire([
    [1.0, 1.4, 0.4],
    [1.4, 1.8, 0.4],
    [2.0, 1.8, 0.4],
    [2.25, 1.0, 0.4]
], 0x38d6a5);

    function animate() {
    requestAnimationFrame(animate);

    if (energyRunning) {
        dial.rotation.z += energyDiscSpeed;
    }

    renderer.render(scene, camera);
}

    animate();

    let dragging = false;
    let previousX = 0;
    let previousY = 0;

    renderer.domElement.addEventListener("mousedown", (e) => {
        dragging = true;
        previousX = e.clientX;
        previousY = e.clientY;
    });

    window.addEventListener("mouseup", () => dragging = false);

    renderer.domElement.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const dx = e.clientX - previousX;
        const dy = e.clientY - previousY;

        scene.rotation.y += dx * 0.01;
        scene.rotation.x += dy * 0.01;

        previousX = e.clientX;
        previousY = e.clientY;
    });

    renderer.domElement.addEventListener("wheel", (e) => {
        camera.position.multiplyScalar(e.deltaY > 0 ? 1.1 : 0.9);
    });
}