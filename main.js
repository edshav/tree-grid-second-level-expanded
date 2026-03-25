const blocks = [
  {
    height: 891042,
    size: "14.2 kB",
    votes: 5,
    tkt: 3,
    rev: 1,
    age: "2m 14s",
    rows: [
      { type: "VAR", txn: 4, amt: "6.2501", size: "1.1 kB", subs: [] },
      {
        type: "SKA",
        txn: 3,
        amt: "6.6343",
        size: "3.8 kB",
        subs: [
          { coin: "SKA-1", txn: 1, amt: "1.0000", size: "312 B" },
          { coin: "SKA-2", txn: 1, amt: "2.3120", size: "298 B" },
          { coin: "SKA-3", txn: 1, amt: "3.3223", size: "315 B" },
        ],
      },
    ],
  },
  {
    height: 891041,
    size: "9.6 kB",
    votes: 5,
    tkt: 1,
    rev: 0,
    age: "4m 07s",
    rows: [
      { type: "VAR", txn: 2, amt: "4.0000", size: "890 B", subs: [] },
      {
        type: "SKA",
        txn: 2,
        amt: "6.5021",
        size: "2.1 kB",
        subs: [
          { coin: "SKA-1", txn: 1, amt: "3.2500", size: "320 B" },
          { coin: "SKA-7", txn: 1, amt: "3.2521", size: "301 B" },
        ],
      },
    ],
  },
  {
    height: 891040,
    size: "6.3 kB",
    votes: 4,
    tkt: 2,
    rev: 2,
    age: "6m 51s",
    rows: [
      { type: "VAR", txn: 3, amt: "3.9100", size: "750 B", subs: [] },
      {
        type: "SKA",
        txn: 7,
        amt: "4.2400",
        size: "1.7 kB",
        subs: [
          { coin: "SKA-1", txn: 2, amt: "1.1200", size: "290 B" },
          { coin: "SKA-4", txn: 1, amt: "1.5600", size: "278 B" },
          { coin: "SKA-12", txn: 3, amt: "0.8800", size: "260 B" },
          { coin: "SKA-19", txn: 1, amt: "0.6800", size: "255 B" },
        ],
      },
    ],
  },
  {
    height: 891039,
    size: "18.1 kB",
    votes: 5,
    tkt: 4,
    rev: 0,
    age: "9m 33s",
    rows: [
      { type: "VAR", txn: 6, amt: "10.3100", size: "3.3 kB", subs: [] },
      {
        type: "SKA",
        txn: 9,
        amt: "5.0110",
        size: "4.2 kB",
        subs: [
          { coin: "SKA-2", txn: 2, amt: "0.9500", size: "310 B" },
          { coin: "SKA-5", txn: 1, amt: "1.2300", size: "295 B" },
          { coin: "SKA-11", txn: 3, amt: "1.4100", size: "308 B" },
          { coin: "SKA-23", txn: 2, amt: "0.7200", size: "280 B" },
          { coin: "SKA-47", txn: 1, amt: "0.7010", size: "272 B" },
        ],
      },
    ],
  },
  {
    height: 891038,
    size: "11.4 kB",
    votes: 3,
    tkt: 2,
    rev: 1,
    age: "12m 05s",
    rows: [
      { type: "VAR", txn: 5, amt: "7.6600", size: "2.0 kB", subs: [] },
      {
        type: "SKA",
        txn: 4,
        amt: "3.7800",
        size: "2.5 kB",
        subs: [
          { coin: "SKA-3", txn: 2, amt: "1.5000", size: "330 B" },
          { coin: "SKA-8", txn: 2, amt: "2.2800", size: "310 B" },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   STATE
   "b{i}"     → block i expanded (L1 → L2)
   "b{i}r{j}" → block i, row j (SKA) expanded (L2 → L3)
───────────────────────────────────────────────────────────────────────── */
const state = {};

/* ── Shared dash cell ──────────────────────────────────────────────────── */
const DASH = `<td class="r"><div class="dash">—</div></td>`;

/* ─────────────────────────────────────────────────────────────────────────
   RENDER
───────────────────────────────────────────────────────────────────────── */
function render() {
  const tbody = document.getElementById("tbody");
  let html = "";

  blocks.forEach((block, bi) => {
    const bKey = "b" + bi;
    const bOpen = !!state[bKey];
    const vr = block.rows.find((r) => r.type === "VAR");
    const sr = block.rows.find((r) => r.type === "SKA");

    /* ── Level 1: Height (root) row ──────────────────────────────────── */
    html += `
      <tr class="row-root" data-key="${bKey}">
        <td class="l">
          <div class="cell">
            <span class="caret${bOpen ? " open" : ""}" data-key="${bKey}">&#9658;</span>
            <a href="#" class="link" style="font-weight:700">#${block.height.toLocaleString()}</a>
          </div>
        </td>
        <td class="r">
          <div class="cell num" title="Total transactions (VAR + SKA)">
            ${(vr ? vr.txn : 0) + (sr ? sr.txn : 0)}
          </div>
        </td>
        <td class="r"><div class="cell num">${vr ? vr.amt : "—"}</div></td>
        <td class="r"><div class="cell num">${sr ? sr.amt : "—"}</div></td>
        <td class="r"><div class="cell num">${block.size}</div></td>
        <td class="r"><div class="cell num">${block.votes}</div></td>
        <td class="r"><div class="cell num">${block.tkt}</div></td>
        <td class="r"><div class="cell num">${block.rev}</div></td>
        <td class="r"><div class="cell num" style="color:var(--text-secondary)">${block.age}</div></td>
      </tr>`;

    /* ── Level 2: VAR + SKA rows ─────────────────────────────────────── */
    if (bOpen) {
      block.rows.forEach((row) => {
        // ── VAR row (unchanged)
        if (row.type === "VAR") {
          html += `
      <tr class="row-txn">
        <td class="l"><div class="cell i1"><span class="caret leaf"></span></div></td>
        <td class="r">
          <div class="cell num i1" style="justify-content:flex-end;gap:4px">
            <span class="badge bv">VAR</span>
            ${row.txn}
          </div>
        </td>
        <td class="r"><div class="cell num">${row.amt}</div></td>
        ${DASH}
        <td class="r"><div class="cell num">${row.size}</div></td>
        ${DASH}${DASH}${DASH}${DASH}
      </tr>`;
        }

        // ── SKA → render ONLY subs (no parent row)
        if (row.type === "SKA") {
          row.subs.forEach((sub) => {
            html += `
        <tr class="row-sub">
          <td class="l"><div class="cell i1"><span class="caret leaf"></span></div></td>
          <td class="r">
            <div class="cell i1" style="justify-content:flex-end;gap:4px">
              <span class="badge bsu">${sub.coin}</span>
              ${sub.txn}
            </div>
          </td>
          ${DASH}
          <td class="r"><div class="cell num">${sub.amt}</div></td>
          <td class="r"><div class="cell num">${sub.size}</div></td>
          ${DASH}${DASH}${DASH}${DASH}
        </tr>`;
          });
        }
      });
    }

    /* visual gap between blocks */
    html += `<tr class="row-sep"><td colspan="9"></td></tr>`;
  });

  tbody.innerHTML = html;
  attachCarets();
  attachRowClicks();
}

function attachRowClicks() {
  document.querySelectorAll("tr[data-key]").forEach((row) => {
    row.addEventListener("click", (e) => {
      // prevent double-trigger when clicking caret
      if (e.target.closest(".caret")) return;
      // Ignore clicks on links
      if (e.target.closest("a")) return;

      const key = row.dataset.key;
      state[key] = !state[key];
      render();
    });
  });
}

/* ── Caret listeners ────────────────────────────────────────────────────── */
function attachCarets() {
  document.querySelectorAll(".caret[data-key]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation(); // 👈 prevent row click
      e.preventDefault();

      state[el.dataset.key] = !state[el.dataset.key];
      render();
    });
  });
}



/* ── Boot ───────────────────────────────────────────────────────────────── */
render();
