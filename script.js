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
    { name: 'LUNES', exercises: [
      { title: 'Sentadillas (3x5)', series: 3 },
      { title: 'Peso Muerto Rumano (4x12)', series: 4 },
      { title: 'Extensiones de Cuádriceps (4x12)', series: 4 },
      { title: 'Curl Femoral (3x12)', series: 3 },
      { title: 'Gemelos Parado (6x12)', series: 6 },
      { title: 'Gemelos Frontal (4x8)', series: 4 },
      { title: 'Oblicuos (4x12)', series: 4 }
    ] },
    { name: 'MARTES', exercises: [
      { title: 'Banco Plano (3x8)', series: 3 },
      { title: 'Press Militar en Maquina (3x8)', series: 3 },
      { title: 'Press Militar con Mancuernas Concentrado (2x12)', series: 2 },
      { title: 'Cruces de Polea para Pectoral Inferior (3x10)', series: 3 },
      { title: 'Cruces de Polea para Pectoral Superior (3x12)', series: 3 },
      { title: 'Tríceps Polea Alta (4x10)', series: 4 },
      { title: 'Apertura con Maquina con pausa al final (3x12)', series: 3 },
      { title: 'Vuelos Laterales (3x12)', series: 3 },
      { title: 'Tríceps en Maquina Smith (4x12)', series: 4 },
      { title: 'Vuelos Frontales (2x12)', series: 2 }
    ] },
    { name: 'MIÉRCOLES', exercises: [
      { title: 'Remo en Maquina (3x8)', series: 3 },
      { title: 'Remo en Maquina Concentrado (2x12 + 4)', series: 2 },
      { title: 'Biceps con Mancuernas (3x8)', series: 3 },
      { title: 'Remo Alto (5x10)', series: 5 },
      { title: 'Trapecio con Fat Grip (6x10)', series: 6 },
      { title: 'Banco Scott en Polea (3x12)', series: 3 },
      { title: 'Vuelos Posteriores (3x12) + Finisher', series: 3 },
      { title: 'Banco Inclinado con mancuernas (3x12)', series: 3 }
    ] },
    { name: 'JUEVES', exercises: [
      { title: 'Sentadillas (3x5)', series: 3 },
      { title: 'Empuje de Cadera (5x12) + Finisher', series: 5 },
      { title: 'Extensiones de Cuádriceps (6x12)', series: 6 },
      { title: 'Curl Femoral (4x12)', series: 4 },
      { title: 'Gemelos Parado (8x12)', series: 8 },
      { title: 'Gemelos Frontal (4x8)', series: 4 },
      { title: 'Oblicuos (4x12)', series: 4 }
    ] },
    { name: 'VIERNES', exercises: [
      { title: 'Banco Plano (3x8)', series: 3 },
      { title: 'Press Militar en Maquina (3x8)', series: 3 },
      { title: 'Press Militar Mancuernas (2x12)', series: 2 },
      { title: 'Cruces de Polea para Pectoral Inferior (3x10)', series: 3 },
      { title: 'Apertura en Maquina con pausa (5x12)', series: 5 },
      { title: 'Vuelos Laterales (5x12) + Finisher', series: 5 },
      { title: 'Tríceps en Polea Alta (6x12)', series: 6 },
      { title: 'Pecho superior en polea (3x12)', series: 3 },
      { title: 'Tríceps en Maquina Smith (6x12)', series: 6 },
      { title: 'Vuelos Frontales (3x12)', series: 3 }
    ] },
    { name: 'SÁBADO', exercises: [
      { title: 'Remo en Maquina (4x8)', series: 4 },
      { title: 'Remo en Maquina Concentrado (2x12 + 4)', series: 2 },
      { title: 'Biceps con Mancuernas (4x8)', series: 4 },
      { title: 'Remo Alto (6x10)', series: 6 },
      { title: 'Trapecio con Fat Grip (7x10)', series: 7 },
      { title: 'Banco Scott (4x12)', series: 4 },
      { title: 'Vuelos Posteriores (4x12) + 2 Finisher', series: 4 },
      { title: 'Biceps en Banco Inclinado (4x12)', series: 4 }
    ] }];
  const area = document.getElementById('areaTrabajo');
  area.innerHTML = '';

  // Función para verificar si todos los ejercicios del día están completados
  function isDayCompleted(dayIndex) {
    console.log(`Verificando si el día ${dayIndex} está completo`);
    const day = days[dayIndex];
    const allCompleted = day.exercises.every((exercise, exIndex) => {
      const key = `rutina-${dayIndex}-${exIndex}`;
      const count = parseInt(localStorage.getItem(key) || '0');
      const isComplete = count >= exercise.series;
      console.log(`Ejercicio ${exIndex}: ${exercise.title} - ${count}/${exercise.series} - ${isComplete ? 'Completo' : 'Incompleto'}`);
      return isComplete;
    });
    console.log(`Todos los ejercicios del día ${dayIndex} completados:`, allCompleted);
    return allCompleted;
  }

  // Función para actualizar el estado del día
  function updateDayStatus(dayIndex, header) {
    const dayCompleted = isDayCompleted(dayIndex);
    const badge = header.querySelector('.day-complete-badge');
    if (badge) badge.style.display = dayCompleted ? 'inline-block' : 'none';
    header.classList.toggle('day-header-completed', dayCompleted);
  }

  days.forEach((day, dayIndex) => {
    // Día card
    const card = document.createElement('div');
    card.className = 'day-card';
    const header = document.createElement('div');
    header.className = 'day-header';
    // Título del día
    const title = document.createElement('span');
    title.className = 'day-title';
    title.textContent = day.name;
    // Badge de día completado (oculto inicialmente)
    const dayBadge = document.createElement('span');
    dayBadge.className = 'day-complete-badge';
    dayBadge.textContent = 'Día Completado';
    dayBadge.style.display = 'none';
    dayBadge.style.marginLeft = '8px';
    // Flecha de expansión
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.textContent = '▸';
    arrow.style.marginLeft = 'auto';
    // Ensamblar header
    header.append(title, dayBadge, arrow);
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
      
      const key = `rutina-${dayIndex}-${exIndex}`;
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
        
        // Actualizar estado del día
        updateDayStatus(dayIndex, header);
      }
      
      // Estado inicial
      if (count >= exercise.series) {
        exCard.classList.add('exercise-completed');
        btnPlus.disabled = true;
      }
      btnMinus.disabled = count <= 0;
      
      // Verificar estado inicial del día
      updateDayStatus(dayIndex, header);
      
      // Añadir elementos al DOM
      exCard.append(counter, btnGroup);
      content.appendChild(exCard);
    });

    card.append(header, content);
    area.appendChild(card);
  });
});
