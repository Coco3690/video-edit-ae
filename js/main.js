// 滑鼠滑過自動播放
document.querySelectorAll('.video-preview').forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0; // 重置時間
  });
});

// 全螢幕播放功能
let videoList = [];        // 所有影片的 src 陣列
let currentIndex = -1;     // 目前播放影片的索引
let fullscreenKeydownHandler; // 儲存事件監聽器
let currentVideo = null;   // <-- 新增：目前全螢幕的 video element

function openFullscreen(button) {
  // 取得目前這個影片的 src
  const currentVideoElem = button.closest('.tm-thumbnail-container').querySelector('video');
  const videoSrc = currentVideoElem.getAttribute('src') ||
                   currentVideoElem.querySelector('source')?.getAttribute('src');

  // 建立 videoList（只建立一次）
  if (videoList.length === 0) {
    document.querySelectorAll('.tm-thumbnail-container video').forEach(v => {
      const src = v.getAttribute('src') || v.querySelector('source')?.getAttribute('src');
      if (src) videoList.push(src);
    });
  }

  // 找出當前影片在陣列中的索引
  currentIndex = videoList.indexOf(videoSrc);

  // 建立全螢幕 overlay
  const overlay = document.createElement('div');
  overlay.id = 'fullscreen-overlay';
  overlay.tabIndex = -1;
  overlay.innerHTML = `
    <span class="close-btn" onclick="closeFullscreen()">&times;</span>
    <video id="fullscreen-video" src="${videoSrc}" autoplay controls></video>
    <div class="video-hint">按 ↑↓ 鍵可快速瀏覽上下則影片</div>
  `;

  document.body.appendChild(overlay);
  overlay.style.display = 'flex';
  overlay.focus();

  // 註冊鍵盤事件
  fullscreenKeydownHandler = function(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (currentIndex < videoList.length - 1) {
        currentIndex++;
        switchVideo(videoList[currentIndex]);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (currentIndex > 0) {
        currentIndex--;
        switchVideo(videoList[currentIndex]);
      }
    }
  };

  document.addEventListener('keydown', fullscreenKeydownHandler);
}

function switchVideo(newSrc) {
  const video = document.getElementById('fullscreen-video');
  if (video) {
    video.src = newSrc;
    video.play();
  }
}

function closeFullscreen() {
  const overlay = document.getElementById('fullscreen-overlay');
  if (overlay) {
    overlay.remove();

    // 🔹移除鍵盤事件監聽器
    if (fullscreenKeydownHandler) {
      document.removeEventListener('keydown', fullscreenKeydownHandler);
      fullscreenKeydownHandler = null;
    }

    if (currentVideo) {
      currentVideo.pause();
      currentVideo = null;
    }
  }
}

// 🔹ESC 按鍵關閉全螢幕
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeFullscreen();
  }
});
