document.addEventListener('DOMContentLoaded', function() {
  const clock = document.getElementById('clock');
  const currentHourText = document.getElementById('currentHour');
  const clockImage = document.getElementById('clockImage');
  const nightStartHour = 18; // 6 PM
  const nightEndHour = 6;    // 6 AM
  const dayImage = '/imagenes/sol.png'; // Imagen para el día
  const nightImage = '/imagenes/luna.png'; // Imagen para la noche
  const flames = [];
  const radius = 130; // Radio del círculo de llamas
  const centerX = 150; // Centro del círculo (mitad del tamaño del reloj)
  const centerY = 150; // Centro del círculo (mitad del tamaño del reloj)
  const imagePath = '/imagenes/flama.gif'; // Ruta de la imagen de la llama

  // Obtener la hora actual
  const currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();

  // Determinar si es de noche o de día
  if (currentHour >= nightStartHour || currentHour < nightEndHour) {
    // Es de noche, cambia la imagen
    clockImage.src = nightImage;
  } else {
    // Es de día, usa la imagen predeterminada
    clockImage.src = dayImage;
  }

  // Formatear la hora en formato militar (24 horas)
  const formattedHour = (currentHour < 10 ? '0' : '') + currentHour;
  const formattedMinute = (currentMinute < 10 ? '0' : '') + currentMinute;

  // Mostrar la hora en el formato deseado
  currentHourText.textContent = `${formattedHour}:${formattedMinute}`;

  // Inicializar llamas
  for (let i = 0; i < 12; i++) {
    const flame = document.createElement('div');
    flame.classList.add('flame');

    const img = document.createElement('img');
    img.src = imagePath; // Usar la imagen para cada hora
    img.alt = `Hora ${i + 1}`;
    flame.appendChild(img);

    // Calcular posición de cada llama
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 3; // Ajustar ángulo para empezar en las 12 en punto
    const x = centerX + radius * Math.cos(angle) - 25; // Offset por la mitad del tamaño de la llama
    const y = centerY + radius * Math.sin(angle) - 25; // Offset por la mitad del tamaño de la llama
    flame.style.left = `${x}px`;
    flame.style.top = `${y}px`;

    // Ajustar la escala inicial basada en la hora actual
    if (i < currentHour % 12) {
      flame.style.transform = 'scale(0)';
    } else if (i === currentHour % 12) {
      const scale = 1 - (currentMinute / 60); // Reducir proporcionalmente según los minutos pasados
      flame.style.transform = `scale(${scale})`;
    }

    clock.appendChild(flame);
    flames.push(flame);
  }

  // Función para actualizar la hora actual y las llamas
  function updateClock() {
    const now = new Date();
    currentHour = now.getHours();
    currentMinute = now.getMinutes();

    // Determinar si es de noche o de día
    if (currentHour >= nightStartHour || currentHour < nightEndHour) {
      // Es de noche, cambia la imagen
      clockImage.src = nightImage;
    } else {
      // Es de día, usa la imagen predeterminada
      clockImage.src = dayImage;
    }

    // Formatear la hora en formato militar (24 horas)
    const formattedHour = (currentHour < 10 ? '0' : '') + currentHour;
    const formattedMinute = (currentMinute < 10 ? '0' : '') + currentMinute;

    // Mostrar la hora en el formato deseado
    currentHourText.textContent = `${formattedHour}:${formattedMinute}`;

    // Actualizar las llamas
    flames.forEach((flame, index) => {
      if (currentHour % 12 === 0 && currentMinute === 0) {
        // Es mediodía (12:00 PM) o medianoche (00:00 AM), encender todas las llamas
        flame.style.transform = 'scale(1)';
      } else if (index < currentHour % 12) {
        // Horas anteriores a la actual, apagar llamas
        flame.style.transform = 'scale(0)';
      } else if (index === currentHour % 12) {
        // Hora actual, ajustar escala según minutos pasados
        const scale = 1 - (currentMinute / 60);
        flame.style.transform = `scale(${scale})`;
      } else {
        // Horas posteriores a la actual, encender llamas
        flame.style.transform = 'scale(1)';
      }
    });
  }

  // Actualizar la hora y las llamas cada segundo
  setInterval(updateClock, 1000);
  updateClock(); // Llamar la función inmediatamente para establecer la hora actual
});
