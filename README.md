<b>С приложением можно ознакомиться по адресу: https://quotestats.netlify.app</b><br><br>

1.
Условие:<br>
необходимо создать веб-приложение, которое максимально быстро считает 
статистические параметры по котировкам с биржи. <br>
Для этого необходимо создать интерфейс который содержит кнопки “Старт” и “Статистика”. <br>
По нажатию на “Старт” должно происходить подключение к эмулятору котировок по адресу 
вебсокета wss://trade.trademux.net:8800/?password=1234 для получения котировок онлайн.<br> При 
нажатии на кнопку “Статистика” отображает на странице такие статистические значения: <br>
среднее,<br> стандартное отклонение,<br> моду (при мультимодности достаточно только одну моду), <br>
медиану,<br> количество потерянных котировок если такие есть,<br> время расчетов.<br> Расчеты должны 
осуществляться по всем полученным данным от момента старта до текущего момента нажатия 
кнопки “Статистика”, кнопку можно нажимать сколько угодно раз для получения новых 
результатов на текущее время.<br>
Формат “котировки” json, поля : {id : id_котировки, value : значение_котировки}<br>
Технические требования:<br>
• Приложение должно быть максимально оптимизировано по скорости работы.<br>
• Время между нажатием Старт и Статистика может быть очень большим (несколько 
дней)<br>
• Интерфейс должен быть удобен для использования.<br>
• Стиль кнопок должен быть:<br> бордер ровно 1пкс черный,<br> фон кнопки серый, <br>при 
наведении мыши на кнопку фон должен становится белым, <br>при клике на кнопку фон 
должен становится желтым <br>(использовать для этого только CSS / SCSS).
• Принятые числа отображать не нужно.<br>
Уровни сложности задания:<br>
junior уровень: посчитать только среднее и стандартное отклонение<br>
Более высокий уровень: посчитать также моду и медиану<br>
2.<br>
Условие:<br> Написать "пингователь" любого сервера на JavaScript, который покажет 
примерное время пинга до сервера указанного в поле ввода.<br>
Технические требования:<br>
• стиль кнопок должен быть:<br> бордер ровно 1пкс черный,<br> фон кнопки серый,<br> при 
наведении мыши на кнопку фон должен становится белым,<br> при клике на кнопку фон 
должен становится желтым<br> (использовать для этого только CSS / SCSS).<br>
• стиль полей ввода должен быть:<br> бордер ровно 1пкс черный, <br>фон белый,<br> при наведении 
мыши на поле ввода фон должен становится серым, <br>при клике на поле фон должен 
становится желтым <br>(использовать для этого только CSS / SCSS)<br>
Задания делать на ReactJS.
