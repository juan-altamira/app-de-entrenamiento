// SPA de Rutina Semanal - offline, móvil
document.addEventListener('DOMContentLoaded', () => {
  const ROUTINE_STORAGE_KEY = 'rutina-config';
  const COUNT_PREFIX = 'rutina-count-';

  const defaultRoutine = [
    { name: 'LUNES', exercises: [
      { id: 'lunes-sentadillas', title: 'Sentadillas (3x5)', series: 3 },
      { id: 'lunes-empuje-cadera', title: 'Empuje de Cadera (4x12) + Finisher', series: 4 },
      { id: 'lunes-ext-cuadriceps', title: 'Extensiones de Cuádriceps (4x12)', series: 4 },
      { id: 'lunes-curl-femoral', title: 'Curl Femoral (4x12)', series: 4 },
      { id: 'lunes-extension-lumbar', title: 'Extensión lumbar 45° (2x12)', series: 2 },
      { id: 'lunes-gemelos-parado', title: 'Gemelos Parado (6x12)', series: 6 },
      { id: 'lunes-gemelo-sentado', title: 'Gemelo Sentado (5x12)', series: 5 },
      { id: 'lunes-gemelos-frontal', title: 'Gemelos Frontal (4x8)', series: 4 }
    ] },
    { name: 'MARTES', exercises: [
      { id: 'martes-banco-plano', title: 'Banco Plano (3x8)', series: 3 },
      { id: 'martes-press-militar-maquina', title: 'Press Militar en Máquina (3x8)', series: 3 },
      { id: 'martes-press-mancuernas-concentrado', title: 'Press Militar con Mancuernas Concentrado (2x12)', series: 2 },
      { id: 'martes-cruces-polea-inferior', title: 'Cruces de Polea - Pectoral Inferior (2x10)', series: 2 },
      { id: 'martes-cruces-polea-superior', title: 'Cruces de Polea - Pectoral Superior (4x12)', series: 4 },
      { id: 'martes-triceps-polea-alta', title: 'Tríceps en Polea Alta (4x10)', series: 4 },
      { id: 'martes-triceps-polea-baja', title: 'Tríceps en Polea Baja (4x12)', series: 4 },
      { id: 'martes-vuelos-laterales', title: 'Vuelos Laterales (4x12)', series: 4 }
    ] },
    { name: 'MIÉRCOLES', exercises: [
      { id: 'miercoles-remo-maquina', title: 'Remo en Máquina (3x8)', series: 3 },
      { id: 'miercoles-remo-maquina-concentrado', title: 'Remo en Máquina Concentrado (2x12 + 4)', series: 2 },
      { id: 'miercoles-biceps-mancuernas', title: 'Bíceps con Mancuernas (3x8)', series: 3 },
      { id: 'miercoles-remo-t', title: 'Remo T (5x10)', series: 5 },
      { id: 'miercoles-banco-scott', title: 'Banco Scott (3x12)', series: 3 },
      { id: 'miercoles-face-pull', title: 'Face Pull (2x12)', series: 2 },
      { id: 'miercoles-y-raise', title: 'Y-raise (2x12)', series: 2 },
      { id: 'miercoles-banco-inclinado', title: 'Banco Inclinado con Mancuernas (3x12)', series: 3 },
      { id: 'miercoles-rotadores-externos', title: 'Rotadores externos en polea codo pegado al cuerpo, polea altura del codo (3x12)', series: 3 },
      { id: 'miercoles-trapecio-fat-grip', title: 'Trapecio con Fat Grip (6x10)', series: 6 },
      { id: 'miercoles-vuelos-posteriores', title: 'Vuelos Posteriores (3x12)', series: 3 }
    ] },
    { name: 'JUEVES', exercises: [
      { id: 'jueves-sentadillas', title: 'Sentadillas (3x5)', series: 3 },
      { id: 'jueves-empuje-cadera', title: 'Empuje de Cadera (5x12) + Finisher', series: 5 },
      { id: 'jueves-ext-cuadriceps', title: 'Extensiones de Cuádriceps (5x12)', series: 5 },
      { id: 'jueves-curl-femoral', title: 'Curl Femoral (5x12)', series: 5 },
      { id: 'jueves-extension-lumbar', title: 'Extensión lumbar 45° (3x12)', series: 3 },
      { id: 'jueves-gemelos-parado', title: 'Gemelos Parado (8x12)', series: 8 },
      { id: 'jueves-gemelo-sentado', title: 'Gemelo Sentado (6x12)', series: 6 },
      { id: 'jueves-gemelos-frontal', title: 'Gemelos Frontal (4x8)', series: 4 }
    ] },
    { name: 'VIERNES', exercises: [
      { id: 'viernes-banco-plano', title: 'Banco Plano (3x8)', series: 3 },
      { id: 'viernes-press-militar-maquina', title: 'Press Militar en Máquina (3x8)', series: 3 },
      { id: 'viernes-press-militar-mancuernas', title: 'Press Militar con Mancuernas (2x12)', series: 2 },
      { id: 'viernes-cruces-polea-inferior', title: 'Cruces de Polea - Pectoral Inferior (3x10)', series: 3 },
      { id: 'viernes-cruces-polea-superior', title: 'Cruces de Polea - Pectoral Superior (4x12)', series: 4 },
      { id: 'viernes-triceps-polea-alta', title: 'Tríceps en Polea Alta (6x12)', series: 6 },
      { id: 'viernes-triceps-polea-baja', title: 'Tríceps en Polea Baja (4x12)', series: 4 },
      { id: 'viernes-apertura-maquina', title: 'Apertura en Máquina (2x12)', series: 2 },
      { id: 'viernes-vuelos-laterales', title: 'Vuelos Laterales (6x12) + Finisher', series: 6 }
    ] },
    { name: 'SÁBADO', exercises: [
      { id: 'sabado-remo-maquina', title: 'Remo en Máquina (4x8)', series: 4 },
      { id: 'sabado-remo-maquina-concentrado', title: 'Remo en Máquina Concentrado (2x12 + 4)', series: 2 },
      { id: 'sabado-biceps-mancuernas', title: 'Bíceps con Mancuernas (4x8)', series: 4 },
      { id: 'sabado-remo-t', title: 'Remo T (6x10)', series: 6 },
      { id: 'sabado-banco-scott', title: 'Banco Scott (4x12)', series: 4 },
      { id: 'sabado-face-pull', title: 'Face Pull (3x12)', series: 3 },
      { id: 'sabado-y-raise', title: 'Y-raise (2x12)', series: 2 },
      { id: 'sabado-biceps-banco-inclinado', title: 'Bíceps en Banco Inclinado (4x12)', series: 4 },
      { id: 'sabado-rotadores-externos', title: 'Rotadores externos en polea codo pegado al cuerpo, polea altura del codo (4x12)', series: 4 },
      { id: 'sabado-trapecio-fat-grip', title: 'Trapecio con Fat Grip (7x10)', series: 7 },
      { id: 'sabado-vuelos-posteriores', title: 'Vuelos Posteriores (4x12)', series: 4 }
    ] }
  ];

  const area = document.getElementById('areaTrabajo');
  const resetBtn = document.getElementById('resetCounters');
  const openEditorBtn = document.getElementById('openEditor');
  const overlay = document.getElementById('editorOverlay');
  const closeEditorBtn = document.getElementById('closeEditor');
  const cancelEditorBtn = document.getElementById('cancelEditorBtn');
  const saveRoutineBtn = document.getElementById('saveRoutineBtn');
  const daySelector = document.getElementById('daySelector');
  const exerciseList = document.getElementById('exerciseList');
  const addExerciseBtn = document.getElementById('addExerciseBtn');

  let routine = loadRoutine();
  let tempRoutine = null;

  persistRoutine();
  requestPersistentStorage();
  window.addEventListener('storage', handleExternalRoutineUpdate);

  cleanupLegacyCounters();
  renderRoutine();
  setupResetButton();
  setupEditorEvents();

  function loadRoutine() {
    const stored = localStorage.getItem(ROUTINE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return sanitizeRoutine(parsed);
      } catch (error) {
        console.warn('No se pudo cargar la rutina almacenada, se usará la predeterminada.', error);
        localStorage.removeItem(ROUTINE_STORAGE_KEY);
      }
    }
    return sanitizeRoutine(defaultRoutine);
  }

  function sanitizeRoutine(inputRoutine) {
    return cloneRoutine(inputRoutine).map(day => {
      const safeName = day.name || 'DÍA';
      const exercises = Array.isArray(day.exercises) ? day.exercises : [];
      return {
        name: safeName,
        exercises: exercises.map(exercise => ({
          id: exercise.id || generateExerciseId(safeName),
          title: (exercise.title || '').trim() || 'Ejercicio sin título',
          series: normalizeSeries(exercise.series)
        }))
      };
    });
  }

  function normalizeSeries(value) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

  function cloneRoutine(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function cleanupLegacyCounters() {
    const pattern = /^rutina-\d+-\d+$/;
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && pattern.test(key)) {
        toRemove.push(key);
      }
    }
    toRemove.forEach(key => localStorage.removeItem(key));
  }

  function renderRoutine() {
    if (!area) return;
    area.innerHTML = '';

    routine.forEach((day, dayIndex) => {
      const card = document.createElement('div');
      card.className = 'day-card';

      const header = document.createElement('div');
      header.className = 'day-header';

      const title = document.createElement('span');
      title.className = 'day-title';
      title.textContent = day.name;

      const dayBadge = document.createElement('span');
      dayBadge.className = 'day-complete-badge';
      dayBadge.textContent = 'Día Completado';
      dayBadge.style.display = 'none';
      dayBadge.style.marginLeft = '8px';

      const arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.textContent = '▸';
      arrow.style.marginLeft = 'auto';

      header.append(title, dayBadge, arrow);

      const content = document.createElement('div');
      content.className = 'day-content';

      header.addEventListener('click', () => {
        content.classList.toggle('expanded');
        arrow.textContent = content.classList.contains('expanded') ? '▾' : '▸';
      });

      if (day.exercises.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'exercise-card';
        emptyMessage.textContent = 'No hay ejercicios configurados para este día.';
        content.appendChild(emptyMessage);
      } else {
        day.exercises.forEach(exercise => {
          const exCard = document.createElement('div');
          exCard.className = 'exercise-card';

          const titleEl = document.createElement('div');
          titleEl.className = 'exercise-title';
          titleEl.textContent = exercise.title;
          exCard.appendChild(titleEl);

          const completionBadge = document.createElement('div');
          completionBadge.className = 'completion-badge';
          completionBadge.textContent = 'Completado';
          exCard.appendChild(completionBadge);

          let count = getExerciseCount(exercise);
          if (count > exercise.series) {
            count = exercise.series;
            setExerciseCount(exercise, count);
          }

          const counter = document.createElement('div');
          counter.className = 'counter';
          counter.textContent = `${count} / ${exercise.series}`;

          const btnGroup = document.createElement('div');
          btnGroup.className = 'button-group';

          const btnMinus = document.createElement('button');
          btnMinus.textContent = '–';

          const btnPlus = document.createElement('button');
          btnPlus.textContent = '+';

          [btnMinus, btnPlus].forEach(btn => {
            btn.style.touchAction = 'manipulation';
          });

          btnMinus.addEventListener('click', () => {
            if (count > 0) {
              count -= 1;
              updateCounterState();
            }
          });

          btnPlus.addEventListener('click', () => {
            if (count < exercise.series) {
              count += 1;
              updateCounterState();
            }
          });

          btnGroup.append(btnMinus, btnPlus);

          function updateCounterState() {
            setExerciseCount(exercise, count);
            counter.textContent = `${count} / ${exercise.series}`;
            if (count >= exercise.series) {
              exCard.classList.add('exercise-completed');
              btnPlus.disabled = true;
            } else {
              exCard.classList.remove('exercise-completed');
              btnPlus.disabled = false;
            }
            btnMinus.disabled = count <= 0;
            updateDayStatus(dayIndex, header);
          }

          if (count >= exercise.series) {
            exCard.classList.add('exercise-completed');
            btnPlus.disabled = true;
          }
          btnMinus.disabled = count <= 0;

          exCard.append(counter, btnGroup);
          content.appendChild(exCard);
        });
      }

      card.append(header, content);
      area.appendChild(card);
      updateDayStatus(dayIndex, header);
    });
  }

  function getExerciseCount(exercise) {
    const raw = localStorage.getItem(`${COUNT_PREFIX}${exercise.id}`);
    const value = parseInt(raw, 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function setExerciseCount(exercise, value) {
    localStorage.setItem(`${COUNT_PREFIX}${exercise.id}`, String(value));
  }

  function isDayCompleted(dayIndex) {
    const day = routine[dayIndex];
    if (!day || day.exercises.length === 0) return false;
    return day.exercises.every(exercise => getExerciseCount(exercise) >= exercise.series);
  }

  function updateDayStatus(dayIndex, header) {
    const dayCompleted = isDayCompleted(dayIndex);
    const badge = header.querySelector('.day-complete-badge');
    if (badge) badge.style.display = dayCompleted ? 'inline-block' : 'none';
    header.classList.toggle('day-header-completed', dayCompleted);
  }

  function setupResetButton() {
    if (!resetBtn) return;
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres reiniciar todos los contadores?')) {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i += 1) {
          const key = localStorage.key(i);
          if (key && key.startsWith(COUNT_PREFIX)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        renderRoutine();
      }
    });
  }

  function setupEditorEvents() {
    if (!openEditorBtn || !overlay) return;

    openEditorBtn.addEventListener('click', openEditor);

    [closeEditorBtn, cancelEditorBtn].forEach(btn => {
      if (btn) btn.addEventListener('click', closeEditor);
    });

    overlay.addEventListener('click', event => {
      if (event.target === overlay) {
        closeEditor();
      }
    });

    if (daySelector) {
      daySelector.addEventListener('change', event => {
        const index = parseInt(event.target.value, 10);
        if (!Number.isNaN(index)) {
          renderExerciseList(index);
        }
      });
    }

    if (addExerciseBtn) {
      addExerciseBtn.addEventListener('click', () => {
        if (!tempRoutine) return;
        const index = parseInt(daySelector.value, 10);
        if (Number.isNaN(index)) return;
        const day = tempRoutine[index];
        if (!day) return;
        day.exercises.push({
          id: generateExerciseId(day.name),
          title: 'Nuevo ejercicio',
          series: 1
        });
        renderExerciseList(index);
      });
    }

    if (saveRoutineBtn) {
      saveRoutineBtn.addEventListener('click', () => {
        if (!tempRoutine) return;
        commitTempRoutine();
      });
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeEditor();
      }
    });
  }

  function openEditor() {
    tempRoutine = cloneRoutine(routine);
    populateDaySelector();

    if (tempRoutine.length > 0) {
      daySelector.value = '0';
      renderExerciseList(0);
    } else {
      exerciseList.innerHTML = '';
      if (addExerciseBtn) addExerciseBtn.disabled = true;
    }

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeEditor() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    daySelector.innerHTML = '';
    exerciseList.innerHTML = '';
    tempRoutine = null;
  }

  function populateDaySelector() {
    if (!daySelector) return;
    daySelector.innerHTML = '';
    tempRoutine.forEach((day, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = day.name;
      daySelector.appendChild(option);
    });
  }

  function renderExerciseList(dayIndex) {
    if (!exerciseList || !tempRoutine) return;
    const day = tempRoutine[dayIndex];
    exerciseList.innerHTML = '';

    if (!day) {
      if (addExerciseBtn) addExerciseBtn.disabled = true;
      return;
    }

    if (addExerciseBtn) addExerciseBtn.disabled = false;

    if (day.exercises.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No hay ejercicios. Agregá uno nuevo para este día.';
      empty.style.color = '#b3b3c9';
      empty.style.margin = '0';
      exerciseList.appendChild(empty);
      return;
    }

    day.exercises.forEach((exercise, exIndex) => {
      const card = document.createElement('div');
      card.className = 'exercise-config-card';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-exercise-btn';
      removeBtn.type = 'button';
      removeBtn.textContent = '×';
      removeBtn.title = 'Eliminar ejercicio';
      removeBtn.addEventListener('click', () => {
        day.exercises.splice(exIndex, 1);
        renderExerciseList(dayIndex);
      });
      card.appendChild(removeBtn);

      const fields = document.createElement('div');
      fields.className = 'exercise-config-fields';

      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = exercise.title;
      titleInput.placeholder = 'Nombre del ejercicio';
      titleInput.autocomplete = 'off';
      titleInput.addEventListener('input', event => {
        exercise.title = event.target.value;
      });

      const seriesInput = document.createElement('input');
      seriesInput.type = 'number';
      seriesInput.min = '1';
      seriesInput.value = exercise.series;
      seriesInput.placeholder = 'Series';
      seriesInput.inputMode = 'numeric';
      seriesInput.classList.add('series-field');
      seriesInput.addEventListener('input', event => {
        exercise.series = normalizeSeries(event.target.value);
      });
      seriesInput.addEventListener('blur', () => {
        seriesInput.value = exercise.series;
      });

      fields.append(titleInput, seriesInput);
      card.appendChild(fields);
      exerciseList.appendChild(card);
    });
  }

  function commitTempRoutine() {
    const sanitized = tempRoutine.map(day => ({
      name: day.name,
      exercises: day.exercises.map(exercise => ({
        id: exercise.id || generateExerciseId(day.name),
        title: (exercise.title || '').trim() || 'Ejercicio sin título',
        series: normalizeSeries(exercise.series)
      }))
    }));

    routine = sanitized;
    persistRoutine();
    syncCountersWithRoutine();
    renderRoutine();
    closeEditor();
  }

  function persistRoutine() {
    try {
      localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routine));
    } catch (error) {
      console.error('No se pudo guardar la rutina en el dispositivo.', error);
      alert('No se pudo guardar la rutina en el dispositivo. Liberá espacio o revisá los permisos de almacenamiento.');
    }
  }

  function syncCountersWithRoutine() {
    const validExercises = new Map();
    routine.forEach(day => {
      day.exercises.forEach(exercise => {
        validExercises.set(exercise.id, exercise);
      });
    });

    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(COUNT_PREFIX)) continue;
      const exerciseId = key.slice(COUNT_PREFIX.length);
      if (!validExercises.has(exerciseId)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    validExercises.forEach((exercise, id) => {
      const key = `${COUNT_PREFIX}${id}`;
      const value = parseInt(localStorage.getItem(key), 10);
      if (Number.isFinite(value) && value > exercise.series) {
        localStorage.setItem(key, String(exercise.series));
      }
    });
  }

  function generateExerciseId(dayName) {
    const normalizedDay = (dayName || 'dia').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `${normalizedDay}-${window.crypto.randomUUID()}`;
    }
    const randomSuffix = Math.random().toString(36).slice(2, 8);
    const timeSuffix = Date.now().toString(36);
    return `${normalizedDay}-${randomSuffix}-${timeSuffix}`;
  }

  function requestPersistentStorage() {
    if (!navigator.storage || typeof navigator.storage.persist !== 'function') return;
    navigator.storage.persisted?.().then(alreadyPersisted => {
      if (alreadyPersisted) return;
      return navigator.storage.persist().catch(error => {
        console.warn('No se pudo solicitar almacenamiento persistente.', error);
      });
    }).catch(error => {
      console.warn('No se pudo verificar el estado del almacenamiento persistente.', error);
    });
  }

  function handleExternalRoutineUpdate(event) {
    if (event.storageArea !== localStorage || event.key !== ROUTINE_STORAGE_KEY) return;
    if (!event.newValue) return;
    try {
      const updated = sanitizeRoutine(JSON.parse(event.newValue));
      routine = updated;
      renderRoutine();
      if (overlay && !overlay.classList.contains('hidden') && tempRoutine) {
        tempRoutine = cloneRoutine(routine);
        if (daySelector) {
          const selectedIndex = parseInt(daySelector.value, 10);
          if (!Number.isNaN(selectedIndex)) {
            renderExerciseList(selectedIndex);
          }
        }
      }
    } catch (error) {
      console.warn('No se pudo sincronizar la rutina con los cambios externos.', error);
    }
  }
});
