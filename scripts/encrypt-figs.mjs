// encrypt-figs.mjs — build and encrypt operator console HTML files
// Usage: node scripts/encrypt-figs.mjs <password>
// Output: public/axehead_console.enc.json, public/cartographer.enc.json, public/redoubt_visual.enc.json

import { webcrypto } from 'crypto'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const subtle = webcrypto.subtle
const getRandomValues = buf => webcrypto.getRandomValues(buf)
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const PASSWORD = process.argv[2]
if (!PASSWORD) { console.error('Usage: node scripts/encrypt-figs.mjs <password>'); process.exit(1) }

const ITERS = 600000

// ── HTML templates ────────────────────────────────────────────────────────────

const AXEHEAD_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AXEHEAD · Operator Console</title><style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1410;--bg2:#131b16;--bg3:#1a221c;--line:#2a3329;--line2:#3a4438;--fg:#e0e0d8;--fg2:#aab1a3;--fg3:#6b7563;--olive:#6b7a5a;--olive2:#9aa884;--olive3:#c4cfa8;--warn:#d4a23a;--crit:#c4533a;--ok:#7a9a5a;--mono:'JetBrains Mono',ui-monospace,monospace}
html,body{height:100%;background:var(--bg);color:var(--fg);font-family:var(--mono);font-size:12px;overflow:hidden}
.shell{display:grid;grid-template-rows:auto 1fr auto;height:100%;padding:0}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid var(--line);background:var(--bg2)}
.topbar-id{color:var(--olive3);letter-spacing:.14em;font-size:11px}
.topbar-status{display:flex;gap:16px;font-size:10px;color:var(--fg3);letter-spacing:.1em}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--ok);margin-right:5px;animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.main{display:grid;grid-template-columns:220px 1fr;gap:0;overflow:hidden}
.sidebar{border-right:1px solid var(--line);background:var(--bg2);overflow-y:auto;padding:12px 0}
.nav-item{padding:7px 14px;cursor:pointer;color:var(--fg3);letter-spacing:.1em;font-size:11px;border-left:2px solid transparent;transition:.15s}
.nav-item:hover{color:var(--fg2);background:var(--bg3)}
.nav-item.active{color:var(--olive3);border-left-color:var(--olive2);background:var(--bg3)}
.nav-label{font-size:9px;color:var(--fg3);letter-spacing:.14em;padding:14px 14px 4px;text-transform:uppercase}
.content{overflow-y:auto;padding:16px}
.panel{display:none}.panel.active{display:block}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--line)}
.panel-title{color:var(--olive3);letter-spacing:.16em;font-size:11px}
.panel-ts{color:var(--fg3);font-size:10px}
.metric-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
.metric{background:var(--bg2);border:1px solid var(--line);padding:10px 12px}
.metric-label{font-size:9px;color:var(--fg3);letter-spacing:.12em;margin-bottom:4px;text-transform:uppercase}
.metric-val{font-size:20px;color:var(--fg);letter-spacing:-.01em}
.metric-sub{font-size:9px;color:var(--fg3);margin-top:2px}
.metric-val.ok{color:var(--ok)}.metric-val.warn{color:var(--warn)}.metric-val.crit{color:var(--crit)}
.tbl{width:100%;border-collapse:collapse;font-size:11px}
.tbl th{text-align:left;color:var(--fg3);font-weight:400;letter-spacing:.1em;font-size:9px;padding:6px 8px;border-bottom:1px solid var(--line);text-transform:uppercase}
.tbl td{padding:7px 8px;border-bottom:1px solid var(--line);color:var(--fg2);vertical-align:middle}
.tbl tr:last-child td{border-bottom:0}
.tbl tr:hover td{background:var(--bg3)}
.badge{display:inline-block;padding:2px 6px;font-size:9px;letter-spacing:.08em;border:1px solid}
.badge-ok{color:var(--ok);border-color:var(--ok)}
.badge-warn{color:var(--warn);border-color:var(--warn)}
.badge-crit{color:var(--crit);border-color:var(--crit)}
.badge-dim{color:var(--fg3);border-color:var(--line2)}
.bar-wrap{background:var(--line);height:4px;border-radius:2px;overflow:hidden;width:80px;display:inline-block;vertical-align:middle}
.bar-fill{height:100%;background:var(--olive2);transition:.4s}
.bar-fill.warn{background:var(--warn)}.bar-fill.crit{background:var(--crit)}
.log{background:var(--bg2);border:1px solid var(--line);padding:10px;max-height:180px;overflow-y:auto;font-size:10px;line-height:1.8}
.log-line{color:var(--fg3)}.log-line .ts{color:var(--olive);margin-right:8px}.log-line .ok{color:var(--ok)}.log-line .warn{color:var(--warn)}
.bottombar{padding:6px 14px;border-top:1px solid var(--line);background:var(--bg2);display:flex;justify-content:space-between;font-size:10px;color:var(--fg3);letter-spacing:.08em}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--line2);border-radius:2px}::-webkit-scrollbar-thumb:hover{background:var(--olive2)}*{scrollbar-width:thin;scrollbar-color:var(--line2) var(--bg)}
</style></head><body>
<div class="shell">
  <div class="topbar">
    <span class="topbar-id">AXEHEAD · OPERATOR CONSOLE / AX-001</span>
    <div class="topbar-status">
      <span><span class="dot"></span>LIVE</span>
      <span id="clock">--:--:-- UTC</span>
      <span>ENG CADRE · 4 ACTIVE</span>
    </div>
  </div>
  <div class="main">
    <div class="sidebar">
      <div class="nav-label">Operations</div>
      <div class="nav-item active" data-panel="overview">/ Overview</div>
      <div class="nav-item" data-panel="vectors">/ Attack Vectors</div>
      <div class="nav-item" data-panel="gaps">/ Gap Report</div>
      <div class="nav-label">Audit</div>
      <div class="nav-item" data-panel="auth">/ Authorization Log</div>
      <div class="nav-item" data-panel="timeline">/ Engagement Timeline</div>
    </div>
    <div class="content">

      <div class="panel active" id="panel-overview">
        <div class="panel-head">
          <span class="panel-title">ENGAGEMENT OVERVIEW</span>
          <span class="panel-ts" id="ts-overview"></span>
        </div>
        <div class="metric-row">
          <div class="metric"><div class="metric-label">Posture Score</div><div class="metric-val warn" id="score">72</div><div class="metric-sub">/ 100 · MARGINAL</div></div>
          <div class="metric"><div class="metric-label">Gaps Found</div><div class="metric-val crit" id="gaps">14</div><div class="metric-sub">3 CRITICAL</div></div>
          <div class="metric"><div class="metric-label">Coverage</div><div class="metric-val ok">91%</div><div class="metric-sub">OF ATTACK SURFACE</div></div>
        </div>
        <table class="tbl">
          <thead><tr><th>Domain</th><th>Vectors Tested</th><th>Findings</th><th>Risk</th><th>Progress</th></tr></thead>
          <tbody>
            <tr><td>Perimeter</td><td>38</td><td>4</td><td><span class="badge badge-crit">CRITICAL</span></td><td><div class="bar-wrap"><div class="bar-fill crit" style="width:100%"></div></div></td></tr>
            <tr><td>Identity</td><td>22</td><td>5</td><td><span class="badge badge-warn">HIGH</span></td><td><div class="bar-wrap"><div class="bar-fill warn" style="width:80%"></div></div></td></tr>
            <tr><td>Cloud Posture</td><td>17</td><td>2</td><td><span class="badge badge-warn">HIGH</span></td><td><div class="bar-wrap"><div class="bar-fill warn" style="width:65%"></div></div></td></tr>
            <tr><td>OT / ICS</td><td>9</td><td>3</td><td><span class="badge badge-warn">MED</span></td><td><div class="bar-wrap"><div class="bar-fill" style="width:50%"></div></div></td></tr>
            <tr><td>Insider Surface</td><td>11</td><td>0</td><td><span class="badge badge-ok">CLEAR</span></td><td><div class="bar-wrap"><div class="bar-fill ok" style="width:100%;background:var(--ok)"></div></div></td></tr>
          </tbody>
        </table>
      </div>

      <div class="panel" id="panel-vectors">
        <div class="panel-head">
          <span class="panel-title">ATTACK VECTORS</span>
          <span class="panel-ts" id="ts-vectors"></span>
        </div>
        <table class="tbl">
          <thead><tr><th>#</th><th>Vector</th><th>Technique</th><th>Status</th><th>Finding</th></tr></thead>
          <tbody>
            <tr><td>V-001</td><td>Perimeter</td><td>External Recon + Port Scan</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-dim">HARDENED</span></td></tr>
            <tr><td>V-002</td><td>Perimeter</td><td>Legacy VPN Endpoint</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-crit">CVE OPEN</span></td></tr>
            <tr><td>V-003</td><td>Identity</td><td>Password Spray · Entra ID</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-crit">BREACHED</span></td></tr>
            <tr><td>V-004</td><td>Identity</td><td>MFA Bypass Attempt</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-warn">PARTIAL</span></td></tr>
            <tr><td>V-005</td><td>Cloud</td><td>S3 Bucket Enum</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-warn">EXPOSED</span></td></tr>
            <tr><td>V-006</td><td>Cloud</td><td>IAM Privilege Escalation</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-dim">BLOCKED</span></td></tr>
            <tr><td>V-007</td><td>OT/ICS</td><td>Modbus / DNP3 Recon</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-warn">VISIBLE</span></td></tr>
            <tr><td>V-008</td><td>Lateral</td><td>Kerberoasting</td><td><span class="badge badge-ok">COMPLETE</span></td><td><span class="badge badge-crit">HASH CAPTURED</span></td></tr>
            <tr><td>V-009</td><td>Exfil</td><td>C2 Beacon Egress</td><td><span class="badge badge-dim">IN PROGRESS</span></td><td>—</td></tr>
          </tbody>
        </table>
      </div>

      <div class="panel" id="panel-gaps">
        <div class="panel-head">
          <span class="panel-title">GAP REPORT — SEALED</span>
          <span class="panel-ts" id="ts-gaps"></span>
        </div>
        <table class="tbl">
          <thead><tr><th>ID</th><th>Finding</th><th>Blast Radius</th><th>Remediation</th><th>ETA</th></tr></thead>
          <tbody>
            <tr><td>GAP-001</td><td>Legacy VPN · unpatched CVE-2024-3400</td><td><span class="badge badge-crit">CRITICAL</span></td><td>Patch / Migrate</td><td>48h</td></tr>
            <tr><td>GAP-002</td><td>Entra ID password spray — 3 accounts</td><td><span class="badge badge-crit">CRITICAL</span></td><td>MFA enforce + SSPR</td><td>24h</td></tr>
            <tr><td>GAP-003</td><td>AD hash extraction via Kerberoast</td><td><span class="badge badge-crit">CRITICAL</span></td><td>SPN audit + AES-only</td><td>72h</td></tr>
            <tr><td>GAP-004</td><td>S3 bucket public read — config archive</td><td><span class="badge badge-warn">HIGH</span></td><td>Block public access</td><td>4h</td></tr>
            <tr><td>GAP-005</td><td>MFA fatigue successful on 1 account</td><td><span class="badge badge-warn">HIGH</span></td><td>Number matching MFA</td><td>24h</td></tr>
            <tr><td>GAP-006</td><td>OT network visible from corp segment</td><td><span class="badge badge-warn">MED</span></td><td>VLAN isolation</td><td>1w</td></tr>
          </tbody>
        </table>
      </div>

      <div class="panel" id="panel-auth">
        <div class="panel-head">
          <span class="panel-title">AUTHORIZATION LOG</span>
          <span class="panel-ts" id="ts-auth"></span>
        </div>
        <div class="log" id="auth-log"></div>
      </div>

      <div class="panel" id="panel-timeline">
        <div class="panel-head">
          <span class="panel-title">ENGAGEMENT TIMELINE</span>
          <span class="panel-ts" id="ts-timeline"></span>
        </div>
        <table class="tbl">
          <thead><tr><th>Phase</th><th>Description</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>1 · Recon</td><td>Passive external reconnaissance</td><td>D+00</td><td>D+01</td><td><span class="badge badge-ok">COMPLETE</span></td></tr>
            <tr><td>2 · Perimeter</td><td>Active perimeter probing + exploit</td><td>D+01</td><td>D+03</td><td><span class="badge badge-ok">COMPLETE</span></td></tr>
            <tr><td>3 · Identity</td><td>Credential attack + escalation</td><td>D+03</td><td>D+05</td><td><span class="badge badge-ok">COMPLETE</span></td></tr>
            <tr><td>4 · Lateral</td><td>Internal movement + persistence</td><td>D+05</td><td>D+07</td><td><span class="badge badge-dim">IN PROGRESS</span></td></tr>
            <tr><td>5 · Exfil</td><td>Data identification + C2 egress test</td><td>D+07</td><td>D+09</td><td><span class="badge badge-dim">PENDING</span></td></tr>
            <tr><td>6 · Remediate</td><td>Partner briefing + gap validation</td><td>D+10</td><td>D+12</td><td><span class="badge badge-dim">PENDING</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="bottombar">
    <span>AXEHEAD · AX-001 · AUTHORIZED ENGAGEMENT · ALL ACTIONS LOGGED</span>
    <span>ENG LEAD: CLEARED · TWO-PERSON RULE ACTIVE</span>
  </div>
