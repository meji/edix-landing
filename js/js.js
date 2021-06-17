$(document).ready(function() {
  headersControl()
  sliders()
  loadTeachers()
  loadTeachersOld()
  loadOpinion()
  hoverCareers()
  careerNavNavigation()
  utilUiMethods()
  landing()
  showInfoBtn()
  blogThemesNavigation()
  if ($('#glosary-search-box').length > 0) {
    glosarioNav()
  }

  if ($('.sticky').length > 0) {
    sticky()
  }
  if ($('.minus').length > 0) {
    paddingHero()
  }
})

/************CONTROLES DE CABECERAS CON SCROLLS********************************/
// Hide header on scroll down, elemento fixed y medidas del hero en carrera / header fixed carrera
function headersControl() {
  let didScroll = true
  let lastScrollTop
  let navbarBlogDistance
  let header
  const delta = 5
  const navbarHeight = $('header#site-header.closed').outerHeight()
  if ($('#blog-menu').length > 0) {
    navbarBlogDistance = $('#blog-menu').offset().top - $('#blog-menu').outerHeight()
  }
  if (typeof $('#career-nav').offset() !== 'undefined') {
    var navbarCareerHeight = $('#career-nav').offset().top - $('#career-nav').outerHeight() - 50
  }
  let restHeight = $(window).height() - navbarHeight
  const thisIsfixedHeight = $('.this-is-fixed').outerHeight() - 50
  let thisIsfixedWidth
  //Mido que se haya hecho scroll
  $(window).scroll(function(event) {
    didScroll = true
  })
  $(window).resize(function(event) {
    didScroll = true
  })
  //activo la función si se hace scroll con delay
  setInterval(function() {
    if (didScroll) {
      hasScrolled()
      didScroll = false
    }
  }, 250)

  //Método para controlar scroll
  function hasScrolled() {
    let st = $(window).scrollTop()
    header = document.getElementById('site-header')
    $('#blog-menu').css('top', header.offsetHeight + 'px')
    if (st > navbarHeight) {
      $('header#site-header.closed')
        .addClass('small')
        .addClass('white')
      $(window).scrollTop()
    } else if (st < navbarHeight) {
      $('header#site-header.closed')
        .removeClass('small')
        .removeClass('nav-up')
      $('.home header#site-header.closed')
        .removeClass('small')
        .removeClass('white')
      $('header#site-header.transparent')
        .removeClass('small')
        .removeClass('white')
      $(window).scrollTop()
    }
    $('header#site-header.origin-white.opened').removeClass('white')
    $('header#site-header.origin-white.closed').addClass('white')

    // Make scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return

    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('header#site-header.closed:not(.nav-down-fixed)')
        .removeClass('nav-up')
        .addClass('nav-down')
      // .removeClass('white')
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('header#site-header.closed')
          .removeClass('nav-down')
          .addClass('nav-up')
      }
    }
    //Para elementos fixed:
    if (st > thisIsfixedHeight) {
      thisIsfixedWidth = $('.this-is-fixed').outerWidth()
      $('.this-is-fixed')
        .addClass('is-fixed')
        .css('width', thisIsfixedWidth + 'px')
    } else {
      $('.this-is-fixed')
        .removeClass('is-fixed')
        .css('width', 'auto')
    }

    //Cabecera de la carrera
    if (typeof $('#career-nav').offset() !== 'undefined') {
      if (st > navbarCareerHeight) {
        $('#career-nav').addClass('fixed')
      } else {
        $('#career-nav').removeClass('fixed')
      }
      // If scrolled down and past the navbar, add class .nav-up.
      if (st > lastScrollTop && st > navbarCareerHeight) {
        // Scroll Down
        $('#career-nav').removeClass('nav-up')
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('#career-nav').addClass('nav-up')
        }
      }
    }

    //Cabecera de blog
    if (typeof $('#blog-menu').offset() !== 'undefined') {
      if (st > navbarBlogDistance) {
        $('#blog-menu').addClass('fixed')
        header.style.boxShadow = 'none'
        // If scrolled down and past the navbar, add class .nav-up.
        if (st > lastScrollTop) {
          $('#blog-menu').removeClass('nav-up')
          $('#site-header').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.15)')
        } else if (st < lastScrollTop) {
          $('#blog-menu')
            .addClass('nav-up')
            .css('top', header.offsetHeight + 'px')
          header.style.boxShadow = 'none'
        }
      } else {
        $('#blog-menu')
          .removeClass('fixed')
          .removeClass('nav-up')
      }
      if (window.scrollY == 0) {
        $('#blog-menu')
          .removeClass('fixed')
          .removeClass('nav-up')
      }
    }

    lastScrollTop = st
  }
}

