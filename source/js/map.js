document.addEventListener("DOMContentLoaded", function(event) {
    ymaps.ready(init); // активируем карту после загрузки страницы
    var map;
    function init() {
        map = new ymaps.Map("map", { // в кавычках id элемента куда загружается карта
            center: [59.938631, 30.323055],
          // координаты центра фрагмента карты, подобрать можно на https://vk.cc/9n163G
            zoom: 12,
            controls: []
        });
        var placemark = new ymaps.Placemark([59.938631, 30.323055], {}, { // координаты метки
            iconLayout: "default#image",
            iconImageHref: "../img/icon-map-marker.svg", // иконка метки
            iconImageSize: [52, 52] // размер метки
        });
        map.geoObjects.add(placemark);
    }
});
