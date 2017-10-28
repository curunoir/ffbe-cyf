
@foreach($messages as $message)
    <li class="mar-btm">
        <div class="media-left">
            <img src="img/profile-photos/1.png" class="img-circle img-sm" alt="Profile Picture">
        </div>
        <div class="media-body pad-hor">
            <div class="speech">
                <a href="#" class="media-heading">{{ $message->user->name }}</a>
                <p>{{ $message->message }}</p>
                <p class="speech-time">
                    <i class="demo-pli-clock icon-fw"></i>{{ $message->created_at }}
                </p>
            </div>
        </div>
    </li>
@endforeach