//Navegación de carreras
function careerNavNavigation() {
  /*Navegación de cabecera de Carrera*/
  // Cache selectors
  let lastId
  const topMenu = $('#career-nav ul')
  const topMenuHeight = topMenu.outerHeight() + 15
  // All list items
  let menuItems = topMenu.find('span.smooths-scroll')
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    const item = $($(this).attr('data-href'))
    if (item.length) {
      return item
    }
  })
  //Smooth scroll
  menuItems.click(function(e) {
    const href = $(this).attr('data-href'),
      offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: offsetTop
        },
        1500
      )
    e.preventDefault()
  })
  // Bind to scroll
  $(window).scroll(function() {
    // Get container scroll position
    const fromTop = $(this).scrollTop() + topMenuHeight

    // Get id of current scroll item
    let cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop) return this
    })
    // Get the id of the current element
    cur = cur[cur.length - 1]
    const id = cur && cur.length ? cur[0].id : ''

    if (lastId !== id) {
      lastId = id
      // Set/remove active class
      menuItems
        .parent()
        .removeClass('active')
        .end()
        .filter("[data-href='#" + id + "']")
        .parent()
        .addClass('active')
    }
  })
  /********************************************/
  //Control de click menu carrera mobile
  $('#career-nav ul').on({
    click: function() {
      $(this)
        .parent()
        .parent()
        .toggleClass('opened')
    }
  })
}

//SLIDERS funciones vistas responsive
function sliders() {
  let viewportWidth = $(window).width()
  const swiper_alone_testimonial = new Swiper('.swiper-container.swiper-alone-testimonial', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination-alone-testimonial',
      clickable: true
    }
  })
  //Sliders de 1
  if (viewportWidth <= 468) {
    $('.swiper-container.swiper-alone').css('margin', '0 -10% 0 0')
  }
  const swiper_alone = new Swiper('.swiper-container.swiper-alone', {
    slidesPerView: 1,
    loop: false,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next-alone',
      prevEl: '.swiper-button-prev-alone'
    },
    breakpoints: {
      468: {
        slidesPerView: 1.1
      }
    }
  })
  //Slider de 4 - 3 - 2 - 1
  const swiper = new Swiper('.swiper-container.swiper4321', {
    slidesPerView: 4,
    speed: 1000,
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next-4',
      prevEl: '.swiper-button-prev-4'
    },
    allowTouchMove: true,
    preventClicks: false,
    breakpoints: {
      1700: {
        slidesPerView: 3,
        loop: true
      },
      1024: {
        slidesPerView: 2,
        loop: true
      },
      468: {
        slidesPerView: 1.1,
        loop: true
      }
    }
  })
  //Anulamos el autoplay en el hover
  $('.swiper-container.swiper4321').hover(
    function() {
      swiper.autoplay.stop()
    },
    function() {
      swiper.autoplay.start()
    }
  )
  //Slider de  - 3 - 2 - 1
  const swiper321 = new Swiper('.swiper321', {
    slidesPerView: 3.0,
    speed: 1000,
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next-3',
      prevEl: '.swiper-button-prev-3'
    },
    allowTouchMove: true,
    preventClicks: false,
    breakpoints: {
      1024: {
        slidesPerView: 2,
        loop: true
      },
      767: {
        slidesPerView: 1.5,
        loop: true
      },
      468: {
        slidesPerView: 1.1,
        loop: true
      }
    }
  })
  //Swipper letters
  const swiperLetters = new Swiper('.swiper-container.swiper-letters', {
    slidesPerView: 10,
    slidesPerGroup: 3,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    spaceBetween: 20,
    allowTouchMove: true,
    preventClicks: true,
    navigation: {
      nextEl: '.swiper-button-next-5',
      prevEl: '.swiper-button-prev-5'
    },
    breakpoints: {
      1600: {
        slidesPerView: 8,
        slidesPerGroup: 3,
        loop: true
      },
      1024: {
        slidesPerView: 6,
        slidesPerGroup: 2,
        loop: true
      },
      468: {
        slidesPerView: 5,
        slidesPerGroup: 1,
        loop: true
      },
      350: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        loop: true
      }
    }
  })
  $('.swiper-container.swiper-letters').hover(
    function() {
      swiper.autoplay.stop()
    },
    function() {
      swiper.autoplay.start()
    }
  )
}

