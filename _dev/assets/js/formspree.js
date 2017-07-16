var contactForm = $('#contact-form');

contactForm.submit(function(e) {
	e.preventDefault();

  var data = {
      name: $('#contact-name').val(),
      _replyTo: $('#contact-email').val(),
      message: $('#contact-message').val()
  };

  $.ajax({
      url: "https://formspree.io/joaovlsaro@gmail.com",
      method: "POST",
      data: data,
      dataType: "json",

    beforeSend: function() {
      $('.success, .error').remove();
  		contactForm.append('<div class="sending" style="color: #111">Sending message…</div>');
  	},
  	success: function(data) {
			$('.sending').remove();
  		contactForm.append('<div class="success" style="color: #111">Sent. Thanks for your message!</div>');
  	},
  	error: function(err) {
      $('.sending').remove()
  		contactForm.append('<div class="error" style="color: #111">Ops, there was an error. Please wait and submit again.</div>');
  	}
  });
});
