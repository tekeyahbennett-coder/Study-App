<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CampusPlanner – Course</title>
<link rel="stylesheet" href="./main.css">
<style>
.hero { border-radius:var(--radius);padding:26px 28px;display:flex;align-items:center;gap:18px;color:#fff; }
.hero-icon { width:54px;height:54px;border-radius:14px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0; }
.hero-title { font-size:21px;font-weight:800;letter-spacing:-.01em; }
.hero-sub   { font-size:13.5px;opacity:.75;margin-top:3px; }
.mini-row { display:flex;gap:14px;flex-wrap:wrap; }
.mini-card { background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;flex:1;min-width:100px;box-shadow:var(--shadow-sm); }
.mini-num  { font-size:26px;font-weight:800;letter-spacing:-.02em; }
.mini-lbl  { font-size:12px;color:var(--text-muted);margin-top:3px;font-weight:500; }
.sec-lbl { font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:14px 22px 6px; }
.sec-lbl.overdue  { color:var(--prog); }
.sec-lbl.upcoming { color:var(--text-muted); }
.sec-lbl.done     { color:var(--done); }
.a-row { display:flex;align-items:center;gap:12px;padding:12px 22px;border-bottom:1px solid var(--border-light);transition:background .12s; }
.a-row:last-child { border-bottom:none; }
.a-row:hover { background:#fafbff; }
.check-btn { width:20px;height:20px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;flex-shrink:0; }
.check-btn:hover  { border-color:var(--primary);background:var(--primary-soft); }
.check-btn.done   { background:var(--math);border-color:var(--math); }
.check-btn.done::after { content:'✓';color:#fff;font-size:11px;font-weight:700; }
.a-title          { font-size:13.5px;font-weight:600;color:var(--text); }
.a-title.overdue  { color:var(--prog); }
.a-title.done-txt { color:var(--done);text-decoration:line-through; }
.a-due            { font-size:12px;margin-top:2px;color:var(--text-muted); }
.a-due.overdue    { color:var(--prog);font-weight:600; }
.a-due.done-txt   { color:var(--done); }
.pill { font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:99px;white-space:nowrap;flex-shrink:0; }
.pill-ov  { background:var(--prog-soft); color:var(--prog); }
.pill-td  { background:var(--psych-soft);color:#92400e; }
.pill-sn  { background:var(--primary-soft);color:var(--primary); }
.pill-dn  { background:var(--done-soft); color:var(--done); }
.pill-hi  { background:var(--prog-soft); color:var(--prog); }
.pill-lo  { background:var(--math-soft); color:var(--math); }
.a-note   { font-size:12px;color:var(--text-muted);margin-top:2px;font-style:italic; }
.row-actions { display:flex;gap:4px;flex-shrink:0;opacity:0;transition:opacity .15s; }
.a-row:hover .row-actions { opacity:1; }
</style>
</head>
<body class="app-layout">
<div id="sidebarMount"></div>
<div class="main" id="mainContent">
  <div style="text-align:center;padding:60px;color:var(--text-muted);">Loading…</div>
</div>

<script src="./shared.js"></script>
<script>
function getParam(k){ return new URLSearchParams(window.location.search).get(k); }

function render(){
  const key=getParam('course');
  const c=COURSES[key];
  document.getElementById('sidebarMount').innerHTML=buildSidebar(`course-${key}`);
  if(!c){
    document.getElementById('mainContent').innerHTML='<div style="text-align:center;padding:60px;color:var(--text-muted);">Course not found.</div>';
    return;
  }
  document.title=`CampusPlanner – ${c.name}`;

  const all=getAssignments().filter(a=>a.course===key);
  const overdue =all.filter(a=>!a.completed&&diffDays(a.dueDate)<0).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  const upcoming=all.filter(a=>!a.completed&&diffDays(a.dueDate)>=0).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  const done    =all.filter(a=>a.completed).sort((a,b)=>new Date(b.dueDate)-new Date(a.dueDate));

  let html=`
    <div class="page-header">
      <div>
        <a href="./dashboard.html" style="font-size:13px;color:var(--text-muted);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:8px;">← Dashboard</a>
        <h1 class="page-title">${c.name}</h1>
        <p class="page-sub">${all.length} assignment${all.length!==1?'s':''} total</p>
      </div>
      <a class="btn btn-primary" href="./addAssignment.html">+ Add Assignment</a>
    </div>
    <div class="hero" style="background:${c.grad};">
      <div class="hero-icon">${c.icon}</div>
      <div>
        <div class="hero-title">${c.name}</div>
        <div class="hero-sub">${upcoming.length} upcoming · ${overdue.length} overdue · ${done.length} completed</div>
      </div>
    </div>
    <div class="mini-row">
      <div class="mini-card"><div class="mini-num">${upcoming.length}</div><div class="mini-lbl">Upcoming</div></div>
      <div class="mini-card"><div class="mini-num" style="${overdue.length?'color:var(--prog)':''}">${overdue.length}</div><div class="mini-lbl">Overdue</div></div>
      <div class="mini-card"><div class="mini-num">${done.length}</div><div class="mini-lbl">Completed</div></div>
      <div class="mini-card"><div class="mini-num">${all.length}</div><div class="mini-lbl">Total</div></div>
    </div>
    <div class="card">`;

  if(!all.length){
    html+=`<div style="text-align:center;padding:56px 20px;color:var(--text-muted);font-size:13.5px;">
      <div style="font-size:36px;margin-bottom:10px;">📭</div>No assignments for this course yet.
      <br><a class="btn btn-primary" href="./addAssignment.html" style="margin-top:16px;display:inline-flex;">+ Add one now</a>
    </div>`;
  } else {
    if(overdue.length){
      html+=`<div class="sec-lbl overdue">⚠ Overdue (${overdue.length})</div>`;
      html+=overdue.map(a=>rowHtml(a,'overdue')).join('');
    }
    if(upcoming.length){
      html+=`<div class="sec-lbl upcoming">Upcoming (${upcoming.length})</div>`;
      html+=upcoming.map(a=>rowHtml(a,'upcoming')).join('');
    }
    if(done.length){
      html+=`<div class="sec-lbl done">Completed (${done.length})</div>`;
      html+=done.map(a=>rowHtml(a,'done')).join('');
    }
  }
  html+='</div>';
  document.getElementById('mainContent').innerHTML=html;
}

function rowHtml(a,type){
  const d=diffDays(a.dueDate);
  let titleCls='',dueCls='',pillHtml='',dueLabel='';
  if(type==='overdue'){
    titleCls='overdue';dueCls='overdue';
    dueLabel=`Was due ${fmtDate(a.dueDate)} · ${Math.abs(d)}d ago`;
    pillHtml=`<span class="pill pill-ov">Overdue</span>`;
  } else if(type==='done'){
    titleCls='done-txt';dueCls='done-txt';
    dueLabel=`Due ${fmtDate(a.dueDate)}`;
    pillHtml=`<span class="pill pill-dn">Done</span>`;
  } else {
    if(d===0)      { dueLabel='Due today';                               pillHtml=`<span class="pill pill-td">Today</span>`; }
    else if(d===1) { dueLabel='Due tomorrow';                            pillHtml=`<span class="pill pill-sn">Soon</span>`; }
    else if(d<=4)  { dueLabel=`Due ${fmtDate(a.dueDate)} · in ${d}d`;   pillHtml=`<span class="pill pill-sn">Soon</span>`; }
    else           { dueLabel=`Due ${fmtDate(a.dueDate)} · in ${d}d`;   pillHtml=''; }
  }
  const priPill = a.priority==='high'&&type!=='done'?`<span class="pill pill-hi" style="margin-left:4px;">High</span>`:
                  a.priority==='low' &&type!=='done'?`<span class="pill pill-lo" style="margin-left:4px;">Low</span>`:'';
  const noteHtml = a.notes?`<div class="a-note">${a.notes}</div>`:'';
  const doneCls  = type==='done'?' done':'';
  return `<div class="a-row">
    <div class="check-btn${doneCls}" onclick="toggleComplete(${a.id},render)" title="Toggle complete"></div>
    <div style="flex:1;min-width:0;">
      <div class="a-title ${titleCls}">${a.title}</div>
      <div class="a-due ${dueCls}">${dueLabel}</div>
      ${noteHtml}
    </div>
    <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">${pillHtml}${priPill}</div>
    <div class="row-actions">
      <a class="btn btn-ghost btn-sm" href="./addAssignment.html?edit=${a.id}" title="Edit">✏️</a>
      <button class="btn btn-danger btn-sm" onclick="deleteAssignment(${a.id},render)" title="Delete">🗑</button>
    </div>
  </div>`;
}

requireLogin();
render();
</script>
</body>
</html>
