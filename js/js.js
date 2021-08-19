$(document).ready(function() {
  headersControl();
  landing();
  smoothScroll();
  if ($(".sticky").length > 0) {
    sticky();
  }
});

/************CONTROLES DE CABECERAS CON SCROLLS********************************/
// Hide header on scroll down, elemento fixed y medidas del hero en carrera / header fixed carrera
function headersControl() {
  let didScroll = true;
  let lastScrollTop;
  let navbarBlogDistance;
  let header;
  const delta = 5;
  const navbarHeight = $("header#site-header.closed").outerHeight();
  if ($("#blog-menu").length > 0) {
    navbarBlogDistance =
      $("#blog-menu").offset().top - $("#blog-menu").outerHeight();
  }
  if (typeof $("#career-nav").offset() !== "undefined") {
    var navbarCareerHeight =
      $("#career-nav").offset().top - $("#career-nav").outerHeight() - 50;
  }
  let restHeight = $(window).height() - navbarHeight;
  const thisIsfixedHeight = $(".this-is-fixed").outerHeight() - 50;
  let thisIsfixedWidth;
  //Mido que se haya hecho scroll
  $(window).scroll(function(event) {
    didScroll = true;
  });
  $(window).resize(function(event) {
    didScroll = true;
  });
  //activo la función si se hace scroll con delay
  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  //Método para controlar scroll
  function hasScrolled() {
    let st = $(window).scrollTop();
    header = document.getElementById("site-header");
    $("#blog-menu").css("top", header.offsetHeight + "px");
    if (st > navbarHeight) {
      $("header#site-header.closed")
        .addClass("small")
        .addClass("white");
      $(window).scrollTop();
    } else if (st < navbarHeight) {
      $("header#site-header.closed")
        .removeClass("small")
        .removeClass("nav-up");
      $(".home header#site-header.closed")
        .removeClass("small")
        .removeClass("white");
      $("header#site-header.transparent")
        .removeClass("small")
        .removeClass("white");
      $(window).scrollTop();
    }
    $("header#site-header.origin-white.opened").removeClass("white");
    $("header#site-header.origin-white.closed").addClass("white");

    // Make scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $("header#site-header.closed:not(.nav-down-fixed)")
        .removeClass("nav-up")
        .addClass("nav-down");
      // .removeClass('white')
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("header#site-header.closed")
          .removeClass("nav-down")
          .addClass("nav-up");
      }
    }
    //Para elementos fixed:
    if (st > thisIsfixedHeight) {
      thisIsfixedWidth = $(".this-is-fixed").outerWidth();
      $(".this-is-fixed")
        .addClass("is-fixed")
        .css("width", thisIsfixedWidth + "px");
    } else {
      $(".this-is-fixed")
        .removeClass("is-fixed")
        .css("width", "auto");
    }

    //Cabecera de la carrera
    if (typeof $("#career-nav").offset() !== "undefined") {
      if (st > navbarCareerHeight) {
        $("#career-nav").addClass("fixed");
      } else {
        $("#career-nav").removeClass("fixed");
      }
      // If scrolled down and past the navbar, add class .nav-up.
      if (st > lastScrollTop && st > navbarCareerHeight) {
        // Scroll Down
        $("#career-nav").removeClass("nav-up");
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $("#career-nav").addClass("nav-up");
        }
      }
    }
    lastScrollTop = st;
  }
}

/*smooth_scroll*/
const smoothScroll = () => {
  $(".smooth-scroll").click(function(event) {
    // On-page links
    // Figure out element to scroll to
    const target = $(this).attr("data-href");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      const pointToScroll = $(target).offset().top - $("#site-header").height();
      $("html, body").animate(
        {
          scrollTop: pointToScroll
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          let $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  });
};

//Método para posicionar el box fixed
let marginTop;
if ($("#fixed-outer-container").length > 0) {
  marginTop = $("#fixed-outer-container").offset().top;
}
function landing() {
  if ($("#fixed-outer-container").length > 0) {
    const headerHeight = $("#site-header").height(); //Alto del header
    if ($(window).outerWidth() > 1023) {
      const marginRight =
        $(window).width() -
        ($("#hero-landing .container").offset().left +
          $("#hero-landing .container").outerWidth()) +
        12; //Esto es el margen a la derecha del form
      const boxWidth = $("#fixed-outer-container").outerWidth() - 24; //Ancho de la caja del form
      const boxHeight = $("#hero-form").outerHeight() + 48; //Alto del form
      const fixtoAbsolute =
        $("#controller-scroll-out").offset().top - $(window).height() + 48; //Momento ne el que pasa a absolute
      const buttonToFixed = $("#controller-scroll-out").offset().top; //Alto en el que el boton pasa a fixed
      const paddingTop =
        $(window).outerWidth() > 1280
          ? 144 + headerHeight + "px"
          : 72 + headerHeight + "px"; //Padding arriba
      //Controlamos el boton fixed cuando hacemos scroll
      if (window.scrollY > buttonToFixed - headerHeight + 20) {
        $(".landing-counters .btn-container").addClass("fixed");
      } else {
        $(".landing-counters .btn-container").removeClass("fixed");
      }
      //Controlamos el form para que se quede fixed
      if (
        window.scrollY + window.innerHeight - 260 >
        $("#controller-scroll-out").offset().top
      ) {
        $("#hero-form")
          .css("position", "absolute")
          .css("right", "12px")
          .css("top", "auto")
          .css("bottom", 0);
      } else {
        //sino es fixed hasta que baje
        $("#hero-form")
          .css("position", "fixed")
          .css("right", marginRight + "px")
          .css("top", marginTop + "px")
          .css("bottom", "auto");
      }
      //Width del form
      $("#hero-form").css("width", boxWidth + "px");
    } else {
      //Esto es cuando es mobile
      const buttonToFixed = $("#controller-scroll").offset().top; //Alto en el que el boton pasa a fixed
      $("#hero-form")
        .css("width", "auto")
        .css("position", "initial");
      $("#controller-scroll").css("min-height", "auto");
      //Controlamos el boton fixed cuando hacemos scroll
      if (window.scrollY > buttonToFixed - headerHeight + 20) {
        $(".landing-counters .btn-container").addClass("fixed");
      } else {
        $(".landing-counters .btn-container").removeClass("fixed");
      }
    }
  }
}
window.addEventListener("resize", landing);
window.addEventListener("scroll", landing);

//Método para sticky en Becas u en otro contenedor sticky
function sticky() {
  const headerHeight = $("#site-header").outerHeight(); //Alto del header
  const topStickyMargin = headerHeight + 40;
  $(".sticky")
    .css("top", topStickyMargin + "px")
    .parents()
    .css("overflow", "visible");
}