//hoverCareers
function hoverCareers() {
  let supportsTouch =
    'ontouchstart' in document.documentElement || navigator.msMaxTouchPoints ? true : false
  //Expandimos el click al div
  $('.career-card.icon-left:not(.plain), .career-card-new:not(.modal-link)').click(function() {
    window.location = $(this)
      .find('a')
      .attr('href')
    return false
  })
  if (supportsTouch == false) {
    $('.career-card.icon-left:not(.plain), .career-card-new').on('mouseenter', function(event) {
      var card = $(this) // Button that triggered the modal
      var image_src = $(card)
        .find('img')
        .attr('src')
      var image_src_without_extension = image_src.split('.svg').shift()
      card.find('img').attr('src', image_src_without_extension + '-on.svg')
      card.addClass('hover')
    })
    //Quitamos el hover
    $('.career-card.icon-left:not(.plain), .career-card-new').on('mouseleave', function(event) {
      var card = $(this) // Button that triggered the modal
      var image_src = $(card)
        .find('img')
        .attr('src')
      var image_src_without_extension = image_src.split('-on').shift()
      card.find('img').attr('src', image_src_without_extension + '.svg')
      card.removeClass('hover')
    })
  }
}

//Método para cargar profes
function loadTeachers() {
  $('#modal-profe').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    // let image_src = $(button)
    //   .find('img')
    //   .attr('src')
    let image = $(button).data('src')
    let job = button.data('job') // Extract info from data-* attributes
    let name = button.data('name')
    let content = button.data('content')
    let linkedin = button.data('linkedin')
    let modal = $(this)
    modal.find('.image').attr('src', image)
    modal.find('.image').attr('alt', name)
    modal.find('.image').attr('title', name)
    modal.find('.linkedin').attr('href', linkedin)
    modal.find('.job').html(job)
    modal.find('.name').html(name)
    modal.find('.text').html(content)
    if (linkedin.length <= 0) {
      modal.find('.linkedin').hide()
    } else {
      modal.find('.linkedin').show()
    }
  })
}
//Método para cargar profes
function loadTeachersOld() {
  $('#modal-profe.old').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    let image_src = $(button)
      .find('img')
      .attr('src')
    let image_mobile = $(button).data('src_mobile')
    let job = button.data('job') // Extract info from data-* attributes
    let name = button.data('name')
    let content = button.data('content')
    let linkedin = button.data('linkedin')
    let modal = $(this)
    modal.find('.image').attr('src', image_src)
    modal.find('.image').attr('alt', name)
    modal.find('.image').attr('title', name)
    modal.find('.linkedin').attr('href', linkedin)
    modal.find('.image-container source').attr('srcset', image_mobile)
    modal.find('.job').html(job)
    modal.find('.name').html(name)
    modal.find('.text').html(content)
    if (linkedin.length <= 0) {
      modal.find('.linkedin').hide()
    } else {
      modal.find('.linkedin').show()
    }
  })
}

