(
    function($)
    {
        let fileForm = $("#file_form");
        let textResponse = $("#audio-response-div");

        fileForm.submit(function(event){
            event.preventDefault();

            let data = new FormData(fileForm);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/summarize/audio",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    let pTag = document.createElement("p");
                    let pTagText = document.createTextNode(response.textData);
                    pTag.appendChild(pTagText);

                    textResponse.append(pTag);
                }
            });
        });
    }
)(window.jQuery);