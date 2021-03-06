
let token = document.head.querySelector('meta[name="csrf-token"]');

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

/**
 *
 * @param name
 * @param message
 * @param time
 * @param place left or right
 * @returns {string}
 */
function chatMessage(name, message, time, place) {
    if(place == 'right')
        speechclass = 'speech-right';
    else
        speechclass = '';

    var html = ' <li class="mar-btm">';
    html += '    <div class="media-'+place+'">';
    html += '        <img src="storage/unit_icons/unit_icon_100000316.png" class="img-circle img-sm" alt="Profile Picture">';
    html += '    </div>';
    html += '    <div class="media-body pad-hor '+speechclass+'">';
    html += '        <div class="speech">';
    html += '            <a href="#" class="media-heading">'+name+'</a>';
    html += '            <p>'+message+'</p>';
    html += '            <p class="speech-time">';
    html += '                <i class="demo-pli-clock icon-fw"></i> '+time;
    html += '           </p>';
    html += '        </div>';
    html += '    </div>';
    html += '</li>';
    return html;
}

function scrollDownChat() {
    $('#ulchat1').scrollTop($('#ulchat1')[0].scrollHeight);
}

$(document).ready(function () {

    scrollDownChat();

    // window.Echo = new Echo({
    //     broadcaster: 'pusher',
    //     key: 'ff317e0f3fd829e48367',
    //     cluster: 'eu',
    //     encrypted: true
    // });

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('ff317e0f3fd829e48367', {
        cluster: 'eu',
        encrypted: true,
        authEndpoint: 'pusher/auth',
        auth: {
            headers: {
                'X-CSRF-Token': token.content
            }
        }
    });

    var channel = pusher.subscribe('private-chat');
    channel.bind('pusher:subscription_error', function(data) {
        // console.log(data);
    });
    channel.bind('pusher:subscription_succeeded', function(data) {
        console.log(data);
    });

    channel.bind('NewMessage', function(data) {
        if(data.userid == myid)
            $('#ulchat1').append(chatMessage(data.username, data.message, data.time, 'left'));
        else
            $('#ulchat1').append(chatMessage(data.username, data.message, data.time, 'right'));
        scrollDownChat()
    });

    $('.chat-input').on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('#sendMessage').click();
        }
    });

    $('#sendMessage').on('click', function (e) {
        e.preventDefault();
        var input = $('#chat-input').val();
        if(input != '') {

            $.post(prefix_ajax+"ajax/message", { message : input },
                function(returnedData){
                    if(returnedData.status == 'OK')
                        $('#chat-input').val('');
            })
        }
    });

});