
@foreach($messages as $message)
    <li class="mar-btm">
        <div class="media-{{ $user->id == $message->user_id ? 'left' : 'right pad-rgt' }}">
            <img class="img-circle img-user {{ $user->id == $message->user_id ? 'img-flip' : '' }}  media-object" src="{{ asset( 'storage/'.$message->user->getFirstAccount()->current_unit->icon_file)}}" alt="Unit Picture">
        </div>
        <div class="media-body pad-hor
                @if($user->id == $message->user_id)
                    speech-left
                @else
                    speech-right
                @endif
                ">
            <div class="speech">
                <a href="#" class="media-heading">{{ $user->id == $message->user_id ? $user->name : $partner->name }}</a>
                <p>{{ $message->message }}</p>
                <p class="speech-time">
                    <i class="fa fa-clock-o icon-fw"></i>{{ $message->created_at }}
                </p>
            </div>
        </div>
    </li>
@endforeach