</div>
<script>
const pad = n => String(n).padStart(2,'0')
const utc = () => { const d=new Date(); return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate())+' '+pad(d.getUTCHours())+':'+pad(d.getUTCMinutes())+':'+pad(d.getUTCSeconds())+'Z' }
document.getElementById('clock').textContent = utc()
setInterval(()=>{ document.getElementById('clock').textContent=utc() },1000)
const ts = () => utc()
document.querySelectorAll('[id^=ts-]').forEach(el=>el.textContent=ts())

document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'))
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'))
    item.classList.add('active')
    document.getElementById('panel-'+item.dataset.panel).classList.add('active')
  })
})

const authLog = document.getElementById('auth-log')
const authEntries=[
  {t:'2026-05-14 09:12:33Z',msg:'SPONSOR AUTH GRANTED — engagement window opened',cls:'ok'},
  {t:'2026-05-14 09:15:01Z',msg:'ENG-A1 checked in — external recon phase begin',cls:''},
  {t:'2026-05-14 11:44:28Z',msg:'V-001 complete — no findings on primary perimeter',cls:'ok'},
  {t:'2026-05-14 13:02:55Z',msg:'V-002 initiated — legacy VPN endpoint identified',cls:'warn'},
  {t:'2026-05-14 14:18:09Z',msg:'GAP-001 logged — CVE-2024-3400 unpatched on VPN node',cls:'warn'},
  {t:'2026-05-14 16:30:44Z',msg:'ENG-A2 checked in — identity attack phase begin',cls:''},
  {t:'2026-05-14 18:55:13Z',msg:'GAP-002 logged — 3 accounts compromised via spray',cls:'warn'},
  {t:'2026-05-15 08:03:22Z',msg:'SPONSOR NOTIFIED — critical findings escalated',cls:'ok'},
  {t:'2026-05-15 10:11:47Z',msg:'V-008 complete — Kerberoast hash captured (GAP-003)',cls:'warn'},
  {t:'2026-05-15 14:44:00Z',msg:'Phase 4 authorized — lateral movement window open',cls:'ok'},
]
authEntries.forEach(e=>{
  const d=document.createElement('div')
  d.className='log-line'
  d.innerHTML=\`<span class="ts">\${e.t}</span><span class="\${e.cls}">\${e.msg}</span>\`
  authLog.appendChild(d)
})
authLog.scrollTop=authLog.scrollHeight

// animate score
let s=0; const target=72
const si=setInterval(()=>{ s+=3; if(s>=target){s=target;clearInterval(si)} document.getElementById('score').textContent=s },30)
</script>
</body></html>`

const CARTOGRAPHER_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CARTOGRAPHER · Asset Console</title><style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1410;--bg2:#131b16;--bg3:#1a221c;--line:#2a3329;--line2:#3a4438;--fg:#e0e0d8;--fg2:#aab1a3;--fg3:#6b7563;--olive:#6b7a5a;--olive2:#9aa884;--olive3:#c4cfa8;--warn:#d4a23a;--crit:#c4533a;--ok:#7a9a5a;--mono:'JetBrains Mono',ui-monospace,monospace}
html,body{height:100%;background:var(--bg);color:var(--fg);font-family:var(--mono);font-size:12px;overflow:hidden}
.shell{display:grid;grid-template-rows:auto 1fr auto;height:100%}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid var(--line);background:var(--bg2)}
.topbar-id{color:var(--olive3);letter-spacing:.14em;font-size:11px}
.topbar-status{display:flex;gap:16px;font-size:10px;color:var(--fg3);letter-spacing:.1em}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--ok);margin-right:5px;animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.main{display:grid;grid-template-columns:1fr 260px;overflow:hidden}
.map-area{position:relative;overflow:hidden;background:var(--bg)}
canvas{position:absolute;inset:0;width:100%;height:100%}
.sidebar{border-left:1px solid var(--line);background:var(--bg2);overflow-y:auto;padding:12px}
.s-head{color:var(--olive3);letter-spacing:.14em;font-size:10px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--line)}
.stat-block{margin-bottom:14px}
.stat-label{font-size:9px;color:var(--fg3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.stat-row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--line);font-size:11px}
.stat-row:last-child{border:0}
.stat-k{color:var(--fg3)}.stat-v{color:var(--fg)}
.stat-v.ok{color:var(--ok)}.stat-v.warn{color:var(--warn)}.stat-v.crit{color:var(--crit)}
.drift-feed{font-size:10px;line-height:1.9;color:var(--fg3);max-height:180px;overflow-y:auto}
.drift-line .ts{color:var(--olive);margin-right:6px}
.drift-line .new{color:var(--ok)}.drift-line .chg{color:var(--warn)}.drift-line .rem{color:var(--crit)}
.bottombar{padding:6px 14px;border-top:1px solid var(--line);background:var(--bg2);display:flex;justify-content:space-between;font-size:10px;color:var(--fg3);letter-spacing:.08em}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--line2);border-radius:2px}::-webkit-scrollbar-thumb:hover{background:var(--olive2)}*{scrollbar-width:thin;scrollbar-color:var(--line2) var(--bg)}
</style></head><body>
<div class="shell">
  <div class="topbar">
    <span class="topbar-id">CARTOGRAPHER · ASSET CONSOLE / CT-002</span>
    <div class="topbar-status">
      <span><span class="dot"></span>LIVE</span>
      <span id="clock">--:--:-- UTC</span>
      <span id="ep-count">14,000,000+ ENDPOINTS</span>
    </div>
  </div>
  <div class="main">
    <div class="map-area"><canvas id="c"></canvas></div>
    <div class="sidebar">
      <div class="s-head">ASSET INVENTORY</div>
      <div class="stat-block">
        <div class="stat-label">By Category</div>
        <div class="stat-row"><span class="stat-k">IT Endpoints</span><span class="stat-v" id="it">9,841,220</span></div>
        <div class="stat-row"><span class="stat-k">OT / ICS</span><span class="stat-v" id="ot">2,104,093</span></div>
        <div class="stat-row"><span class="stat-k">Cloud Workloads</span><span class="stat-v" id="cloud">1,988,441</span></div>
        <div class="stat-row"><span class="stat-k">Identity Principals</span><span class="stat-v" id="id">312,888</span></div>
        <div class="stat-row"><span class="stat-k">Unknown / Shadow</span><span class="stat-v warn" id="shadow">87,334</span></div>
      </div>
      <div class="stat-block">
        <div class="stat-label">Drift · Last 60s</div>
        <div class="stat-row"><span class="stat-k">New</span><span class="stat-v ok" id="new-ep">+14</span></div>
        <div class="stat-row"><span class="stat-k">Changed</span><span class="stat-v warn" id="chg-ep">7</span></div>
        <div class="stat-row"><span class="stat-k">Removed</span><span class="stat-v crit" id="rem-ep">2</span></div>
        <div class="stat-row"><span class="stat-k">Refresh Lag</span><span class="stat-v ok">42s</span></div>
      </div>
      <div class="stat-block">
        <div class="stat-label">Drift Feed</div>
        <div class="drift-feed" id="drift-feed"></div>
      </div>
    </div>
  </div>
  <div class="bottombar">
    <span>CARTOGRAPHER · CT-002 · PASSIVE + ACTIVE · REFRESH &lt; 60s</span>
    <span>MODE: LIVE · IDENTITY GRAPH JOINED</span>
  </div>
