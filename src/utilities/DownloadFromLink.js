import $ from 'jquery';

function DownloadFromLink(link, type) {
    $.ajax({
      url: link,
      type: 'GET',
      xhrFields: {
        responseType: 'blob'
      },
      success: function (data) {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = type;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  export default DownloadFromLink;