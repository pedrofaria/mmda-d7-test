(function ($) {
  $.fn.d7TestModal = function(options) {
    var settings = $.extend({
        // These are the defaults.
        modal: '',
        title: '',
        footer: '',
        body: '',
        onOpen: function() {},
        onClose: function() {},
    }, options );
    var tis = this;

    function registerEvents() {
      $(tis).click(open);

      $('.modal-header span.close', settings.modal).click(function () {
        close();
      });

      // Close clicking outsite of the modal.
      $(settings.modal).click(function (event) {
        if (event.target == this) {
          close();
        }
      });
    }

    function open () {
      $(settings.modal).addClass('opened');
      settings.onOpen();
    }

    function close() {
      $(settings.modal).removeClass('opened');
      settings.onClose();
    }

    function setDefaultText() {
      // Title
      $('.modal-content .modal-header h2', settings.modal).text(settings.title);
      $('.modal-content .modal-body', settings.modal).html(settings.body);
      $('.modal-content .modal-footer h3', settings.modal).text(settings.footer);
    }

    registerEvents();
    setDefaultText();

    return {
      close: function() {
        close();
      }
    };
  };

}(jQuery));