</div>
<script>
const pad=n=>String(n).padStart(2,'0')
const utc=()=>{const d=new Date();return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate())+' '+pad(d.getUTCHours())+':'+pad(d.getUTCMinutes())+':'+pad(d.getUTCSeconds())+'Z'}
document.getElementById('clock').textContent=utc()
setInterval(()=>document.getElementById('clock').textContent=utc(),1000)

// Canvas node graph
const canvas=document.getElementById('c')
const ctx=canvas.getContext('2d')
let W,H,nodes=[]

const CATEGORIES=[
  {label:'IT',color:'#9aa884',count:120},
  {label:'OT',color:'#d4a23a',count:40},
  {label:'Cloud',color:'#7a9a5a',count:60},
  {label:'Identity',color:'#c4cfa8',count:30},
  {label:'Shadow',color:'#c4533a',count:15},
]

function initNodes(){
  nodes=[]
  CATEGORIES.forEach(cat=>{
    for(let i=0;i<cat.count;i++){
      nodes.push({
        x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
        r:1+Math.random()*2.5,
        color:cat.color, label:cat.label,
        pulse:Math.random()*Math.PI*2
      })
    }
  })
}

function resize(){
  W=canvas.offsetWidth; H=canvas.offsetHeight
  canvas.width=W; canvas.height=H
  initNodes()
}

