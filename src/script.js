document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar ul li a");
  const boxTypeDisplay = document.createElement("p");
  boxTypeDisplay.style.marginTop = "20px";

  const form = document.getElementById("boxCalculator");
  const resultDiv = document.getElementById("result");
  const steps = document.querySelectorAll(".step");
  let selectedBox = null; // Текущий выбранный тип изделия
  const results = {}; // Сохраняем результаты для каждого каталога

  // Сбрасываем шаги
  function resetSteps() {
    steps.forEach((step, index) => {
      step.style.backgroundColor = index === 0 ? "#5C4033" : "#D3D3D3";
    });
  }

  // Логика выбора типа изделия
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Запоминаем выбранный тип изделия
      selectedBox = this.textContent.trim();
      boxTypeDisplay.textContent = `Вы выбрали тип изделия: ${selectedBox}`;
      document.querySelector(".sidebar").appendChild(boxTypeDisplay);

      // Сбрасываем шаги и очищаем результаты
      resetSteps();
      resultDiv.innerHTML = `<p>Результат для ${selectedBox} пока отсутствует.</p>`;
    });
  });

  // Логика обработки формы
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Проверяем, выбрана ли категория
    if (!selectedBox) {
      alert("Пожалуйста, выберите тип изделия!");
      return;
    }

    // Получаем значения из input
    const length = parseFloat(document.getElementById("length").value) || 0;
    const width = parseFloat(document.getElementById("width").value) || 0;
    const height = parseFloat(document.getElementById("height").value) || 0;

    if (!length || !width || !height) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    let resultHTML = ""; // Переменная для хранения HTML результата

    // Логика вычислений
      if (selectedBox === "У32") {
        // Расчёты для У32
        const plotnostFanery = 650;
        const plotnostDereva = 540;
        const O6 = 0.018;
        const ColichestvoSten = 2;
        const tolshchinaSten = 0.009;
  
        // Дно
        const fanera1 = plotnostFanery * (length / 1000) * (width / 1000) * O6;
        const brus1 = (plotnostDereva * (length / 1000) * 0.1 * 0.1 * 3) +
                      (plotnostDereva * (width / 1000) * 0.1 * 0.1 * 3);
        const Dno = fanera1 + brus1;
  
        // Боковые стенки
        const fanera2 = plotnostFanery * ((height / 1000) + 0.118) * (length / 1000) * tolshchinaSten;
        const brusObshch1 = plotnostDereva * ((height / 1000) - 0.17) * 0.03 * 0.07 * 2 +
                            plotnostDereva * (length / 1000) * 0.03 * 0.07 * 2;
        const BokovayaStenka = (fanera2 + brusObshch1) * ColichestvoSten;
  
        // Торцевые стенки
        const fanera3 = plotnostFanery * ((height / 1000) + 0.018) * tolshchinaSten * (width / 1000);
        const brusObshch2 = plotnostDereva * ((height / 1000) - 0.17) * 0.03 * 0.07 * 2 +
                            plotnostDereva * ((width / 1000) - 0.06) * 0.03 * 0.07 * 2;
        const TorcevayaStenka = (fanera3 + brusObshch2) * ColichestvoSten;
  
        // Крышка
        const fanera4 = plotnostFanery * (length / 1000) * (width / 1000) * tolshchinaSten;
        const brusObshch3 = plotnostDereva * ((width / 1000) - 0.06) * 0.03 * 0.07 * 2 +
                            plotnostDereva * ((length / 1000) - 0.072) * 0.03 * 0.07 * 2;
        const Krushka = fanera4 + brusObshch3;
  
        // Общий результат
        const obshchiyResult = Dno + BokovayaStenka + TorcevayaStenka + Krushka;

      resultHTML = `
        <strong>Результат вычислений для ${selectedBox}:</strong>
        <p>Дно: <strong>${Dno.toFixed(0)}</strong> кг</p>
        <p>Боковые стенки: <strong>${BokovayaStenka.toFixed(0)}</strong> кг</p>
        <p>Торцевые стенки: <strong>${TorcevayaStenka.toFixed(0)}</strong> кг</p>
        <p>Крышка: <strong>${Krushka.toFixed(0)}</strong> кг</p>
        <p>Общий вес: <strong>${obshchiyResult.toFixed(0)}</strong> кг</p>`;
    } else if (selectedBox === "УТ56") {
      // Пример расчётов для УТ56
      const result = length + width + height;
      resultHTML = `<p>Результат для ${selectedBox}: <strong>${result.toFixed(0)}</strong></p>`;
    } else if (selectedBox === "УТ61") {
      // Пример расчётов для УТ61
      const result = length * width * height;
      resultHTML = `<p>Результат для ${selectedBox}: <strong>${result.toFixed(0)}</strong></p>`;
    }

    // Сохраняем результат для выбранного изделия
    results[selectedBox] = resultHTML;

    // Отображаем результат
    resultDiv.innerHTML = resultHTML;

    // Меняем цвет шагов: первый шаг становится неактивным, второй активным
    steps[0].style.backgroundColor = "#D3D3D3";
    steps[1].style.backgroundColor = "#5C4033";
  });

  // Логика для возврата на предыдущий шаг
  steps[0].addEventListener("click", function () {
    if (this.style.backgroundColor === "rgb(211, 211, 211)") {
      resultDiv.innerHTML = "";
      form.reset(); // Сбрасываем значения формы
      resetSteps(); // Возвращаем шаги в начальное состояние
    }
  });
});