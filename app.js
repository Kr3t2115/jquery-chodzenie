$(function () {
  // wszystkie pszeszkody

  let polaSpecjalne = {
    9: {
      0: "pszeszkoda",
      1: "pszeszkoda",
    },
    8: {
      0: "pszeszkoda",
      1: "pszeszkoda",
    },
    2: {
      0: "punkt",
    },
    4: {
      2: "punkt",
    },
  };

  let iloscPunktow = 0;

  //generowanie całej mapy
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 10; j++) {
      let czyPszeszkoda = false;
      let czyPunkt = false;

      if (polaSpecjalne[j] !== undefined && polaSpecjalne[j][i] !== undefined) {
        if (polaSpecjalne[j][i] == "pszeszkoda") {
          czyPszeszkoda = true;
        }
        if (polaSpecjalne[j][i] == "punkt") {
          czyPunkt = true;
        }
      }

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

  function czyWychodziPozaMape(x, y) {
    return x < 0 || y < 0 || x > 9 || y > 7;
  }

  // ustawienie pozycji startowej kropki

  $('.kratkaMapy[data-x="0"][data-y="0"]').append(`<div class="kropka"></div>`);

  // bindowanie przycisków wsad do chodzenia
  $("body").on("keydown", function (e) {
    $(".blad").text("");
    let uzywaneKlucz = {
      //wsad
      87: {
        y: -1,
        x: 0,
      },
      83: {
        y: 1,
        x: 0,
      },
      68: {
        y: 0,
        x: 1,
      },
      65: {
        y: 0,
        x: -1,
      },
      //strzalki
      38: {
        y: -1,
        x: 0,
      },
      40: {
        y: 1,
        x: 0,
      },
      39: {
        y: 0,
        x: 1,
      },
      37: {
        y: 0,
        x: -1,
      },
    };

    if (e.keyCode in uzywaneKlucz) {
      let nowaPozycja = {
        x: $(".kropka").parent().data("x") + uzywaneKlucz[e.keyCode].x,
        y: $(".kropka").parent().data("y") + uzywaneKlucz[e.keyCode].y,
      };

      let element = $(
        `.kratkaMapy[data-x="${nowaPozycja.x}"][data-y="${nowaPozycja.y}"]`
      );
      if (
        element.data("pszeszkoda") != true &&
        !czyWychodziPozaMape(nowaPozycja.x, nowaPozycja.y)
      ) {
        if (
          polaSpecjalne[$(element).data("x")] !== undefined &&
          polaSpecjalne[$(element).data("x")][$(element).data("y")] !==
            undefined &&
          polaSpecjalne[$(element).data("x")][$(element).data("y")] == "punkt"
        ) {
          iloscPunktow++;
          delete polaSpecjalne[$(element).data("x")][$(element).data("y")];
          $(".punkty").text("Liczba punktów: " + iloscPunktow);
          $(element).removeClass("punkt");
        }

        $(".kratkaMapy").empty();
        $(element).append(`<div class="kropka"></div>`);
      } else if ($(element).data("pszeszkoda") == true) {
        $(".blad").text("Tam jest zabronione pole");
      } else if (czyWychodziPozaMape(nowaPozycja.x, nowaPozycja.y)) {
        $(".blad").text("Gdzie ty chcesz poza mape iść :)");
      }
    } else {
      $(".blad").text("Nie możesz użyć tego przycisku");
    }
  });
});