function draw(t){
  ctx.clearRect(0,0,W,H)
  ctx.fillStyle='rgba(13,20,16,0.3)'
  ctx.fillRect(0,0,W,H)
  // edges
  nodes.forEach((a,i)=>{
    nodes.slice(i+1).forEach(b=>{
      const dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy)
      if(dist<80&&a.label===b.label){
        ctx.beginPath()
        ctx.moveTo(a.x,a.y)
        ctx.lineTo(b.x,b.y)
        ctx.strokeStyle='rgba(154,168,132,'+(0.08*(1-dist/80))+')'
        ctx.lineWidth=0.5
        ctx.stroke()
      }
    })
  })
  // nodes
  nodes.forEach(n=>{
    n.x+=n.vx; n.y+=n.vy; n.pulse+=0.04
    if(n.x<0||n.x>W)n.vx*=-1
    if(n.y<0||n.y>H)n.vy*=-1
    const p=Math.sin(n.pulse)*0.3+0.7
    ctx.beginPath()
    ctx.arc(n.x,n.y,n.r,0,Math.PI*2)
    ctx.fillStyle=n.color
    ctx.globalAlpha=p
    ctx.fill()
    ctx.globalAlpha=1
  })
  requestAnimationFrame(draw)
}

window.addEventListener('resize',resize)
resize()
requestAnimationFrame(draw)

