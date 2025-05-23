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
      selectedBox = this.innerHTML.trim();
      boxTypeDisplay.innerHTML = `Вы выбрали тип изделия: ${selectedBox}`;
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
      if (selectedBox === "Ящик У32") {
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
        const DveFaneriBok = fanera2*2;
        const brusObshch1 = plotnostDereva * ((height / 1000) - 0.17) * 0.03 * 0.07 * 2 +
                            plotnostDereva * (length / 1000) * 0.03 * 0.07 * 2;
        const BokovayaStenka = (fanera2 + brusObshch1) * ColichestvoSten;
  
        // Торцевые стенки
        const fanera3 = plotnostFanery * ((height / 1000) + 0.018) * tolshchinaSten * (width / 1000);
        const DveFaneriTorec = fanera3*2;
        const brusObshch2 = plotnostDereva * ((height / 1000) - 0.17) * 0.03 * 0.07 * 2 +
                            plotnostDereva * ((width / 1000) - 0.06) * 0.03 * 0.07 * 2;
        const TorcevayaStenka = (fanera3 + brusObshch2) * ColichestvoSten;
  
        // Крышка
        const fanera4 = plotnostFanery * (length / 1000) * (width / 1000) * tolshchinaSten;
        const brusObshch3 = plotnostDereva * ((width / 1000) - 0.06) * 0.03 * 0.07 * 2 +
                            plotnostDereva * ((length / 1000) - 0.072) * 0.03 * 0.07 * 2;
        const Krushka = fanera4 + brusObshch3;
        // Шуруп 35
        const bok2sht = (((((length-78)/100)-1)*2)+((((height+127)-288)/100)*2))*2;
        const tor2sht = ((((width)/100)*2)+(((height-170)/100)*2))*2;
        const krush = ((((width-158)/100)*2)+(((height-18)/100)*2))*2;
        // Шуруп 55
        const bok2sht55 = (((length/100)*2)+((height/100)*2))*2;
        const tor2sht55 = (((width/100)*2)+((height/100)*2))*2;
        const krush55 = ((((width-158)/100)*2)+(((height-18)/100)*2))*2;
        // Гвозди
        const gvozd = 18;
  
        // Общий результат
        const obshchiyResult = Dno + BokovayaStenka + TorcevayaStenka + Krushka;
        // Расчёты для Брус 100x100 м3
        const brus100x100 = (brus1/plotnostDereva);
        // Расчёты для Брус 30x70 м3
        const brus30x70 = (brusObshch1+brusObshch2+brusObshch3)/plotnostDereva;
        // Расчёты для ОСБ м3 S=9 и преобразование в м2
        const osbThicknessS9 = 0.009; // толщина осб
        const osbS9Area = (DveFaneriBok + DveFaneriTorec + fanera4) / (plotnostFanery * osbThicknessS9);
        // Расчёты для ОСБ м3 S=18
        const osbThicknessS18 = 0.018; // thickness in meters
        const osbS18Area = fanera1 / (plotnostFanery * osbThicknessS18);
        // Расчёты для Бумага БУБ
        const bumaga = ((((length*width)*2)/1000)+(((length*height)*2)/1000)+(((width*height)*2)/1000))/1000;
        // Расчёты для Шурупа 3.5, 35шт
        const shurup35 = bok2sht + tor2sht + krush;
        // Расчёты для Шурупа 4, 55шт
        const shurup55 = bok2sht55 + tor2sht55 + krush55;
        // Расчёты для Гвоздей 5, 150шт
        const Gvozdi = gvozd;

      resultHTML = `
        <strong>Результат вычислений для ${selectedBox}:</strong>
        <p>Брус 100x100: <strong>${brus100x100.toFixed(4)}</strong> м<sup>3</sup></p>
        <p>Брус 30x70: <strong>${brus30x70.toFixed(4)}</strong> м<sup>3</sup></p>
        <p>OSB-4 S=9: <strong>${osbS9Area.toFixed(4)}</strong> м<sup>2</sup></p>
        <p>OSB-4 S=18: <strong>${osbS18Area.toFixed(4)}</strong> м<sup>2</sup></p>
        <p>Общий вес: <strong>${obshchiyResult.toFixed(0)}</strong> кг</p>
        <p>Бумага БУБ: <strong>${bumaga.toFixed(4)}</strong> м<sup>2</sup></p>
        <p>Шуруп 3,5х35: <strong>${shurup35.toFixed(0)}</strong> шт</p>
        <p>Шуруп 4х55: <strong>${shurup55.toFixed(0)}</strong> шт</p>
        <p>Гвоздь 5х150: <strong>${Gvozdi.toFixed(0)}</strong> шт</p>`;
        
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

//serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/boxSite/sw.js').then((registration) => {
      console.log('Service Worker зарегистрирован с областью:', registration.scope);
    }).catch((error) => {
      console.log('Ошибка регистрации Service Worker:', error);
    });
  });
}