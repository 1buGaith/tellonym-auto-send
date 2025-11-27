// ==UserScript==
// @name         Tellonym v2.1
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Spam tellonym
// @author       7mo7
// @match        https://tellonym.me/*
// @match        https://*.tellonym.me/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        setTimeout(initUI, 2000);
    });

    function initUI() {
        const oldUI = document.getElementById('auto-sender-ui');
        if (oldUI) oldUI.remove();

        const uiHTML = `
            <style>
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(187, 134, 252, 0.3), 0 0 40px rgba(3, 218, 198, 0.2); }
                    50% { box-shadow: 0 0 30px rgba(187, 134, 252, 0.5), 0 0 60px rgba(3, 218, 198, 0.3); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .animated-bg {
                    background: linear-gradient(-45deg, #0f1729, #1a1f3a, #2d1b69, #1f2b47);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                }

                .glass-effect {
                    background: rgba(22, 33, 62, 0.7);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .hover-lift:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                }

                .neon-text {
                    text-shadow: 0 0 10px rgba(187, 134, 252, 0.8),
                                 0 0 20px rgba(187, 134, 252, 0.5),
                                 0 0 30px rgba(187, 134, 252, 0.3);
                }

                .pages-container {
                    margin-top: 15px;
                    max-height: 150px;
                    overflow-y: auto;
                }

                .page-item {
                    background: rgba(31, 43, 71, 0.5);
                    border-radius: 8px;
                    padding: 8px;
                    margin-bottom: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 11px;
                }

                .page-url {
                    color: #aaa;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex: 1;
                    margin-right: 8px;
                }

                .page-status {
                    font-size: 10px;
                    padding: 2px 6px;
                    border-radius: 6px;
                    font-weight: 600;
                    min-width: 50px;
                    text-align: center;
                }

                .status-active {
                    background: rgba(3, 218, 198, 0.2);
                    color: #03dac6;
                }

                .status-inactive {
                    background: rgba(207, 102, 121, 0.2);
                    color: #cf6679;
                }

                .status-sending {
                    background: rgba(187, 134, 252, 0.2);
                    color: #bb86fc;
                    animation: pulse 1.5s ease-in-out infinite;
                }
            </style>

            <div id="auto-sender-ui" style="
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                width: 380px;
            ">
                <div id="draggable-container" style="
                    border-radius: 24px;
                    padding: 8px;
                    animation: glow 3s ease-in-out infinite;
                    background: url('https://i.pinimg.com/originals/85/66/89/856689ab5f5d504b46267636f2045f63.gif') center/cover;
                    position: relative;
                ">
                    <div class="glass-effect" style="
                        border-radius: 20px;
                        padding: 32px 24px;
                    ">
                        <div id="drag-handle" style="
                            text-align: center;
                            margin-bottom: 32px;
                            cursor: move;
                            user-select: none;
                        ">
                            <div style="
                                width: 50px;
                                height: 5px;
                                background: linear-gradient(90deg, #bb86fc, #03dac6);
                                border-radius: 3px;
                                margin: 0 auto 20px;
                                animation: pulse 2s ease-in-out infinite;
                            "></div>

                            <div style="
                                font-size: 28px;
                                font-weight: 700;
                                background: linear-gradient(135deg, #bb86fc 0%, #03dac6 100%);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                margin-bottom: 8px;
                                animation: float 3s ease-in-out infinite;
                            ">
                                ⚡ TELLONYM SPAM
                            </div>

                            <div style="
                                font-size: 13px;
                                color: #888;
                                font-weight: 500;
                                letter-spacing: 2px;
                            ">
                                MULTI-PAGES V2.1 | BY 7MO7
                            </div>
                        </div>

                        <!-- قسم الوقت -->
                        <div style="
                            background: linear-gradient(135deg, rgba(187, 134, 252, 0.1) 0%, rgba(3, 218, 198, 0.1) 100%);
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 20px;
                            text-align: center;
                            border: 1px solid rgba(187, 134, 252, 0.2);
                        ">
                            <div style="
                                font-size: 11px;
                                color: #bb86fc;
                                font-weight: 600;
                                letter-spacing: 1px;
                                margin-bottom: 12px;
                                text-transform: uppercase;
                            ">التأخير الزمني</div>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 15px;
                                margin-bottom: 12px;
                            ">
                                <button id="decrease-btn" class="hover-lift" style="
                                    width: 40px;
                                    height: 40px;
                                    border: 2px solid rgba(187, 134, 252, 0.3);
                                    border-radius: 10px;
                                    background: rgba(31, 43, 71, 0.8);
                                    color: #bb86fc;
                                    font-size: 20px;
                                    cursor: pointer;
                                    font-weight: 600;
                                ">−</button>

                                <div id="time-display" class="neon-text" style="
                                    font-size: 48px;
                                    font-weight: 800;
                                    background: linear-gradient(135deg, #bb86fc 0%, #03dac6 100%);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    width: 80px;
                                    text-align: center;
                                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                                ">9</div>

                                <button id="increase-btn" class="hover-lift" style="
                                    width: 40px;
                                    height: 40px;
                                    border: 2px solid rgba(3, 218, 198, 0.3);
                                    border-radius: 10px;
                                    background: rgba(31, 43, 71, 0.8);
                                    color: #03dac6;
                                    font-size: 20px;
                                    cursor: pointer;
                                    font-weight: 600;
                                ">+</button>
                            </div>

                            <div style="
                                font-size: 12px;
                                color: #aaa;
                                font-weight: 500;
                            ">ثانية بين كل رسالة</div>
                        </div>

                        <!-- قسم الصفحات المتعددة -->
                        <div style="
                            background: linear-gradient(135deg, rgba(187, 134, 252, 0.1) 0%, rgba(3, 218, 198, 0.1) 100%);
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 20px;
                            text-align: center;
                            border: 1px solid rgba(187, 134, 252, 0.2);
                        ">
                            <div style="
                                font-size: 11px;
                                color: #bb86fc;
                                font-weight: 600;
                                letter-spacing: 1px;
                                margin-bottom: 12px;
                                text-transform: uppercase;
                            ">إدارة الصفحات المتعددة</div>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 15px;
                                margin-bottom: 12px;
                            ">
                                <button id="decrease-pages-btn" class="hover-lift" style="
                                    width: 40px;
                                    height: 40px;
                                    border: 2px solid rgba(187, 134, 252, 0.3);
                                    border-radius: 10px;
                                    background: rgba(31, 43, 71, 0.8);
                                    color: #bb86fc;
                                    font-size: 20px;
                                    cursor: pointer;
                                    font-weight: 600;
                                ">−</button>

                                <div id="pages-display" class="neon-text" style="
                                    font-size: 36px;
                                    font-weight: 800;
                                    background: linear-gradient(135deg, #bb86fc 0%, #03dac6 100%);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    width: 60px;
                                    text-align: center;
                                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                                ">5</div>

                                <button id="increase-pages-btn" class="hover-lift" style="
                                    width: 40px;
                                    height: 40px;
                                    border: 2px solid rgba(3, 218, 198, 0.3);
                                    border-radius: 10px;
                                    background: rgba(31, 43, 71, 0.8);
                                    color: #03dac6;
                                    font-size: 20px;
                                    cursor: pointer;
                                    font-weight: 600;
                                ">+</button>
                            </div>

                            <div style="
                                font-size: 12px;
                                color: #aaa;
                                font-weight: 500;
                                margin-bottom: 15px;
                            ">عدد الصفحات المراد فتحها</div>

                            <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                                <button id="open-pages-btn" class="hover-lift" style="
                                    flex: 1;
                                    height: 40px;
                                    border: none;
                                    border-radius: 12px;
                                    font-size: 14px;
                                    font-weight: 700;
                                    cursor: pointer;
                                    background: linear-gradient(135deg, #bb86fc 0%, #9c6ae0 100%);
                                    color: #000;
                                    letter-spacing: 0.5px;
                                ">🔗 فتح الصفحات</button>

                                <button id="start-all-btn" class="hover-lift" style="
                                    flex: 1;
                                    height: 40px;
                                    border: none;
                                    border-radius: 12px;
                                    font-size: 14px;
                                    font-weight: 700;
                                    cursor: pointer;
                                    background: linear-gradient(135deg, #03dac6 0%, #00b4a8 100%);
                                    color: #000;
                                    letter-spacing: 0.5px;
                                    opacity: 0.3;
                                " disabled>⚡ بدء الكل</button>
                            </div>

                            <div id="multi-status" style="
                                font-size: 12px;
                                color: #888;
                                font-weight: 600;
                                margin-bottom: 10px;
                            ">🟢 جاهز لفتح الصفحات</div>

                            <div class="pages-container" id="pages-container">
                                <!-- سيتم إضافة الصفحات هنا ديناميكياً -->
                            </div>
                        </div>

                        <!-- أزرار التحكم -->
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                            <button id="start-btn" class="hover-lift" style="
                                flex: 1;
                                height: 45px;
                                border: none;
                                border-radius: 14px;
                                font-size: 15px;
                                font-weight: 700;
                                cursor: pointer;
                                background: linear-gradient(135deg, #03dac6 0%, #00b4a8 100%);
                                color: #000;
                                letter-spacing: 0.5px;
                            ">▶ تشغيل</button>

                            <button id="stop-btn" class="hover-lift" style="
                                flex: 1;
                                height: 45px;
                                border: none;
                                border-radius: 14px;
                                font-size: 15px;
                                font-weight: 700;
                                cursor: pointer;
                                background: linear-gradient(135deg, #cf6679 0%, #b00020 100%);
                                color: #fff;
                                letter-spacing: 0.5px;
                                opacity: 0.3;
                            " disabled>■ إيقاف</button>
                        </div>

                        <div id="status-display" style="
                            background: rgba(15, 23, 41, 0.8);
                            border-radius: 12px;
                            padding: 12px;
                            text-align: center;
                            font-size: 13px;
                            font-weight: 600;
                            color: #888;
                            border: 1px solid rgba(255, 255, 255, 0.05);
                        ">🟢 جاهز للبدء</div>

                        <div id="last-message" style="
                            background: transparent;
                            border-radius: 10px;
                            padding: 8px;
                            text-align: center;
                            font-size: 12px;
                            color: #03dac6;
                            margin-top: 10px;
                            opacity: 0;
                            transition: opacity 0.4s ease;
                            font-weight: 500;
                        ">📝 آخر رسالة: -</div>

                        <button id="close-ui-btn" class="hover-lift" style="
                            position: absolute;
                            top: 16px;
                            left: 16px;
                            width: 32px;
                            height: 32px;
                            border: 2px solid rgba(207, 102, 121, 0.3);
                            border-radius: 10px;
                            background: rgba(207, 102, 121, 0.2);
                            color: #cf6679;
                            font-size: 20px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                        ">×</button>

                        <!-- إضافة إحصائيات الإرسال المباشرة -->
                        <div id="live-stats" style="
                            margin-top: 18px;
                            background: rgba(21, 27, 46, 0.93);
                            border-radius: 14px;
                            padding: 12px 16px 10px 16px;
                            text-align: center;
                            font-size: 13px;
                            font-weight: 700;
                            border: 1.5px solid rgba(187, 134, 252, 0.19);
                            color: #03dac6;
                            box-shadow: 0 2px 18px rgba(10,10,15,0.09);
                        ">
                            <div style="font-size: 15px;margin-bottom:7px;font-weight:900;background:linear-gradient(90deg,#bb86fc,#03dac6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                                إحصائيات الإرسال
                            </div>
                            <div>الرسائل المرسلة: <span id="stat-sent">0</span></div>
                            <div>الأخطاء: <span id="stat-fail">0</span></div>
                            <div>نسبة النجاح: <span id="stat-rate">0%</span></div>
                        </div>

                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', uiHTML);

        let countSent = 0;
        let countFail = 0;

        function updateStats() {
            document.getElementById('stat-sent').textContent = countSent;
            document.getElementById('stat-fail').textContent = countFail;
            let rate = countSent + countFail ? Math.round((countSent / (countSent + countFail)) * 100) : 0;
            document.getElementById('stat-rate').textContent = rate + '%';
        }

        // متغيرات السكربت الأخرى
        let time = 9;
        let pagesCount = 5;
        let task = null;
        let running = false;
        let multiRunning = false;
        let openedPages = [];

        const msgs = [
            "By 7mo7",
            "discord : 7mo7",
            "intsa : 2lryy",
            "fux$k u",
            "Bb",
            "Hi",
            "Sp&m Tell"
        ];

        const sel = '#root textarea';
        const btnSel = 'button[type="submit"]';
        const popupSel = 'i.icon-close-small';
        const capSel = 'iframe[title*="challenge"], iframe[src*="captcha"]';

        const uiContainer = document.getElementById('auto-sender-ui');
        const dragHandle = document.getElementById('drag-handle');
        const timeDisplay = document.getElementById('time-display');
        const pagesDisplay = document.getElementById('pages-display');
        const increaseBtn = document.getElementById('increase-btn');
        const decreaseBtn = document.getElementById('decrease-btn');
        const increasePagesBtn = document.getElementById('increase-pages-btn');
        const decreasePagesBtn = document.getElementById('decrease-pages-btn');
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        const openPagesBtn = document.getElementById('open-pages-btn');
        const startAllBtn = document.getElementById('start-all-btn');
        const statusDisplay = document.getElementById('status-display');
        const multiStatusDisplay = document.getElementById('multi-status');
        const closeBtn = document.getElementById('close-ui-btn');
        const pagesContainer = document.getElementById('pages-container');

        function hasWarning() {
            const allText = Array.from(document.querySelectorAll('*'))
                .map(el => el.textContent)
                .join(' ')
                .toLowerCase();
            return /too many|try again|wait|later|recover|servers|moment|actions/i.test(allText);
        }

        let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
        dragHandle.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === dragHandle || dragHandle.contains(e.target)) {
                isDragging = true;
                uiContainer.style.transition = 'none';
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                uiContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }

        function dragEnd() { initialX = currentX; initialY = currentY; isDragging = false; }

        function animateNumber(element) {
            element.style.transform = 'scale(1.2) rotate(5deg)';
            setTimeout(() => element.style.transform = 'scale(1) rotate(0deg)', 200);
        }

        function updateTime() {
            timeDisplay.textContent = time;
            animateNumber(timeDisplay);
        }

        function updatePagesCount() {
            pagesDisplay.textContent = pagesCount;
            animateNumber(pagesDisplay);
        }

        function setStatus(txt, color, emoji) {
            statusDisplay.textContent = (emoji || '') + ' ' + txt;
            statusDisplay.style.color = color || '#888';
        }

        function setMultiStatus(txt, color, emoji) {
            multiStatusDisplay.textContent = (emoji || '') + ' ' + txt;
            multiStatusDisplay.style.color = color || '#888';
        }

        function updatePagesDisplay() {
            pagesContainer.innerHTML = '';
            openedPages.forEach((page, index) => {
                const pageItem = document.createElement('div');
                pageItem.className = 'page-item';
                pageItem.innerHTML = `
                    <div class="page-url">${page.url}</div>
                    <div class="page-status ${page.status === 'sending' ? 'status-sending' : page.status === 'active' ? 'status-active' : 'status-inactive'}">
                        ${page.status === 'sending' ? 'يرسل' : page.status === 'active' ? 'نشط' : 'غير نشط'}
                    </div>
                `;
                pagesContainer.appendChild(pageItem);
            });
        }

        function openMultiplePages() {
            setMultiStatus('جاري فتح الصفحات...', '#ff9800', '⏳');

            openedPages = [];
            const currentUrl = window.location.href;

            for (let i = 0; i < pagesCount; i++) {
                const newWindow = window.open(currentUrl, `tellonym_page_${i}`, 'width=400,height=600,left=' + (100 + i * 50) + ',top=' + (100 + i * 50));

                if (newWindow) {
                    openedPages.push({
                        id: i,
                        window: newWindow,
                        url: currentUrl,
                        status: 'active'
                    });
                } else {
                    setMultiStatus('تم حظر النوافذ المنبثقة!', '#cf6679', '❌');
                    break;
                }

                if (i < pagesCount - 1) {
                    setTimeout(() => {}, 500);
                }
            }

            if (openedPages.length > 0) {
                setMultiStatus(`تم فتح ${openedPages.length} صفحات`, '#03dac6', '✅');
                startAllBtn.disabled = false;
                startAllBtn.style.opacity = '1';
                updatePagesDisplay();
            }
        }

        function startAllPages() {
            if (openedPages.length === 0) {
                setMultiStatus('يجب فتح الصفحات أولاً', '#cf6679', '❌');
                return;
            }

            multiRunning = true;
            startAllBtn.disabled = true;
            startAllBtn.style.opacity = '0.3';
            setMultiStatus(`جاري الإرسال على ${openedPages.length} صفحات...`, '#03dac6', '⚡');

            openedPages.forEach(page => {
                page.status = 'sending';
                try {
                    if (page.window && !page.window.closed) {
                        page.window.postMessage({
                            type: 'START_SENDING',
                            time: time,
                            messages: msgs
                        }, '*');
                    } else {
                        page.status = 'inactive';
                    }
                } catch (e) {
                    page.status = 'inactive';
                }
            });

            updatePagesDisplay();
        }

        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'SENDING_STATUS') {
                const pageIndex = openedPages.findIndex(p => p.window === event.source);
                if (pageIndex !== -1) {
                    openedPages[pageIndex].status = event.data.sending ? 'sending' : 'active';
                    updatePagesDisplay();
                }
            }
        });

        function send() { const btn = document.querySelector(btnSel); if (btn) btn.click(); }

        function closePopup() { const popup = document.querySelector(popupSel); if (popup) popup.click(); }

        function checkCaptcha() {
            const cap = document.querySelector(capSel);
            if (cap) { stopSending(); setStatus('كابتشا - توقف', '#cf6679', '⛔'); return true; }
            return false;
        }

        function process() {
            if (checkCaptcha()) { countFail++; updateStats(); return; }
            closePopup();

            if (hasWarning()) {
                console.warn("🚫 تم اكتشاف تحذير! سيتم التوقف مؤقتاً...");
                setStatus('تحذير: توقف مؤقت (10 دقائق)', '#ff9800', '⚠️');
                countFail++;
                updateStats();
                clearInterval(task);
                setTimeout(() => {
                    setStatus('استئناف الإرسال...', '#03dac6', '🔄');
                    task = setInterval(process, time * 1000);
                    process();
                }, 600000);
                return;
            }

            const el = document.querySelector(sel);
            if (!el) { countFail++; updateStats(); stopSending(); setStatus('خطأ', '#cf6679', '❌'); return; }

            const txt = msgs[Math.floor(Math.random() * msgs.length)];
            const lastMsgEl = document.getElementById('last-message');
            if (lastMsgEl) {
                lastMsgEl.textContent = '📝 آخر رسالة: ' + txt;
                lastMsgEl.style.opacity = '0';
                setTimeout(() => lastMsgEl.style.opacity = '1', 100);
            }

            try {
                const desc = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value");
                if (desc && desc.set) {
                    desc.set.call(el, txt);
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    if (el.value === txt) { send(); countSent++; updateStats(); return; }
                }
            } catch (e) {}

            (function type(i) {
                i = i || 0;
                if (i === 0) {
                    el.focus();
                    try {
                        const p = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value");
                        if (p && p.set) p.set.call(el, "");
                        else el.value = "";
                    } catch(e) { el.value = ""; }
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (i >= txt.length) {
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    send();
                    countSent++;
                    updateStats();
                    return;
                }

                try {
                    const p = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value");
                    if (p && p.set) p.set.call(el, el.value + txt.charAt(i));
                    else el.value += txt.charAt(i);
                } catch(err) { el.value += txt.charAt(i); }

                try {
                    const ch = txt.charAt(i), code = ch.charCodeAt(0);
                    ['keydown','keypress','keyup'].forEach(t => {
                        el.dispatchEvent(new KeyboardEvent(t, { key: ch, char: ch, keyCode: code, which: code, bubbles: true, cancelable: true }));
                    });
                } catch(e){}

                el.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(() => type(i + 1), 25);
            })();
        }

        function startSending() {
            if (running) return;
            running = true;
            startBtn.disabled = true;
            startBtn.style.opacity = '0.3';
            stopBtn.disabled = false;
            stopBtn.style.opacity = '1';
            setStatus('يعمل (' + time + ' ثانية)', '#03dac6', '⚡');
            process();
            task = setInterval(process, time * 1000);
        }

        function stopSending() {
            if (!running) return;
            running = false;
            clearInterval(task);
            task = null;
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            stopBtn.disabled = true;
            stopBtn.style.opacity = '0.3';
            setStatus('متوقف', '#888', '⏸️');
        }

        increaseBtn.addEventListener('click', () => { if (time < 60) { time++; updateTime(); } });
        decreaseBtn.addEventListener('click', () => { if (time > 1) { time--; updateTime(); } });
        increasePagesBtn.addEventListener('click', () => { if (pagesCount < 10) { pagesCount++; updatePagesCount(); } });
        decreasePagesBtn.addEventListener('click', () => { if (pagesCount > 1) { pagesCount--; updatePagesCount(); } });
        startBtn.addEventListener('click', startSending);
        stopBtn.addEventListener('click', stopSending);
        openPagesBtn.addEventListener('click', openMultiplePages);
        startAllBtn.addEventListener('click', startAllPages);
        closeBtn.addEventListener('click', () => {
            if (running) stopSending();
            openedPages.forEach(page => {
                if (page.window && !page.window.closed) {
                    page.window.close();
                }
            });
            uiContainer.remove();
        });

        updateTime();
        updatePagesCount();
        updateStats();

        console.log("%c✨ TELLONYM SPAM V2.1 MULTI-PAGES LOADED WITH LIVE STATS!", "color:#03dac6;font-size:18px;font-weight:bold");
        console.log("%c🔥 Script by 7mo7 | discord: 7mo7 | insta: 2lryy", "color:#bb86fc;font-size:14px;font-weight:bold;");
    }
})();