// Drift feed
const feed=document.getElementById('drift-feed')
const driftTypes=[
  {cls:'new',label:'NEW'},
  {cls:'chg',label:'CHG'},
  {cls:'rem',label:'REM'},
]
const driftPrefixes=['10.','172.16.','192.168.','fd00::','svr-','wks-','aws-','gcp-']
function addDrift(){
  const type=driftTypes[Math.floor(Math.random()*driftTypes.length)]
  const prefix=driftPrefixes[Math.floor(Math.random()*driftPrefixes.length)]
  const suffix=Math.floor(Math.random()*254)+1
  const d=document.createElement('div')
  d.className='drift-line'
  d.innerHTML=\`<span class="ts">\${utc().slice(11,19)}</span><span class="\${type.cls}">\${type.label}</span> \${prefix}\${suffix}\`
  feed.appendChild(d)
  while(feed.children.length>20)feed.removeChild(feed.firstChild)
  feed.scrollTop=feed.scrollHeight
}
addDrift()
setInterval(addDrift,2800)

// Drift counters
setInterval(()=>{
  const n=document.getElementById('new-ep')
  const c=document.getElementById('chg-ep')
  const r=document.getElementById('rem-ep')
  n.textContent='+'+Math.floor(10+Math.random()*20)
  c.textContent=Math.floor(3+Math.random()*12)
  r.textContent=Math.floor(Math.random()*5)
},5000)
</script>
</body></html>`

const REDOUBT_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>REDOUBT · Sovereign AI Console</title><style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1410;--bg2:#131b16;--bg3:#1a221c;--line:#2a3329;--line2:#3a4438;--fg:#e0e0d8;--fg2:#aab1a3;--fg3:#6b7563;--olive:#6b7a5a;--olive2:#9aa884;--olive3:#c4cfa8;--warn:#d4a23a;--crit:#c4533a;--ok:#7a9a5a;--mono:'JetBrains Mono',ui-monospace,monospace}
html,body{height:100%;background:var(--bg);color:var(--fg);font-family:var(--mono);font-size:12px;overflow:hidden}
.shell{display:grid;grid-template-rows:auto 1fr auto;height:100%}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid var(--line);background:var(--bg2)}
.topbar-id{color:var(--olive3);letter-spacing:.14em;font-size:11px}
.topbar-status{display:flex;gap:16px;font-size:10px;color:var(--fg3);letter-spacing:.1em}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--ok);margin-right:5px;animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.main{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1px;background:var(--line);overflow:hidden}
.quad{background:var(--bg);padding:14px;overflow:hidden;display:flex;flex-direction:column;gap:10px}
.quad-head{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.quad-title{font-size:10px;color:var(--olive3);letter-spacing:.14em;text-transform:uppercase}
.quad-sub{font-size:9px;color:var(--fg3)}
.metric-row{display:grid;grid-template-columns:1fr 1fr;gap:6px;flex-shrink:0}
.metric{background:var(--bg2);padding:8px 10px;border:1px solid var(--line)}
.metric-label{font-size:9px;color:var(--fg3);letter-spacing:.1em;margin-bottom:3px;text-transform:uppercase}
.metric-val{font-size:16px;color:var(--fg)}.metric-val.ok{color:var(--ok)}.metric-val.warn{color:var(--warn)}
.tbl{width:100%;border-collapse:collapse;font-size:10px;flex:1;overflow:hidden}
.tbl th{text-align:left;color:var(--fg3);font-weight:400;letter-spacing:.08em;font-size:9px;padding:4px 6px;border-bottom:1px solid var(--line);text-transform:uppercase}
.tbl td{padding:5px 6px;border-bottom:1px solid var(--line);color:var(--fg2);white-space:nowrap}
.tbl tr:last-child td{border:0}
.badge{display:inline-block;padding:1px 5px;font-size:9px;letter-spacing:.06em;border:1px solid}
.badge-ok{color:var(--ok);border-color:var(--ok)}
.badge-warn{color:var(--warn);border-color:var(--warn)}
.badge-dim{color:var(--fg3);border-color:var(--line2)}
.latency-bar{display:flex;align-items:flex-end;gap:2px;height:40px;padding-top:6px}
.lb{background:var(--olive2);width:12px;border-radius:1px 1px 0 0;transition:.3s}
.log{font-size:10px;line-height:1.8;color:var(--fg3);flex:1;overflow-y:auto}
.log .ts{color:var(--olive);margin-right:6px}
.log .ok{color:var(--ok)}.log .warn{color:var(--warn)}
.enc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;flex-shrink:0}
.enc-cell{background:var(--bg2);border:1px solid var(--line);padding:8px 10px}
.enc-label{font-size:9px;color:var(--fg3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
.enc-val{font-size:13px}
.progress{background:var(--line);height:3px;border-radius:2px;margin-top:6px;overflow:hidden}
.progress-fill{height:100%;background:var(--olive2);border-radius:2px;transition:.4s}
.bottombar{padding:6px 14px;border-top:1px solid var(--line);background:var(--bg2);display:flex;justify-content:space-between;font-size:10px;color:var(--fg3);letter-spacing:.08em}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--line2);border-radius:2px}::-webkit-scrollbar-thumb:hover{background:var(--olive2)}*{scrollbar-width:thin;scrollbar-color:var(--line2) var(--bg)}
</style></head><body>
<div class="shell">
  <div class="topbar">
    <span class="topbar-id">REDOUBT · SOVEREIGN AI CONSOLE / RD-003</span>
    <div class="topbar-status">
      <span><span class="dot"></span>ENCLAVE LIVE</span>
      <span id="clock">--:--:-- UTC</span>
      <span>EGRESS: ZERO · AIR-GAP ACTIVE</span>
    </div>
  </div>
  <div class="main">
    <!-- Q1: Model Status -->
    <div class="quad">
      <div class="quad-head">
        <span class="quad-title">Sovereign Model · 70B</span>
        <span class="quad-sub" id="inf-rate">—</span>
      </div>
      <div class="metric-row">
        <div class="metric"><div class="metric-label">Latency P50</div><div class="metric-val ok" id="lat50">—</div></div>
        <div class="metric"><div class="metric-label">Latency P99</div><div class="metric-val" id="lat99">—</div></div>
        <div class="metric"><div class="metric-label">Tokens/s</div><div class="metric-val ok" id="toks">—</div></div>
        <div class="metric"><div class="metric-label">GPU Util</div><div class="metric-val warn" id="gpu">—</div></div>
      </div>
      <div class="latency-bar" id="lat-bar"></div>
    </div>

    <!-- Q2: Theater Status -->
    <div class="quad">
      <div class="quad-head">
        <span class="quad-title">Theater Coverage</span>
        <span class="quad-sub">9 / 9 ATTESTED</span>
      </div>
      <table class="tbl">
        <thead><tr><th>Theater</th><th>Status</th><th>Last Att.</th><th>Alerts</th></tr></thead>
        <tbody>
          <tr><td>CONUS-E</td><td><span class="badge badge-ok">CLEAR</span></td><td>12s ago</td><td>0</td></tr>
          <tr><td>CONUS-W</td><td><span class="badge badge-ok">CLEAR</span></td><td>8s ago</td><td>0</td></tr>
          <tr><td>EUCOM-N</td><td><span class="badge badge-ok">CLEAR</span></td><td>31s ago</td><td>0</td></tr>
          <tr><td>EUCOM-E</td><td><span class="badge badge-warn">WATCH</span></td><td>19s ago</td><td>2</td></tr>
          <tr><td>AFRICOM</td><td><span class="badge badge-ok">CLEAR</span></td><td>44s ago</td><td>0</td></tr>
          <tr><td>CENTCOM</td><td><span class="badge badge-ok">CLEAR</span></td><td>27s ago</td><td>0</td></tr>
          <tr><td>INDOPACOM</td><td><span class="badge badge-ok">CLEAR</span></td><td>55s ago</td><td>1</td></tr>
          <tr><td>INDOPAC-N</td><td><span class="badge badge-ok">CLEAR</span></td><td>38s ago</td><td>0</td></tr>
          <tr><td>SOUTHCOM</td><td><span class="badge badge-ok">CLEAR</span></td><td>11s ago</td><td>0</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Q3: Enclave Security -->
    <div class="quad">
      <div class="quad-head">
        <span class="quad-title">Enclave Integrity</span>
        <span class="quad-sub">TPM 2.0 · SGX ATTESTED</span>
      </div>
      <div class="enc-grid">
        <div class="enc-cell"><div class="enc-label">Weights Sealed</div><div class="enc-val ok">AES-256-XTS</div><div class="progress"><div class="progress-fill" style="width:100%"></div></div></div>
        <div class="enc-cell"><div class="enc-label">KV Cache</div><div class="enc-val ok">In-Enclave</div><div class="progress"><div class="progress-fill" style="width:100%"></div></div></div>
        <div class="enc-cell"><div class="enc-label">Network Egress</div><div class="enc-val ok">BLOCKED</div><div class="progress"><div class="progress-fill" style="width:100%;background:var(--ok)"></div></div></div>
        <div class="enc-cell"><div class="enc-label">Remote Attestation</div><div class="enc-val ok">VERIFIED</div><div class="progress"><div class="progress-fill" style="width:100%;background:var(--ok)"></div></div></div>
        <div class="enc-cell"><div class="enc-label">Two-Person Rule</div><div class="enc-val ok">ACTIVE</div><div class="progress"><div class="progress-fill" style="width:100%;background:var(--ok)"></div></div></div>
        <div class="enc-cell"><div class="enc-label">Vendor Reachback</div><div class="enc-val ok">ZERO</div><div class="progress"><div class="progress-fill" style="width:100%;background:var(--ok)"></div></div></div>
      </div>
    </div>

    <!-- Q4: Response Log -->
    <div class="quad">
      <div class="quad-head">
        <span class="quad-title">Counter-Action Log</span>
        <span class="quad-sub">TPR ACTIVE · HUMAN CONCUR REQUIRED</span>
      </div>
      <div class="log" id="ca-log"></div>
    </div>
  </div>
  <div class="bottombar">
    <span>REDOUBT · RD-003 · SOVEREIGN WEIGHTS · NO VENDOR REACHBACK · AXEHEAD VALIDATED</span>
    <span id="uptime">UPTIME —</span>
  </div>
