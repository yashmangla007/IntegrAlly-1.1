const fs = require('fs');
const path = require('path');

const basePath = process.cwd();
const dashboardPath = path.join(basePath, 'dashboard.html');
const addMemPath = path.join(basePath, 'add_memory.html');

let dashboard = fs.readFileSync(dashboardPath, 'utf8');
let addMem = fs.readFileSync(addMemPath, 'utf8');

// Extraction
const cssRegex = /\/\*\s*═══════════════════════════════════════════\s*SLIDE PANEL[^\*]*\*\/(.*?)\/\*\s*═══════════════════════════════════════════\s*QUICK EXIT/s;
let cssMatch = addMem.match(cssRegex);
let addMemCss = cssMatch ? '/* ═══════════════════════════════════════════\n   SLIDE PANEL (Added)\n   ═══════════════════════════════════════════ */\n' + cssMatch[1] : '';

const mqRegex = /(@media \(max-width: 900px\) \{.*?\})/s;
let mqMatch = addMem.match(mqRegex);
let addMemMq = mqMatch ? mqMatch[1] : '';

// Adjust CSS
addMemCss = addMemCss.replace('transform: translateX(100%);', 'transform: translateX(100%);\n            display: none;'); // initial hide
addMemCss = addMemCss.replace(/\.slide-panel\.open\s*\{.*?\}/, ''); // clear any old definition if exists somehow
addMemCss += '\n        .slide-panel.open {\n            display: flex;\n            animation: slideIn 320ms var(--ease-gentle) forwards;\n        }\n';
addMemCss += '        .slide-panel.closing {\n            animation: slideOut 320ms var(--ease-gentle) forwards;\n        }\n';
addMemCss = addMemCss.replace('animation: slideIn 320ms var(--ease-gentle) forwards;', '/* animation: slideIn 320ms var(--ease-gentle) forwards; */'); // remove auto animation

const htmlRegex = /(<!-- MAIN SLIDE-IN PANEL -->.*?)(?:<!-- MAIN SLIDE-IN PANEL END -->|<!-- Quick Exit -->)/s;
let htmlMatch = addMem.match(htmlRegex);
let addMemHtml = htmlMatch ? htmlMatch[1] : '';
addMemHtml = addMemHtml.replace('href="dashboard.html"', 'href="#"');
addMemHtml = addMemHtml.replace('id="navBack"', 'id="navBackTrigger"');

const jsRegex = /(\/\/ Back Nav Animation.*?)(?=<\/script>)/s;
let jsMatch = addMem.match(jsRegex);
let addMemJs = jsMatch ? jsMatch[1] : '';

// Adjust JS rules
addMemJs = addMemJs.replace(/setTimeout\(\(\) => \{\s*window\.location\.href = 'dashboard\.html';\s*\}, 300\);/g, '');
addMemJs = addMemJs.replace(/panel\.style\.animation = 'slideOut 320ms var\(--ease-gentle\) forwards';/g, 'panel.classList.replace("open", "closing"); setTimeout(() => { panel.classList.remove("closing"); panel.style.display="none"; }, 320);');
addMemJs = addMemJs.replace(/document\.getElementById\('navBack'\)/g, "document.getElementById('navBackTrigger')");

const triggerJs = `
        // -- Dashboard Slide Trigger --
        const addMemoryBtns = document.querySelectorAll('#sidebarAddMemoryBtn');
        const slidePanelRef = document.getElementById('slidePanel');
        addMemoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const wasClosing = slidePanelRef.classList.contains('closing');
                slidePanelRef.style.display = 'flex';
                if (!wasClosing) {
                    slidePanelRef.classList.add('open');
                } else {
                    slidePanelRef.classList.remove('closing');
                    slidePanelRef.classList.add('open');
                }
            });
        });
        
        document.getElementById('navBackTrigger').addEventListener('click', (e) => {
            e.preventDefault();
        });
`;
addMemJs = '// Add Memory Logic\n' + addMemJs + '\n' + triggerJs;

// Injection into Dashboard
dashboard = dashboard.replace('</style>', addMemCss + '\n        ' + addMemMq + '\n    </style>');
dashboard = dashboard.replace('</main>\n\n        <!-- ═══════════════════════════════════════════\n             MAIN PANEL — GATHER MY STORY', '</main>\n' + addMemHtml + '\n        <!-- ═══════════════════════════════════════════\n             MAIN PANEL — GATHER MY STORY');
dashboard = dashboard.replace('</script>\n    <!-- Custom Cursor -->', addMemJs + '\n    </script>\n    <!-- Custom Cursor -->');

dashboard = dashboard.replace('<button class="action-btn action-btn-primary" aria-label="Add a Memory — text, voice, or media">', '<button class="action-btn action-btn-primary" id="sidebarAddMemoryBtn" aria-label="Add a Memory — text, voice, or media">');

fs.writeFileSync(dashboardPath, dashboard, 'utf8');
console.log('Successfully merged add_memory.html into dashboard.html');
