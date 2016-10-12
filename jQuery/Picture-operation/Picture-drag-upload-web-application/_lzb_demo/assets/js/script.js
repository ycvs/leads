$(function () {
    var dropbox = $('#dropbox'),
            message = $('.message', dropbox);
    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'pic',
        maxfiles: 5,
        maxfilesize: 2,
        url: 'post_file.php',
        uploadFinished: function (i, file, response) {
            //console.log(i);
            // console.log(file);
            //console.log(response);
            //$.data(file).addClass('done');
            // response is the JSON object that post_file.php returns
        },
        error: function (err, file) {
            switch (err) {
                case 'BrowserNotSupported':
                    showMessage('Your browser does not support HTML5 file uploads!');
                    break;
                case 'TooManyFiles':
                    alert('Too many files! Please select 5 at most! (configurable)');
                    break;
                case 'FileTooLarge':
                    alert(file.name + ' is too large! Please upload files up to 2mb (configurable).');
                    break;
                default:
                    break;
            }
        },
        // Called before each upload is started
        beforeEach: function (file) {
            if (!file.type.match(/^image\//)) {
                alert('Only images are allowed!');
                // Returning false will cause the
                // file to be rejected
                return false;
            }
        },
        uploadStarted: function (i, file, len) {
            createImage(file);
        },
        progressUpdated: function (i, file, progress) {
            $.data(file).find('.progress').width(progress);
        }

    });


    var template = "<img style='width:100%;height:100%;'/>";
    function createImage(file) {
        $("#dropbox").empty();
        var preview = $(template);
        var image = $('img', preview);
        var reader = new FileReader();

        //image.width = 100;
        //image.height = 100;
        reader.onload = function (e) {
            console.log(e.target.result);
            //image.attr('src', e.target.result);
            preview.attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        message.hide();
        preview.appendTo(dropbox);
        $.data(file, preview);
    }

    function showMessage(msg) {
        message.html(msg);
    }
});