</div>
<script>
const pad=n=>String(n).padStart(2,'0')
const utc=()=>{const d=new Date();return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate())+' '+pad(d.getUTCHours())+':'+pad(d.getUTCMinutes())+':'+pad(d.getUTCSeconds())+'Z'}
document.getElementById('clock').textContent=utc()
setInterval(()=>document.getElementById('clock').textContent=utc(),1000)

// Latency sparkline
const bar=document.getElementById('lat-bar')
const bars=[]
for(let i=0;i<24;i++){const b=document.createElement('div');b.className='lb';b.style.height='20px';bar.appendChild(b);bars.push(b)}

function updateMetrics(){
  const lat50=280+Math.floor(Math.random()*80)
  const lat99=lat50+Math.floor(100+Math.random()*150)
  const toks=Math.floor(28+Math.random()*10)
  const gpu=Math.floor(78+Math.random()*14)
  document.getElementById('lat50').textContent=lat50+'ms'
  document.getElementById('lat99').textContent=lat99+'ms'
  document.getElementById('toks').textContent=toks+' t/s'
  document.getElementById('gpu').textContent=gpu+'%'
  document.getElementById('inf-rate').textContent=Math.floor(180+Math.random()*40)+' req/min'
  bars.shift()
  const h=Math.floor(15+Math.random()*35)
  const newBar=document.createElement('div')
  newBar.className='lb'
  newBar.style.height=h+'px'
  newBar.style.background=h>40?'var(--warn)':'var(--olive2)'
  bar.appendChild(newBar)
  bars.push(newBar)
}
updateMetrics()
setInterval(updateMetrics,2000)

