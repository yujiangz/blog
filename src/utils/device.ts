export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 是小尺寸
export function isSmallScreen() {
  return window.innerWidth < 768;
}
