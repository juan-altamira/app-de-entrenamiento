// SPA de Rutina Semanal - offline, móvil
document.addEventListener('DOMContentLoaded', () => {
  // Botón de reinicio de contadores
  const resetBtn = document.getElementById('resetCounters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres reiniciar todos los contadores?')) {
        // Elimina solo las claves de rutina
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('rutina-')) localStorage.removeItem(k);
        });
        location.reload();
      }
    });
  }

  const days = [
    { name: 'Lunes', exercises: [
      { title: 'Sentadillas', series: 3 },
      { title: 'Peso Muerto Rumano', series: 4 },
      { title: 'Extensiones de Cuádriceps', series: 4 },
      { title: 'Curl Femoral', series: 3 },
      { title: 'Gemelos Parado', series: 6 },
      { title: 'Gemelos Frontal', series: 4 },
      { title: 'Crunch Abdominal', series: 6 },
      { title: 'Oblicuos', series: 4 }
    ] },
    { name: 'Martes', exercises: [
      { title: 'Banco Plano', series: 3 },
      { title: 'Press Militar en Maquina', series: 3 },
      { title: 'Press Militar con Mancuernas Concentrado', series: 2 },
      { title: 'Cruces de Polea para Pectoral Inferior', series: 3 },
      { title: 'Cruces de Polea para Pectoral Superior', series: 3 },
      { title: 'Tríceps Polea Alta', series: 4 },
      { title: 'Apertura con Maquina con pausa al final', series: 3 },
      { title: 'Vuelos Laterales', series: 3 },
      { title: 'Tríceps en Maquina Smith', series: 4 },
      { title: 'Vuelos Frontales', series: 2 }
    ] },
    { name: 'Miércoles', exercises: [
      { title: 'Remo en Maquina', series: 3 },
      { title: 'Remo en Maquina Concentrado (2x12 + 4)', series: 3 },
      { title: 'Biceps con Mancuernas', series: 3 },
      { title: 'Remo Alto', series: 4 },
      { title: 'Jalón al Pecho', series: 3 },
      { title: 'Trapecio con Fat Grip', series: 6 },
      { title: 'Banco Scott en Polea', series: 3 },
      { title: 'Vuelos Posteriores (3x12) + Finisher', series: 3 },
      { title: 'Banco Inclinado con mancuernas', series: 3 }
    ] },
    { name: 'Jueves', exercises: [
      { title: 'Sentadillas', series: 3 },
      { title: 'Empuje de Cadera + Finisher', series: 5 },
      { title: 'Extensiones de Cuádriceps', series: 6 },
      { title: 'Curl Femoral', series: 4 },
      { title: 'Gemelos Parado', series: 8 },
      { title: 'Gemelos Frontal', series: 4 },
      { title: 'Crunch Abdominal', series: 6 },
      { title: 'Oblicuos', series: 4 }
    ] },
    { name: 'Viernes', exercises: [
      { title: 'Banco Plano', series: 3 },
      { title: 'Press Militar en Maquina', series: 3 },
      { title: 'Press Militar Concentrado', series: 2 },
      { title: 'Pecho en Maquina Hammer', series: 3 },
      { title: 'Apertura con Maquina con pausa al final', series: 5 },
      { title: 'Vuelos Laterales + Finisher', series: 5 },
      { title: 'Tríceps en Polea Alta', series: 5 },
      { title: 'Pecho superior en polea', series: 3 },
      { title: 'Tríceps en Maquina Smith', series: 6 },
      { title: 'Vuelos Frontales', series: 3 }
    ] },
    { name: 'Sábado', exercises: [
      { title: 'Remo en Maquina', series: 4 },
      { title: 'Remo en Maquina Concentrado (2x12 + 4)', series: 3 },
      { title: 'Biceps con Mancuernas', series: 4 },
      { title: 'Remo Alto', series: 5 },
      { title: 'Jalón al Pecho', series: 3 },
      { title: 'Trapecio con Fat Grip', series: 7 },
      { title: 'Banco Scott', series: 4 },
      { title: 'Vuelos Posteriores (4x12) + 2 Finisher', series: 4 },
      { title: 'Biceps en Banco Inclinado', series: 4 }
    ] }
  ];

  const area = document.getElementById('areaTrabajo');
  area.innerHTML = '';

  days.forEach((day, dayIndex) => {
    // Día card
    const card = document.createElement('div');
    card.className = 'day-card';
    const header = document.createElement('div');
    header.className = 'day-header';
    header.textContent = day.name;
    const arrow = document.createElement('span'); arrow.textContent = '▸';
    header.appendChild(arrow);
    const content = document.createElement('div'); content.className = 'day-content';
    header.addEventListener('click', () => {
      content.classList.toggle('expanded');
      arrow.textContent = content.classList.contains('expanded') ? '▾' : '▸';
    });

    // Ejercicios
    day.exercises.forEach((exercise, exIndex) => {
      const exCard = document.createElement('div'); 
      exCard.className = 'exercise-card';
      
      // Título del ejercicio
      const title = document.createElement('div'); 
      title.className = 'exercise-title'; 
      title.textContent = exercise.title;
      exCard.appendChild(title);
      
      // Badge de completado
      const completionBadge = document.createElement('div');
      completionBadge.className = 'completion-badge';
      completionBadge.textContent = 'Completado';
      exCard.appendChild(completionBadge);
      
      const key = `rutina-${day.name}-${exIndex}`;
      let count = parseInt(localStorage.getItem(key)) || 0;
      
      // Contador
      const counter = document.createElement('div'); 
      counter.className = 'counter'; 
      counter.textContent = `${count} / ${exercise.series}`;
      
      // Botones de control
      const btnGroup = document.createElement('div'); 
      btnGroup.className = 'button-group';
      
      const btnMinus = document.createElement('button'); 
      btnMinus.textContent = '–';
      
      const btnPlus = document.createElement('button'); 
      btnPlus.textContent = '+';
      
      // Configuración de eventos táctiles
      [btnMinus, btnPlus].forEach(btn => btn.style.touchAction = 'manipulation');
      
      // Eventos de los botones
      btnMinus.addEventListener('click', () => { 
        if (count > 0) { 
          count--; 
          update(); 
        } 
      });
      
      btnPlus.addEventListener('click', () => { 
        if (count < exercise.series) { 
          count++; 
          update(); 
        } 
      });
      
      btnGroup.append(btnMinus, btnPlus);
      
      // Función para actualizar la UI
      function update() {
        localStorage.setItem(key, count);
        counter.textContent = `${count} / ${exercise.series}`;
        
        if (count >= exercise.series) {
          exCard.classList.add('exercise-completed');
          btnPlus.disabled = true;
        } else {
          exCard.classList.remove('exercise-completed');
          btnPlus.disabled = false;
        }
        
        // Actualizar estado del botón de menos
        btnMinus.disabled = count <= 0;
      }
      
      // Estado inicial
      if (count >= exercise.series) {
        exCard.classList.add('exercise-completed');
        btnPlus.disabled = true;
      }
      btnMinus.disabled = count <= 0;
      
      // Añadir elementos al DOM
      exCard.append(counter, btnGroup);
      content.appendChild(exCard);
    });

    card.append(header, content);
    area.appendChild(card);
  });
});
