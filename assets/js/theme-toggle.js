document.addEventListener('DOMContentLoaded', () => {
  const themeToggleCheckbox = document.getElementById('theme-toggle');
  const themeStylesheet = document.getElementById('theme-stylesheet');

  // Yerel depolamadan mevcut temayı al
  const currentTheme = localStorage.getItem('theme') || 'light';
  setTheme(currentTheme);

  // Checkbox değiştiğinde tema değiştirme
  themeToggleCheckbox.addEventListener('change', () => {
      const newTheme = themeToggleCheckbox.checked ? 'dark' : 'light';
      setTheme(newTheme);
  });

  // Tema ayarlama ve yerel depolamaya kaydetme
  function setTheme(theme) {
      if (theme === 'dark') {
          themeStylesheet.setAttribute('href', '/styles/dark-mode.css'); // Karanlık tema dosyasının yolu
          themeToggleCheckbox.checked = true; // Checkbox'ı işaretle
      } else {
          themeStylesheet.setAttribute('href', '/styles/light-mode.css'); // Aydınlık tema dosyasının yolu
          themeToggleCheckbox.checked = false; // Checkbox'ı işaretleme
      }
      localStorage.setItem('theme', theme); // Tema tercihini yerel depolamada sakla
  }
});
