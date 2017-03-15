(function ($) {
  Drupal.behaviors.d7test = {
    attach: function (context, settings) {
      // Code to be run on page load, and
      // on ajax load added here
      console.log('JS d7test', context, settings);

      $('#d7_test-btn', context).once('d7test', function () {
        if ($('#block-d7-test-user-name').length) {
          $.get('d7test/myname', null, function(response) {
            if (response.data === null) {
              return;
            }

            $('#d7_test-first_name').text(response.data.first_name);
            $('#d7_test-last_name').text(response.data.last_name);

            $('#d7_test-username-panel').show();
          });
        }

        $(this).d7TestModal({
          modal: '#d7_test-username-modal',
          title: 'User Name Form',
          body: 'loading...',
          onOpen: function() {
            $.get('/d7test/myname/form', null, function(response) {
              console.log(response);
              $('#d7_test-username-modal .modal-body').html(response);
            });
          }
        });
      });
    }
  };
}(jQuery));
