(function ($) {
  var modal;
  var loadData = function() {
    $.get('d7test/myname', null, function(response) {
      if (response.data === null) {
        return;
      }

      $('#d7_test-first_name').text(response.data.first_name);
      $('#d7_test-last_name').text(response.data.last_name);

      $('#d7_test-username-panel').show();
    });
  }

  var registerForm = function(body) {
    $('form', body).submit(function(event) {
      event.preventDefault();
      postData(this);
    });
  }

  var postData = function(form) {
    $.post($(form).attr('action'), $(form).serialize(), function(response) {
      var body = $('#d7_test-username-modal .modal-body').html(response);

      // Check if there are some field errors, if not, close modal.
      if ($(':input.error', body).length == 0) {
        modal.close();
      }

      registerForm(body);
    });
  };

  Drupal.behaviors.d7test = {
    attach: function (context, settings) {
      // Code to be run on page load, and
      // on ajax load added here
      console.log('JS d7test', context, settings);

      $('#d7_test-btn', context).once('d7test', function () {
        if ($('#block-d7-test-user-name').length) {
          loadData();
        }

        modal = $(this).d7TestModal({
          modal: '#d7_test-username-modal',
          title: 'User Name Form',
          body: 'loading...',
          onOpen: function() {
            // Load form html.
            $.get('/d7test/myname/form', null, function(response) {
              var body = $('#d7_test-username-modal .modal-body').html(response);
              registerForm(body);
            });
          },
          onClose: function() {
            loadData();
          }
        });
      });
    }
  };
}(jQuery));
