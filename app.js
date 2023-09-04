$(function () {
  // wszystkie pszeszkody
  let tablicaPszeszkod = [
    {
      x: 9,
      y: 0,
    },
    {
      x: 8,
      y: 0,
    },
    {
      x: 9,
      y: 1,
    },
    {
      x: 8,
      y: 1,
    },
  ];

  let tablicaPunktow = [
    {
      x: 2,
      y: 0,
      czyZebrane: false,
    },
    {
      x: 4,
      y: 2,
      czyZebrane: false,
    },
  ];

  let iloscPunktow = 0;

  //generowanie całej mapy
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 10; j++) {
      let czyPszeszkoda = false;
      let czyPunkt = false;

      $.each(tablicaPszeszkod, function (index, pszeszkoda) {
        if (pszeszkoda.x == j && pszeszkoda.y == i) {
          czyPszeszkoda = true;
        }
      });

      $.each(tablicaPunktow, function (index, punkt) {
        if (punkt.x == j && punkt.y == i) {
          czyPunkt = true;
        }
      });

      $(".mapa").append(
        `<div data-x="${j}" data-y="${i}" ${
          czyPszeszkoda ? 'data-pszeszkoda="true"' : ""
        } 
        ${czyPunkt ? 'data-punkt="true"' : ""} 
        class="kratkaMapy ${czyPszeszkoda ? "pszeszkoda" : ""} ${
          czyPunkt ? "punkt" : ""
        }"></div>`
      );
    }
  }

  // ustawienie pozycji startowej kropki
  $(".kratkaMapy").each(function (index, element) {
    if ($(element).data("x") == 0 && $(element).data("y") == 0) {
      $(element).append(`<div class="kropka"></div>`);
    }
  });

  // bindowanie przycisków wsad do chodzenia
  $("body").bind("keypress", function (e) {
    $(".blad").text("");
    let obecnaPozycja = {};

    let uzywaneKlucz = {
      //wsad
      119: {
        y: -1,
        x: 0,
      },
      115: {
        y: 1,
        x: 0,
      },
      100: {
        y: 0,
        x: 1,
      },
      97: {
        y: 0,
        x: -1,
      },
    };

    if (e.keyCode in uzywaneKlucz) {
      nowaPozycja = {
        x: $(".kropka").parent().data("x") + uzywaneKlucz[e.keyCode].x,
        y: $(".kropka").parent().data("y") + uzywaneKlucz[e.keyCode].y,
      };

      $(".kratkaMapy").each(function (index, element) {
        if (
          $(element).data("x") == nowaPozycja.x &&
          $(element).data("y") == nowaPozycja.y &&
          $(element).data("pszeszkoda") != true
        ) {
          $.each(tablicaPunktow, function (index, punkt) {
            if (
              punkt.x == nowaPozycja.x &&
              punkt.y == nowaPozycja.y &&
              punkt.czyZebrane == false
            ) {
              iloscPunktow++;
              punkt.czyZebrane = true;
              $(".punkty").text("Liczba punktów: " + iloscPunktow);
              $(element).removeClass("punkt");
            }
          });

          $(".kratkaMapy").empty();
          $(element).append(`<div class="kropka"></div>`);
        } else if (
          $(element).data("x") == nowaPozycja.x &&
          $(element).data("y") == nowaPozycja.y &&
          $(element).data("pszeszkoda") == true
        ) {
          $(".blad").text("Tam jest zabronione pole");
        } else if (
          nowaPozycja.x < 0 ||
          nowaPozycja.y < 0 ||
          nowaPozycja.x > 9 ||
          nowaPozycja.y > 7
        ) {
          $(".blad").text("Gdzie ty chcesz poza mape iść :)");
        }
      });
    } else {
      $(".blad").text("Nie możesz użyć tego przycisku");
    }
  });
});
