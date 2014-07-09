//=========================================================================
// Image handling
//=========================================================================


// Using `document.images' does not work because `cloneNode' will not
// operate on non-DOM array elements properly
var images = document.querySelectorAll('img')

// Does not assume fundamental strucutre changes to the `html' element in
// the future
var html = document.getElementsByTagName('html')[0];
var imageList = document.createElement('ul');
var listElement;
for (var i = 0; i < images.length; ++i) {
  listElement = document.createElement('li');
  listElement.appendChild(images[i].cloneNode(true));
  html.insertBefore(listElement, html.childNodes[0]);
}


//=========================================================================
// Modal
//=========================================================================

var Modal = (function() {
  function Modal() {
    var self = this;

    // Handle hiding

    // Hide on button click
    $('#modal-close-button').on('click', function() {
      self.hide();
    });

    // Hide when clicking outside the modal window itself
    $('#modal-overlay').on('click', function() {
      self.hide();
    });

    // Restrict the `#model-content' height to the window height

    document.querySelector('#modal-content').style.height =
      window.innerHeight - 50 + 'px';

    $(window).on('resize', function() {
      $('#modal-content').css({
        'height': $(window).height() - 50 + 'px',
      });
    });

  }

  Modal.prototype = new (function() {

    // Functions

    this.show = function(content) {
      if (content) {
        this.content(content);
      }

      $('#modal-wrap').fadeIn('fast');
    };

    this.hide = function(doClear) {
      $('#modal-wrap').fadeOut('fast');

      if (doClear) {
        this.clear();
      }
    };

    this.content = function(content) {
      $('#modal-content').empty();
      $('#modal-content').append(content);
    };

    this.clear = function(content) {
      $('#modal-content').empty();
    };

  })();

  return Modal;
})
