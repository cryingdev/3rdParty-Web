$(function () {
    // Load the login component
    $.get('views/login/login.html', function (html) {
        // Wrap the login component in a popup container
        var $popup = $('<div class="popup"></div>');
        $popup.append(html);

        // Add an event listener to show the popup on login button click
        $('button.login-button').on('click', function (event) {
            event.preventDefault();
            $popup.show();
        });

        // Add an event listener to hide the popup on submit or cancel
        $popup.on('submit', 'form', function (event) {
            event.preventDefault();
            $popup.hide();
        });
        $popup.on('click', '.close-button', function () {
            $popup.hide();
        });

        // Insert the popup container into the page
        $('body').append($popup);
    });
});