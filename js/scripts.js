(function ($) {
  "use strict";

  /*-------------------------------------
        Animation on scroll: Number rotator
    -------------------------------------*/
  $("[data-appear-animation]").each(function () {
    var self = $(this);
    var animation = self.data("appear-animation");
    var delay = self.data("appear-animation-delay")
      ? self.data("appear-animation-delay")
      : 0;

    if ($(window).width() > 959) {
      self.html("0");
      self.waypoint(
        function (direction) {
          if (!self.hasClass("completed")) {
            var from = self.data("from");
            var to = self.data("to");
            var interval = self.data("interval");
            self.numinate({
              format: "%counter%",
              from: from,
              to: to,
              runningInterval: 2000,
              stepUnit: interval,
              onComplete: function (elem) {
                self.addClass("completed");
              },
            });
          }
        },
        { offset: "85%" }
      );
    } else {
      self.html(self.data("to"));
    }
  });

  /*-------------------------------------
    Swiper Slider
    -------------------------------------*/
  var swiperslider = $(".swiper-slider");
  var x = 1;
  swiperslider.each(function () {
    var carouselElement = $(this);
    var columns = $(this).data("columns");
    var loop = $(this).data("loop");
    var autoplay = $(this).data("autoplay");
    var autoplayspeed = $(this).data("autoplayspeed");
    var val_nav = $(this).data("arrows");
    var nav_arrow = $(this).data("arrows-class");
    var val_dots = $(this).data("dots");
    var val_center = $(this).data("center");
    var style = $(this).data("effect");
    var loopSlide = null;
    var sl_speed = 300;

    carouselElement.addClass("pbmit-element-viewtype-carousel-" + x);

    if (columns === 1) {
      var responsive_items = [
        /* 1199 : */ "1",
        /* 991 : */ "1",
        /* 767 : */ "1",
        /* 575 : */ "1",
        /* 0 : */ "1",
      ];
    } else if (columns === 2) {
      var responsive_items = [
        /* 1199 : */ "2",
        /* 991 : */ "2",
        /* 767 : */ "2",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    } else if (columns === 3) {
      var responsive_items = [
        /* 1199 : */ "3",
        /* 991 : */ "2",
        /* 767 : */ "2",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    } else if (columns === 4) {
      var responsive_items = [
        /* 1199 : */ "4",
        /* 991 : */ "4",
        /* 767 : */ "3",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    } else if (columns === 5) {
      var responsive_items = [
        /* 1199 : */ "5",
        /* 991 : */ "4",
        /* 767 : */ "3",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    } else if (columns === 6) {
      var responsive_items = [
        /* 1199 : */ "6",
        /* 991 : */ "4",
        /* 767 : */ "3",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    } else {
      var responsive_items = [
        /* 1199 : */ "3",
        /* 991 : */ "3",
        /* 767 : */ "3",
        /* 575 : */ "2",
        /* 0 : */ "1",
      ];
    }

    if (val_dots === true) {
      carouselElement.append(
        '<div class="swiper-pagination swiper-pagination"></div>'
      );
    }

    if (val_nav === true) {
      if (!nav_arrow) {
        carouselElement.append('<div class="swiper-buttons"></div>');
        carouselElement
          .find(".swiper-buttons")
          .append(
            '<div class="swiper-button-next swiper-button-next-' +
              x +
              '"></div>'
          );
        carouselElement
          .find(".swiper-buttons")
          .append(
            '<div class="swiper-button-prev swiper-button-prev-' +
              x +
              '"></div>'
          );
      } else {
        $("." + nav_arrow).append('<div class="swiper-buttons"></div>');
        $("." + nav_arrow).append(
          '<div class="swiper-button-next swiper-button-next-' + x + '"></div>'
        );
        $("." + nav_arrow).append(
          '<div class="swiper-button-prev swiper-button-prev-' + x + '"></div>'
        );
      }
    }

    var pagination_val = false;
    if (val_dots === true) {
      pagination_val = {
        el: ".swiper-pagination",
        clickable: true,
      };
    }
    var navigation_val = false;
    if (val_nav === true) {
      navigation_val = {
        nextEl: ".swiper-button-next-" + x,
        prevEl: ".swiper-button-prev-" + x,
      };
    }

    if (!style) {
      style = "slide";
    }

    var margin_val = 30;
    if (
      $(carouselElement).data("margin") != "" ||
      $(carouselElement).data("margin") == "0"
    ) {
      margin_val = $(carouselElement).data("margin");
    }

    var swiper = new Swiper(".pbmit-element-viewtype-carousel-" + x, {
      loop: loop,
      autoplay: autoplay,
      navigation: navigation_val,
      pagination: pagination_val,
      slidesPerView: columns,
      spaceBetween: margin_val,
      loopedSlides: loopSlide,
      effect: style,
      speed: sl_speed,
      grabCursor: false,
      centeredSlides: val_center,
      breakpoints: {
        1199: {
          slidesPerView: responsive_items[0],
        },
        991: {
          slidesPerView: responsive_items[1],
        },
        767: {
          slidesPerView: responsive_items[2],
        },
        575: {
          slidesPerView: responsive_items[3],
        },
        0: {
          slidesPerView: responsive_items[4],
        },
      },
    });
    x = x + 1;
  });

  const serviceSwiper = new Swiper(".service-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  });

  /*-------------------------------------
    ProgressBar
    -------------------------------------*/
  AOS.init({
    once: true,
  });

  /*-------------------------------------
    Scroll To Top
    -------------------------------------*/
  jQuery("body").append(
    '<a href="#" class="scroll-to-top"><i class="pbmit-base-icon-up-open-big"></i></a>'
  );
  var btn = jQuery(".scroll-to-top");
  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });
  btn.on("click", function (e) {
    e.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, "300");
  });

  /*-------------------------------------
    Header Search Form
    -------------------------------------*/
  $(".pbmit-header-search-btn a").on("click", function () {
    $(".pbmit-search-overlay").addClass("st-show");
    $("body").addClass("st-prevent-scroll");
    return false;
  });
  $(".pbmit-icon-close").on("click", function () {
    $(".pbmit-search-overlay").removeClass("st-show");
    $("body").removeClass("st-prevent-scroll");
    return false;
  });
  $(".pbmit-site-searchform").on("click", function (event) {
    event.stopPropagation();
  });

  /*-------------------------------------
        tooltip
    -------------------------------------*/
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  /*-------------------------------------
    Magnific Popup
    -------------------------------------*/
  var i_type = "image";
  $(".pbmit-lightbox-video, .pbmit-lightbox-video a, a.pbmit-lightbox").each(
    function () {
      if ($(this).hasClass("pbmit-lightbox-video")) {
        i_type = "iframe";
      } else {
        i_type = "image";
      }
      $(this).magnificPopup({ type: i_type });
    }
  );

  /*-------------------------------------
     Accordion
    -------------------------------------*/

  $(".accordion .accordion-item").on("click", function () {
    var e = $(this);
    $(this).parent().find(".accordion-item").removeClass("active");
    if (!$(this).find(".accordion-button").hasClass("collapsed")) {
      $(this).addClass("active");
    }
  });

  /*-------------------------------------
     Tab
    -------------------------------------*/

  $(".nav-tabs  .nav-item").on("click", function () {
    $(this).parent().find(".tabactive").removeClass("tabactive");
    $(this).addClass("tabactive");
  });

  /*-------------------------------------
      Add plus icon in menu
      -------------------------------------*/
  $(".main-menu ul.navigation li.dropdown").append(
    "<span class='righticon'><i class='ti-angle-down'></i></span>"
  );

  /*-------------------------------------
    Responsive Menu
    -------------------------------------*/
  $(".main-menu ul.navigation li.dropdown .righticon").on("click", function () {
    $(this).siblings().toggleClass("open");
    $(this).find("i").toggleClass("ti-angle-down ti-angle-up");
    return false;
  });

  /*-------------------------------------
    Sticky Header
    -------------------------------------*/
  $(window).scroll(function () {
    var sticky = $(".site-header-menu"),
      scroll = $(window).scrollTop();
    if (scroll >= 90) sticky.addClass("sticky-header");
    else sticky.removeClass("sticky-header");
  });

  /*-------------------------------------
    Circle Progressbar
    -------------------------------------*/
  $(".pbmit-circle-outer").each(function () {
    var this_circle = $(this);

    // Circle settings
    var emptyFill_val = "rgba(0, 0, 0, 0)";
    var thickness_val = 10;
    var fill_val = this_circle.data("fill");
    var size_val = this_circle.data("width");

    if (
      typeof this_circle.data("emptyfill") !== "undefined" &&
      this_circle.data("emptyfill") != ""
    ) {
      emptyFill_val = this_circle.data("emptyfill");
    }
    if (
      typeof this_circle.data("thickness") !== "undefined" &&
      this_circle.data("thickness") != ""
    ) {
      thickness_val = this_circle.data("thickness");
    }
    if (
      typeof this_circle.data("size") !== "undefined" &&
      this_circle.data("size") !== ""
    ) {
      size_val = this_circle.data("size");
    }
    if (
      typeof this_circle.data("filltype") !== "undefined" &&
      this_circle.data("filltype") === "gradient"
    ) {
      fill_val = {
        gradient: [
          this_circle.data("gradient1"),
          this_circle.data("gradient2"),
        ],
        gradientAngle: Math.PI / 4,
      };
    }

    if (typeof $.fn.circleProgress == "function") {
      var digit = this_circle.data("digit");
      var before = this_circle.data("before");
      var after = this_circle.data("after");
      var digit = Number(digit);
      var short_digit = digit / 100;

      $(".pbmit-circle", this_circle)
        .circleProgress({
          value: 0,
          size: size_val,
          startAngle: (-Math.PI / 4) * 2,
          thickness: thickness_val,
          emptyFill: emptyFill_val,
          fill: fill_val,
        })
        .on("circle-animation-progress", function (event, progress, stepValue) {
          // Rotate number when animating
          this_circle
            .find(".pbmit-circle-number")
            .html(before + Math.round(stepValue * 100) + after);
        });
    }

    this_circle.waypoint(
      function (direction) {
        if (!this_circle.hasClass("completed")) {
          // Re draw when view
          if (typeof $.fn.circleProgress === "function") {
            $(".pbmit-circle", this_circle).circleProgress({
              value: short_digit,
            });
          }
          this_circle.addClass("completed");
        }
      },
      { offset: "85%" }
    );
  });
})($);

/*-------------------------------------
    Contact form validator
    -------------------------------------*/

if ($.isFunction($.fn.validate)) {
  $("#contact-form").validate();
}

/*-------------------------------------
     Send email via Ajax
   Make sure you configure send.php file 
     -------------------------------------*/

$("#contact-form").submit(function () {
  if ($("#contact-form .doing-via-ajax").length == 0) {
    $("#contact-form").prepend(
      '<input class="doing-via-ajax" type="hidden" name="doing-via-ajax" value="yes" />'
    );
  }

  if ($("#contact-form").valid()) {
    // check if form is valid
    $(".contact-form .message-status").html("");
    $(".form-btn-loader").removeClass("d-none");
    $(".contact-form button.pbmit-btn span").hide();
    $(".contact-form button.pbmit-btn").attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: "send.php",
      data: $("#contact-form").serialize(),
      success: function (cevap) {
        $(".form-btn-loader").addClass("d-none");
        $(".contact-form button.pbmit-btn span").show();
        $(".contact-form button.pbmit-btn").removeAttr("disabled");
        // $(".contact-form .message-status").html(cevap);
        $("#contact-form")[0].reset(); // Reset the form after successful submission
        $("#formToast")
          .removeClass("bg-danger bg-success")
          .addClass("bg-custom-green");
        $("#toastMessage").html(
          " ✅ <span class='fw-bold' style='font-size: 1.2rem;'>Success!</span><br/>Thank you for contacting us. Our team will be in touch soon!!"
        );
        const toast = new bootstrap.Toast(document.getElementById("formToast"));
        toast.show();
      },
      error: function () {
        // Show error toast
        $("#formToast")
          .removeClass("bg-success bg-danger")
          .addClass("bg-custom-red");
        $("#toastMessage").html(
          " ⚠️ <span class='fw-bold' style='font-size: 1.2rem;'>Warning!</span><br/> Failed to send your message!<br/>Please try again later..."
        );
        const toast = new bootstrap.Toast(document.getElementById("formToast"));
        toast.show();
      },
    });
  }

  return false;
});

//  appointment form
$(document).ready(function () {
  if ($.isFunction($.fn.validate)) {
    $("#appointment-form").validate();
  }

  $("#appointment-form").submit(function (e) {
    e.preventDefault();

    // ✅ Custom validation for checkbox group: slots[]
    const checked = $("input[name='slots[]']:checked").length;
    if (checked === 0) {
      $("#days-error").show();
      $("html, body").animate(
        {
          scrollTop: $("#days-error").offset().top - 100,
        },
        300
      );
      return false;
    } else {
      $("#days-error").hide((type = "tel"));
    }

    // ✅ Add hidden input for AJAX flag (only once)
    if ($("#appointment-form .doing-via-ajax").length === 0) {
      $("#appointment-form").prepend(
        '<input class="doing-via-ajax" type="hidden" name="doing-via-ajax" value="yes" />'
      );
    }

    // ✅ Validate other fields
    if ($("#appointment-form").valid()) {
      $("#appointment-form .message-status").html("");
      $("#days-error").hide();
      console.log("Success");

      const $button = $("#appointment-form button[type='submit']");
      const originalText = $button.text();
      $button.prop("disabled", true).text("Sending...");

      $.ajax({
        type: "POST",
        url: "bookappointment.php",
        data: $("#appointment-form").serialize(),
        success: function (response) {
          // alert("Your appointment request was submitted successfully!");
          // $("#appointment-form .message-status").html(response);
          $("#appointment-form")[0].reset();
          $button.prop("disabled", false).text(originalText);
          $("#days-error").hide(); // hide error if previously shown
          $("#formToast")
            .removeClass("bg-danger bg-success")
            .addClass("bg-custom-green");
          $("#toastMessage").html(
            "✅ <span class='fw-bold' style='font-size: 1.1rem;'>Success!</span><br/> Thank you for your appointment request. Our team will contact you soon!!"
          );

          // Show toast
          const toast = new bootstrap.Toast(
            document.getElementById("formToast")
          );
          toast.show();
        },
        error: function () {
          // $("#appointment-form .message-status").html(response);
          $button.prop("disabled", false).text(originalText);
          $("#formToast")
            .removeClass("bg-success bg-danger")
            .addClass("bg-custom-red");
          $("#toastMessage").html(
            "⚠️ <span class='fw-bold' style='font-size: 1.2rem;'>Warning!</span><br/>Failed to send your message!<br/>Please try again later..."
          );
          const toast = new bootstrap.Toast(
            document.getElementById("formToast")
          );
          toast.show();
        },
      });
    }
  });
});