function loadOpinion() {
  $('#modal-opinion').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget)
    let job = button.data('job')
    let name = button.data('name')
    let content = button.data('content')
    let modal = $(this)
    modal.find('.job').html(job)
    modal.find('.name').html(name)
    modal.find('.text').html(content)
  })
}

//Métodos utilidades, como link fake, smooth scroll, enable button input, y otros efectos
function utilUiMethods() {
  //False links
  $('.shoot-link-blank').click(function() {
    let pageurl = this.dataset.href
    window.open(
      pageurl,
      '_blank' // <- This is what makes it open in a new window.
    )
  })
  $('.shoot-link').click(function() {
    location.href = this.dataset.href
  })
  //Quitamos contenedores dechecks de cf7
  $('.wpcf7-form input[type="checkbox"]')
    .unwrap()
    .unwrap()
    .unwrap()

  //Ponemos en enable el botón
  $('#legal').on('click', function() {
    $(this)
      .closest('form')
      .find('.wpcf7-submit.btn')
      .attr('disabled', !this.checked)
  })

  //clase para hacerlo en varios
  $('.legal-check').on('click', function() {
    $(this)
      .closest('form')
      .find('.wpcf7-submit.btn')
      .attr('disabled', !this.checked)
  })

  //Mostramos caja legal
  $('.display-legal-text').click(function() {
    $('.legal-text')
      .fadeIn()
      .css('visibility', 'visible')
  })

  //Expandimos el click al div en post
  $('.post-module, .blog-module').click(function() {
    window.location = $(this)
      .find('a')
      .attr('href')
    return false
  })

  /********************************************/
  //WOW
  $(
    'section div:not(.data-container):not(.data-container div):not(#career-nav):not(form div):not(.landing-counters):not(.landing-counters div):not(.form-landing-container div):not(.faq-body):not(.no-animation):not(.blog-menu-container):not(#blog-menu)'
  ).addClass('wow fadeInUp')
  const wow = new WOW({
    mobile: false
  })
  wow.init()

  //Replace  SVG images with inline SVG
  $(
    '#footer .social img[src$=".svg"],img.letter, .career-card.icon-left.plain .icon-container img, .modal button img, .modal .linkedin img, #site-header .buttons img, img.svg-hover, .opinion .shoot-link-blank img, .opinion.autolinkable .rss img'
  ).each(function() {
    const $img = $(this)
    const imgID = $img.attr('id')
    const imgClass = $img.attr('class')
    const imgURL = $img.attr('src')
    const imgAlt = $img.attr('alt')
    const imgTitle = $img.attr('title')

    jQuery.get(
      imgURL,
      function(data) {
        // Get the SVG tag, ignore the rest
        let $svg = jQuery(data).find('svg')

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID)
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg')
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a')

        //Width y height
        if (!$svg.attr('viewBox')) {
          $svg.attr(
            'viewBox',
            '0 0 ' +
              $svg.attr('width').match(/[0-9]+\.[0-9]*/) +
              ' ' +
              $svg.attr('height').match(/[0-9]+\.[0-9]*/)
          )
        }

        //Alt
        // add replaced image's alt tag to the new SVG
        if (typeof imgAlt !== 'undefined') {
          $svg = $svg.attr('alt', imgAlt)
        }

        //Title
        // add replaced image's alt tag to the new SVG
        if (typeof imgTitle !== 'undefined') {
          $svg = $svg.attr('title', imgTitle)
        }

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        // Replace image with new SVG
        $img.replaceWith($svg)
      },
      'xml'
    )
  })

  //Cargar video en los iframes
  $('#video_modal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const recipient = button.data('id') // Extract info from data-* attributes
    const modal = $(this)
    modal
      .find('.iframe')
      .attr('src', 'https://www.youtube.com/embed/' + recipient + '?rel=0&amp;showinfo=0')
  })

  //stop videos on close button
  $('#video_modal .close').click(function() {
    $('#video_modal iframe').attr('src', '')
  })

  //Control de formulario, zona residente
  $('form #resident_no').on({
    focusin: function() {
      $('.no-resident').fadeIn()
      $('.resident').hide()
    }
  })
  $('form #resident_yes').on({
    focusin: function() {
      $('.no-resident').hide()
      $('.resident').fadeIn()
    }
  })
  /********************************************/
  //Icono apertura
  $('#nav-icon').on({
    click: function() {
      $('header#site-header').toggleClass('opened')
      $('header#site-header').toggleClass('closed')
    }
  })
  //Notice class to body
  //10 segundos para mostrarlo, esto solo tiene que pasar si se ejecuta el notice sino no
  setTimeout(function() {
    if ($('#notice-ext').length) {
      $('#notice-ext').addClass('visible')
      $('body').addClass('with-notice')
    }
  }, 10000)
  $('#notice-ext .close').on('click', function() {
    $(this)
      .parent('#notice-ext ')
      .removeClass('visible')
    $('body').removeClass('with-notice')
  })
  //Lanzamos modal de newsletter
  // $('#newsletter_modal').modal('show')

  /********************************************/
  /*smooth_scroll*/
  $('.smooth-scroll').click(function(event) {
    // On-page links
    // Figure out element to scroll to
    const target = $(this).attr('data-href')
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault()
      let pointToScroll
      if ($('#career-nav').length) {
        pointToScroll =
          $(target).offset().top - $('#site-header').height() - $('#career-nav').height() - 60
      } else {
        pointToScroll = $(target).offset().top - $('#site-header').height()
      }
      $('html, body').animate(
        {
          scrollTop: pointToScroll
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          let $target = $(target)
          $target.focus()
          if ($target.is(':focus')) {
            // Checking if the target was focused
            return false
          } else {
            $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
            $target.focus() // Set focus again
          }
        }
      )
    }
  })
}
//Método para posicionar el box fixed
let marginTop
if ($('#fixed-outer-container').length > 0) {
  marginTop = $('#fixed-outer-container').offset().top
}
function landing() {
  if ($('#fixed-outer-container').length > 0) {
    const headerHeight = $('#site-header').height() //Alto del header
    if ($(window).outerWidth() > 1023) {
      const marginRight =
        $(window).width() -
        ($('#hero-landing .container').offset().left + $('#hero-landing .container').outerWidth()) +
        12 //Esto es el margen a la derecha del form
      const boxWidth = $('#fixed-outer-container').outerWidth() - 24 //Ancho de la caja del form
      const boxHeight = $('#hero-form').outerHeight() + 48 //Alto del form
      const fixtoAbsolute = $('#controller-scroll-out').offset().top - $(window).height() + 48 //Momento ne el que pasa a absolute
      const buttonToFixed = $('#controller-scroll-out').offset().top //Alto en el que el boton pasa a fixed
      const paddingTop =
        $(window).outerWidth() > 1280 ? 144 + headerHeight + 'px' : 72 + headerHeight + 'px' //Padding arriba
      //Controlamos el boton fixed cuando hacemos scroll
      if (window.scrollY > buttonToFixed - headerHeight + 20) {
        $('.landing-counters .btn-container').addClass('fixed')
      } else {
        $('.landing-counters .btn-container').removeClass('fixed')
      }
      //Controlamos el form para que se quede fixed
      if (window.scrollY + window.innerHeight - 260 > $('#controller-scroll-out').offset().top) {
        $('#hero-form')
          .css('position', 'absolute')
          .css('right', '12px')
          .css('top', 'auto')
          .css('bottom', 0)
      } else {
        //sino es fixed hasta que baje
        $('#hero-form')
          .css('position', 'fixed')
          .css('right', marginRight + 'px')
          .css('top', marginTop + 'px')
          .css('bottom', 'auto')
      }
      //Width del form
      $('#hero-form').css('width', boxWidth + 'px')
    } else {
      //Esto es cuando es mobile
      const buttonToFixed = $('#controller-scroll').offset().top //Alto en el que el boton pasa a fixed
      $('#hero-form')
        .css('width', 'auto')
        .css('position', 'initial')
      $('#controller-scroll').css('min-height', 'auto')
      //Controlamos el boton fixed cuando hacemos scroll
      if (window.scrollY > buttonToFixed - headerHeight + 20) {
        $('.landing-counters .btn-container').addClass('fixed')
      } else {
        $('.landing-counters .btn-container').removeClass('fixed')
      }
    }
  }
}
window.addEventListener('resize', landing)
window.addEventListener('scroll', landing)

