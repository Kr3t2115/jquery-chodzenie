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

  //generowanie całej mapy
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 10; j++) {
      let czyPszeszkoda = false;

      $.each(tablicaPszeszkod, function (index, pszeszkoda) {
        if (pszeszkoda.x == j && pszeszkoda.y == i) {
          czyPszeszkoda = true;
        }
      });

      $(".mapa").append(
        `<div data-x="${j}" data-y="${i}" ${
          czyPszeszkoda ? 'data-pszeszkoda="true"' : ""
        } class="kratkaMapy ${czyPszeszkoda ? "pszeszkoda" : ""}"></div>`
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
      obecnaPozycja = {
        x: $(".kropka").parent().data("x") + uzywaneKlucz[e.keyCode].x,
        y: $(".kropka").parent().data("y") + uzywaneKlucz[e.keyCode].y,
      };

      $(".kratkaMapy").each(function (index, element) {
        if (
          $(element).data("x") == obecnaPozycja.x &&
          $(element).data("y") == obecnaPozycja.y &&
          $(element).data("pszeszkoda") != true
        ) {
          $(".kratkaMapy").empty();
          $(element).append(`<div class="kropka"></div>`);
        }
      });
    } else {
      $(".blad").text("Nie możesz użyć tego przycisku");
    }
  });
});