// CA log
const log=document.getElementById('ca-log')
const entries=[
  {t:'09:04:12Z',msg:'EUCOM-E anomaly detected — model confidence 0.94',cls:'warn'},
  {t:'09:04:14Z',msg:'Counter-action BLOCK queued — awaiting two-person concur',cls:''},
  {t:'09:04:19Z',msg:'OPS-1 concurred · OPS-2 concurred — action authorized',cls:'ok'},
  {t:'09:04:19Z',msg:'BLOCK executed — source 185.220.101.47 null-routed',cls:'ok'},
  {t:'09:14:33Z',msg:'INDOPACOM scan pattern — model confidence 0.81',cls:'warn'},
  {t:'09:14:35Z',msg:'Counter-action ALERT queued — auto-approved (low blast)',cls:'ok'},
  {t:'09:14:35Z',msg:'ALERT dispatched — watch officer notified',cls:'ok'},
  {t:'09:22:08Z',msg:'All 9 theaters green — posture nominal',cls:'ok'},
]
entries.forEach(e=>{
  const d=document.createElement('div')
  d.innerHTML=\`<span class="ts">\${e.t}</span><span class="\${e.cls}">\${e.msg}</span>\`
  log.appendChild(d)
})
log.scrollTop=log.scrollHeight

// Uptime counter
const start=Date.now()-((3*3600+42*60+18)*1000)
setInterval(()=>{
  const s=Math.floor((Date.now()-start)/1000)
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60
  document.getElementById('uptime').textContent='UPTIME '+pad(h)+'h '+pad(m)+'m '+pad(sec)+'s'
},1000)
</script>
</body></html>`

// ── Encrypt ───────────────────────────────────────────────────────────────────

async function encrypt(html, password) {
  const salt = getRandomValues(new Uint8Array(16))
  const iv = getRandomValues(new Uint8Array(12))
  const passKey = await subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERS, hash: 'SHA-256' },
    passKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  const ct = await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(html))
  const b64 = buf => Buffer.from(buf).toString('base64')
  return JSON.stringify({ v: 1, kdf: 'PBKDF2-SHA256', iters: ITERS, cipher: 'AES-GCM-256', salt: b64(salt), iv: b64(iv), ct: b64(ct) })
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`Encrypting 3 console files with PBKDF2-SHA256 (${ITERS} iters) + AES-GCM-256...`)

const files = [
  { name: 'axehead_console.enc.json', html: AXEHEAD_HTML },
  { name: 'cartographer.enc.json',    html: CARTOGRAPHER_HTML },
  { name: 'redoubt_visual.enc.json',  html: REDOUBT_HTML },
]

for (const f of files) {
  process.stdout.write(`  Encrypting ${f.name}... `)
  const blob = await encrypt(f.html, PASSWORD)
  const outPath = join(OUT_DIR, f.name)
  writeFileSync(outPath, blob, 'utf8')
  console.log(`done (${(blob.length / 1024).toFixed(1)} KB)`)
}

console.log('Done. Files written to public/.')