//En carrera calculamos cuando pasa el form para mostrar en mobile el botón fixed

function showInfoBtn() {
  let marginFormTop
  if ($('#success-case').length > 0) {
    marginFormTop = $('#success-case').offset().top
  }
  if (window.scrollY > marginFormTop) {
    $('#help_btn').removeClass('hide')
  } else {
    $('#help_btn').addClass('hide')
  }
}

$(window).scroll(showInfoBtn)

//Método para sticky en Becas u en otro contenedor sticky
function sticky() {
  const headerHeight = $('#site-header').outerHeight() //Alto del header
  const topStickyMargin = headerHeight + 40
  $('.sticky')
    .css('top', topStickyMargin + 'px')
    .parents()
    .css('overflow', 'visible')
}

function paddingHero() {
  $('.minus .data-container').css('padding-top', $('#site-header').outerHeight())
}

//Método para Blog navigation
function blogThemesNavigation() {
  $('.blog-menu .expander').on('click', function() {
    $('.blog-menu').toggleClass('expanded')
  })
}

//Método para buscador interactivo de glosario
//Método para buscar texto y reemplazarlo por bold
$.fn.wrapInTag = function(opts) {
  const tag = opts.tag || 'strong',
    words = opts.words || [],
    regex = RegExp(words.join('|'), 'gi'), // case insensitive
    replacement = '<' + tag + '>$&</' + tag + '>'

  return this.html(function() {
    return $(this)
      .text()
      .replace(regex, replacement)
  })
}
//Método para buscar etiqueta y quitarla
$.fn.deleteTag = function(opts) {
  const tag = opts.tag || 'strong',
    word = opts.word
  return this.html(function() {
    return $(this)
      .text()
      .replace('<' + tag + '>' + word + '</' + tag + '>', word)
  })
}
//Método específico para glosario
function glosarioNav() {
  $('#glosary-search-box').keyup(function(e) {
    const term = e.target.value
    const firstLetter = term[0]
    if (term === '') {
      $('.row[data-letter]').removeClass('hidden searching')
      $('.row[data-letter] ul.terms li a').removeClass('hidden')
    } else {
      $('.row[data-letter]').addClass('hidden searching')
      $('.row[data-letter=' + firstLetter.toLowerCase() + ']')
        .removeClass('hidden')
        .addClass('visible')
      $('.row[data-letter=' + firstLetter.toLowerCase() + '] ul.terms li a').deleteTag({
        tag: 'strong',
        word: term
      })
      $('.row[data-letter=' + firstLetter.toLowerCase() + '] ul.terms li a')
        .addClass('hidden')
        .removeClass('visible')
      $('.row[data-letter=' + firstLetter.toLowerCase() + '] ul.terms li a')
        .filter(function() {
          const reg = new RegExp(term, 'ig')
          return reg.test($(this).text())
        })
        .each(function() {
          $(this)
            .addClass('visible')
            .removeClass('hidden')
        })
      $('.row[data-letter=' + firstLetter.toLowerCase() + '] ul.terms li a').wrapInTag({
        tag: 'strong',
        words: [term]
      })
    }
  })
}
