document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".sidebar ul li a");
    const boxTypeDisplay = document.createElement("p");
    boxTypeDisplay.style.marginTop = "20px";
  
    const form = document.getElementById("boxCalculator");
    const resultDiv = document.getElementById("result");
    const steps = document.querySelectorAll(".step");
    let selectedBox = null; // Текущий выбранный тип изделия
  
    // Логика выбора типа изделия
    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        selectedBox = this.textContent; // Запоминаем выбранный тип
        boxTypeDisplay.textContent = `Вы выбрали тип изделия: ${selectedBox}`;
        document.querySelector(".sidebar").appendChild(boxTypeDisplay);
        resultDiv.innerHTML = ""; // Очищаем результат
      });
    });
  
    // Логика обработки формы
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Получаем значения из input
      const length = parseFloat(document.getElementById("length").value) || 0;
      const width = parseFloat(document.getElementById("width").value) || 0;
      const height = parseFloat(document.getElementById("height").value) || 0;
  
      if (!length || !width || !height) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }
  
      // Очищаем только контейнер с результатами
      resultDiv.innerHTML = "";
  
      // Вычисляем результат в зависимости от типа изделия
      // У24
      const plotnostFanery = 650;
      const plotnostDereva = 540;
      const O6 = 0.018;
      const ColichestvoBrusa = 6;
      const ColichestvoSten = 2;
      const tolshchinaSten = 0.009;
      // Дно ящика
      const fanera1 = plotnostFanery*(length/1000)*(width/1000)*O6*1;
      const doska1 = 0;
      const brus1 = plotnostDereva*1*0.1*0.1*ColichestvoBrusa;
      const Dno = fanera1 + doska1 + brus1;
      // Стенка Боковая
      const fanera2 = plotnostFanery*((height/1000)+0.118)*(length/1000)*tolshchinaSten*1;
      const brus2 = plotnostDereva*((height/1000)-0.17)*0.03*0.07*2;
      const brus3 = plotnostDereva*(length/1000)*0.03*0.07*2;
      const brusObshch1 = brus2 + brus3;
      const obshchee1 = fanera2 + brusObshch1;
      const BokovayaStenka = obshchee1 * ColichestvoSten;
      // Стенка Торцевая
      const fanera3 = plotnostFanery*((height/1000)+0.018)*tolshchinaSten*(width/1000)*1;
      const brus4 = plotnostDereva*((height/1000)-0.17)*0.03*0.07*2;
      const brus5 = plotnostDereva*((width/1000)-0.06)*0.03*0.07*2;
      const brusObshch2 = brus4 + brus5;
      const obshchee2 = fanera3 + brusObshch2;
      const TorcevayaStenka = obshchee2 * ColichestvoSten;
      // Крышка
      const fanera4 = plotnostFanery*(length/1000)*(width/1000)*tolshchinaSten*1;
      const brus6 = plotnostDereva*((width/1000)-0.06)*0.03*0.07*2;
      const brus7 = plotnostDereva*((length/1000)-0.072)*0.03*0.07*2;
      const brusObshch3 = brus6 + brus7;
      const Krushka = fanera4 + brusObshch3;
      const otvet = Dno + BokovayaStenka + TorcevayaStenka + Krushka;
      //
      let result = 0;
      if (selectedBox === "У32") {
        result = (otvet); // логика всей программы
      } else if (selectedBox === "УТ56") {
        result = length - width - height; // Вычитание
      } else if (selectedBox === "УТ61") {
        result = length - width - height; // Вычитание
      } else {
        alert("Выберите тип изделия!");
        return;
      }
  
      // Показываем результат
      resultDiv.innerHTML = `<strong>Результат вычислений для ${selectedBox}:</strong>
      Крышка ящика: <strong>${Krushka.toFixed(0)}</strong>;
      Дно ящика: <strong>${Dno.toFixed(0)}</strong>;
      Боковая стенка ящика: <strong>${BokovayaStenka.toFixed(0)}</strong>;
      Торцевая стенка ящика: <strong>${TorcevayaStenka.toFixed(0)}</strong>;
      Общий результат: <strong>${result.toFixed(0)}</strong>;`;
  
      // Меняем цвет шагов: первый шаг становится неактивным, второй активным
      steps[0].style.backgroundColor = "#D3D3D3";
      steps[1].style.backgroundColor = "#5C4033";
    });
  
    // Логика для возврата на предыдущий шаг
    steps[0].addEventListener("click", function () {
      if (this.style.backgroundColor === "rgb(211, 211, 211)") {
        // Очистить результаты и вернуть форму
        resultDiv.innerHTML = "";
        form.reset(); // Сбрасываем значения формы
  
        // Меняем цвета шагов
        steps[0].style.backgroundColor = "#5C4033";
        steps[1].style.backgroundColor = "#D3D3D3";
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